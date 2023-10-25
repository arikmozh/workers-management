import NavbarBlank from "@/components/Navbar-blank";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const RegisterPassword = () => {
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }
  const navigate = useNavigate();

  return (
    <>
      <NavbarBlank />
      <div className="text-left pt-6 max-w-4xl m-auto">
        <Button
          className="absolute text-lg opacity-70 hover:no-underline  hover:opacity-100"
          variant={"link"}
          onClick={() => navigate("/login")}
        >
          <CaretLeftIcon />
          Back
        </Button>
      </div>

      <div className="py-20 max-w-3xl m-auto">
        <div className="grid grid-cols-2">
          <div className="text-left max-w-xs space-y-6">
            <h1 className="text-3xl font-medium">Welcome back!</h1>
            <h1 className="text-lg font-medium">a****@gmail.com</h1>
            <div>
              <Label>Password</Label>
              <Input type="password" />
            </div>
            <Button className="w-full">Next</Button>

            <p className="w-60 violet font-medium">Forgot password?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPassword;
