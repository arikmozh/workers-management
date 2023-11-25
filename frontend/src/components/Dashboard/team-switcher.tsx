import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Shift } from "@/redux/interface";
import { useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { addShiftToAPI } from "../../utils/workersUtils";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { doAddShift } from "../../redux/actions";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const shifts = useSelector((state: RootState) => state.shifts);
  const departments = useSelector((state: RootState) => state.departments);
  const firstName = user && user.length > 0 ? user[0]?.fullName || "" : "";
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [shiftDate, setShiftDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [startHour, setStartHour] = React.useState<string>("");
  const [endHour, setEndHour] = React.useState<string>("");
  const [showEndHourSelect, setShowEndHourSelect] =
    React.useState<boolean>(false);

  const [shift, setShift] = React.useState({
    departmentId: "",
    shiftName: "",
    shiftDate: shiftDate,
    shiftStartingHour: "",
    shiftEndingHour: "",
    shiftCreatedDate: new Date(),
    shiftEmployees: [],
  });

  const [error, setError] = React.useState(false);
  const isShiftComplete = () => {
    if (
      shift.departmentId == "" ||
      shift.shiftName == "" ||
      shift.shiftStartingHour == "" ||
      shift.shiftEndingHour == ""
    ) {
      return false;
    }
    return true; // All keys are filled, return true
  };

  const addShift = async () => {
    if (isShiftComplete() == true) {
      try {
        const data = await addShiftToAPI(shift);
        if (data) {
          dispatch(doAddShift(data));
          setShowNewTeamDialog(false);
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle the error if needed
        throw error;
      }
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const getEndHours = (startHour: string): string[] => {
    const parsedHour = startHour.split(":").map(Number);
    const startHourInMinutes = parsedHour[0] * 60 + parsedHour[1];

    const availableDurations = [7 * 60, 9 * 60, 12 * 60];
    const possibleEndHours = availableDurations.map((duration) => {
      const minutes = startHourInMinutes + duration;
      const endHour = `${String(Math.floor(minutes / 60)).padStart(
        2,
        "0"
      )}:${String(minutes % 60).padStart(2, "0")}`;
      return endHour;
    });

    return possibleEndHours;
  };
  const endHours: string[] =
    showEndHourSelect && startHour ? getEndHours(startHour) : [];

  const handleStartHourChange = (selectedValue: string) => {
    setStartHour(selectedValue);
    shift.shiftStartingHour = selectedValue;
    setEndHour(""); // Reset end hour when start hour changes
    setShowEndHourSelect(true); // Display end hour select after selecting a start hour
  };

  const handleEndHourChange = (selectedValue: string) => {
    setEndHour(selectedValue);
    shift.shiftEndingHour = selectedValue;
  };

  const hours: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
      hours.push(hour);
    }
  }

  // const [selectedTeam, setSelectedTeam] = React.useState(store.departments[0]);

  interface CheckIconConditionalProps {
    shiftId: string;
  }

  const CheckIconConditional: React.FC<CheckIconConditionalProps> = ({
    shiftId,
  }) => {
    const location = useLocation();

    // Check if the URL contains the shift ID
    const isShiftIdInUrl = location.pathname.includes(shiftId);

    // Return the CheckIcon conditionally
    return isShiftIdInUrl ? (
      <CheckIcon className={cn("ml-auto h-4 w-4")} />
    ) : null;
  };

  const getDepartmentName = (id: string) => {
    const dep = departments.filter((dep) => {
      return dep._id == id;
    });
    return dep[0].departmentName;
  };
  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={`https://avatar.vercel.sh/personal.png`} />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {firstName}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search shift..." />
              <CommandEmpty>No shift found.</CommandEmpty>
              {shifts.map((shift: Shift, index) => {
                return (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      // setSelectedTeam(dep);
                      navigate(`/dashboard/shifts/${shift._id}`);
                      setOpen(false);
                    }}
                    className="text-sm cursor-pointer"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/personal.png`}
                        alt={shift.shiftName}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {shift.shiftName} - {getDepartmentName(shift.departmentId)}
                    {/* <CheckIcon className={cn("ml-auto h-4 w-4")} /> */}
                    <CheckIconConditional shiftId={shift._id} />
                  </CommandItem>
                );
              })}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    className="cursor-pointer"
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Add Shift
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Shift</DialogTitle>
          <DialogDescription>Enter shift details.</DialogDescription>
        </DialogHeader>
        {/* <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div> */}
        <div className="w-80">
          <div className="grid gap-4">
            {/* <div className="space-y-2">
              <h4 className="font-medium leading-none">Add Shift</h4>
              <p className="text-sm text-muted-foreground">
                Enter shift details.
              </p>
            </div> */}
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Department:</Label>
                <Select
                  onValueChange={(selectedValue) => {
                    setShift((prevShift) => ({
                      ...prevShift,
                      departmentId: selectedValue,
                    }));
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {departments.map((dep, index) => {
                        return (
                          <SelectItem key={index} value={dep._id}>
                            {dep.departmentName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Shift name:</Label>
                <Input
                  id="width"
                  placeholder="Enter name"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setShift({ ...shift, shiftName: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4 ">
                <Label htmlFor="width">Shift date:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    {/* <FormControl> */}
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[185px] pl-3 text-left font-normal",
                        !shiftDate && "text-muted-foreground"
                      )}
                    >
                      {shiftDate ? (
                        shiftDate.getDate() +
                        " / " +
                        shiftDate.getMonth() +
                        " / " +
                        shiftDate.getFullYear()
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                    {/* </FormControl> */}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={shiftDate}
                      onSelect={setShiftDate}
                      disabled={(date) => date <= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Start hour:</Label>
                <Select onValueChange={handleStartHourChange}>
                  <SelectTrigger>
                    {startHour ? (
                      <span>{startHour}</span>
                    ) : (
                      <span>Select Hour</span>
                    )}
                  </SelectTrigger>
                  <SelectContent className="max-h-48 overflow-y-auto">
                    <SelectGroup>
                      {/* <SelectItem value="">Select</SelectItem> */}
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                  {startHour && <p> {startHour}</p>}
                </Select>
              </div>
            </div>
            {showEndHourSelect && startHour && (
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">End hour:</Label>
                  <Select onValueChange={handleEndHourChange}>
                    <SelectTrigger>
                      {endHour ? (
                        <span>{endHour}</span>
                      ) : (
                        <span>Select Hour</span>
                      )}
                    </SelectTrigger>
                    <SelectContent className="max-h-48 overflow-y-auto">
                      <SelectGroup>
                        {/* <SelectItem value="">Select</SelectItem> */}
                        {endHours.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                    {endHour && <p> {endHour}</p>}
                  </Select>
                </div>
              </div>
            )}
            {/* <Button onClick={addShift}>Add</Button> */}
            {error && (
              <span className="text-red-500">Something is missing</span>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button onClick={addShift}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
