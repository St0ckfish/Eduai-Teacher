'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import { Text } from "~/_components/Text";
import { useChangePassword, useProfile } from "~/APIs/hooks/useProfile";
import type { ChangePassword } from "~/types";

const ChangePassword = () => {
  const router = useRouter();
  const { data, isLoading } = useProfile();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const { mutate: changePasswordMutation } = useChangePassword();
  const handleSubmit = () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password must match.");
      return;
    }
  
    const payload: ChangePassword = {
      password: currentPassword,
      newPassword,
    };
  
    changePasswordMutation(payload, {
      onSuccess: () => {
        toast.success("Password changed successfully!");
        router.push('/')
      },
      onError: () => {
        toast.error("Failed to change password. Please try again.");
      }
    });
  };
  
  return (
    <>
      <Container>
        <div className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
          <Text font={"bold"} size={"4xl"}>Edit Profile</Text>
          <div className="mt-4 flex flex-col items-center">
            <div>
              <Image
                src={data?.data.picture || "/images/avatar.png"}
                alt="Profile Photo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col items-center">
              <Text font={"bold"} size={"2xl"} className="mt-2">{data?.data.name}</Text>
              <Text size={"xl"} color="gray" className="mb-2">{data?.data.username}</Text>
            </div>
          </div>
          <div className="m-auto w-4/5">
            <div className="flex gap-8">
              <div>
                <a href="/profile" className="text-xl">
                  Personal Info.
                </a>
              </div>
              <div>
                <a href="/password" className="text-xl text-primary underline">
                  Change Password{" "}
                </a>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="current_password">Current Password</label>
                <Input
                  placeholder="Enter current password"
                  type="password"
                  id="current_password"
                  theme="transparent"
                  border="gray"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)} // Update state on change
                />
              </div>
              <div>
                <label htmlFor="new_password">New Password</label>
                <Input
                  placeholder="Enter new password"
                  type="password"
                  id="new_password"
                  theme="transparent"
                  border="gray"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} // Update state on change
                />
              </div>
              <div>
                <label htmlFor="confirm_new_password">
                  Confirm New Password
                </label>
                <Input
                  placeholder="Confirm the password"
                  type="password"
                  id="confirm_new_password"
                  theme="transparent"
                  border="gray"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)} // Update state on change
                />
              </div>
            </div>
            <div className="flex justify-end">
            <div className="mt-4 w-[150px]">
              <Button
                className="rounded-lg bg-primary px-6 py-2 text-white"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ChangePassword;
