import Image from "next/image";
import Container from "~/_components/Container";
import Input from "~/_components/Input";

const ChangePassword = () => {
  return (
    <>
      <Container>
        <div className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
          <h1 className="text-2xl font-semibold">Edit Profile</h1>
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
              <h1 className="my-2 text-xl">Ahmed Abdelfadeel</h1>
              <p className="mb-2 text-textSecondary">@abufadel</p>
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
                />
              </div>
              <div>
                <label htmlFor="new_password">New Password</label>
                <Input
                  placeholder="Enter new password"
                  type="password"
                  id="new_password"
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
