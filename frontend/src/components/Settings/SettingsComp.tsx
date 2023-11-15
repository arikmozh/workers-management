import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/interface";
import { Button } from "../ui/button";
import { updateUserToApi } from "../../utils/authUtils";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { doUpdateUser } from "../../redux/actions";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";

const SettingsComp = () => {
  // const user = useSelector((state: RootState) => state.user[0]);
  const user = useSelector((state: RootState) => state.user[0]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<User>({
    userId: user?._id,
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    password: user?.password,
    maxActions: user?.maxActions,
    packageId: user?.packageId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone" && (isNaN(Number(value)) || value.length > 10)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFullNameValid = formData.fullName && formData.fullName.trim();
    const isEmailvalid = formData.email && isEmailValid(formData.email);

    if (!isFullNameValid || !isEmailvalid) {
      console.error(
        "Full Name and Email cannot be empty. Please fill in all required fields."
      );
      return;
    } else {
      try {
        const data = await updateUserToApi(formData);
        console.log(data);
        if (data) {
          formData.userId = data._id;
          formData.email = data.email;
          formData.fullName = data.fullName;
          formData.maxActions = data.maxActions;
          formData.packageId = data.packageId;
          formData.password = data.password;
          formData.phone = data.phone;

          dispatch(doUpdateUser(data));
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  };

  const isEmailValid = (email: string) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <Card>
        <CardContent className="p-8">
          <form onSubmit={(e) => handleSave(e)}>
            <div className="max-w-lg pt-6 gap-4 rounded-md grid grid-cols-2">
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium  text-left"
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData?.fullName}
                  onChange={handleChange}
                  className={`mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    !formData.fullName.trim() ? "border-red-500" : ""
                  }`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium  text-left"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  className={`mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    // Check if email is empty or not a valid email
                    !formData.email.trim() || !isEmailValid(formData.email)
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-left"
                >
                  Phone
                </label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData?.phone}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-left"
                >
                  Password
                </label>

                <Input
                  readOnly
                  type="password"
                  id="password"
                  name="password"
                  value={formData?.password}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100"
                  disabled
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="maxActions"
                  className="block text-sm font-medium text-left"
                >
                  Max Actions
                </label>
                <p className="mt-1 p-2 border rounded-md bg-gray-100 opacity-50 text-left cursor-not-allowed">
                  {formData.maxActions}
                </p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="packageId"
                  className="block text-sm font-medium  text-gray-600 text-left"
                >
                  Package ID
                </label>
                {/* <input
            type="text"
            id="packageId"
            name="packageId"
            value={formData.packageId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:border-blue-300"
            disabled
          /> */}
                <Input
                  type="text"
                  id="packageId"
                  name="packageId"
                  value={formData?.packageId}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100"
                  disabled
                />
              </div>
              <div></div>
              <div className="flex justify-end">
                <Button type="submit">save</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsComp;

interface User {
  userId?: string;
  _id?: string; // Make _id optional
  fullName: string;
  email: string;
  phone: string;
  password: string;
  maxActions: number;
  packageId: number;
}
