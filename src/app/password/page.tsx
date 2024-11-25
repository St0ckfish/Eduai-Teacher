import Image from "next/image";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import { Text } from "~/_components/Text";

const ChangePassword = () => {
  return (
    <>
      <Container>
        <div className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
        <Text font={"bold"} size={"4xl"}>Edit Profile</Text>
        <div className="mt-4 flex flex-col items-center">
            <div>
              <Image
                src={"/images/userr.png"}
                alt="Profile Photo"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col items-center">
              <Text font={"bold"} size={"2xl"} className="mt-2">Ahmed Abdelfadeel</Text>
              <Text size={"xl"} color="gray" className="mb-2">@abufadel</Text>
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
                />
              </div>
              <div>
                <label htmlFor="confirm_new_password">
                  Confirm New Password
                </label>
                <Input
                  placeholder="confirm the password"
                  type="password"
                  id="confirm_new_password"
                  theme="transparent"
                  border="gray"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ChangePassword;
