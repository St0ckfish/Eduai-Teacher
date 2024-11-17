import Image from "next/image";
import Container from "~/_components/Container";
import Input from "~/_components/Input";

const EditProfile = () => {
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
                <a href="/profile" className="text-xl text-primary underline">
                  Personal Info.
                </a>
              </div>
              <div>
                <a href="/password" className="text-xl">Change Password </a>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="full_name">Fall Name</label>
                <Input name="full_name" placeholder="Enter your first name" />
              </div>
              <div>
                <label htmlFor="last_name">Last Name</label>
                <Input name="last_name" placeholder="Enter your last name" />
              </div>
              <div className="flex space-x-2">
                <div>
                  <label htmlFor="country_code" className="w-1/3">
                    Phone Number
                  </label>
                  <select
                    name="country_code"
                    id="country_code"
                    className="w-full rounded-lg border border-borderSecondary bg-bgPrimary p-3 text-textSecondary outline-none transition duration-200 ease-in"
                    >
                    <option value="+20">+20</option>
                  </select>
                </div>

                <label htmlFor="phone" className="mt-[26px] w-2/3">
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="-mt-[4px]"
                    pattern="^\+?[1-9]\d{1,14}$"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="gender" >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="w-full rounded-lg border border-borderSecondary bg-bgPrimary p-3 text-textSecondary outline-none transition duration-200 ease-in"
                >
                  <option value="gender">Select Gender</option>
                </select>
              </div>
              <div>
                <label htmlFor="nationality" >
                  Nationality
                </label>
                <select
                  name="nationality"
                  id="nationality"
                  className="w-full rounded-lg border border-borderSecondary bg-bgPrimary p-3 text-textSecondary outline-none transition duration-200 ease-in"
                >
                  <option value="nationality">Select Nationality</option>
                </select>
              </div>
              <div>
                <label htmlFor="qualifications" >
                  Qualifications
                </label>
                <select
                  name="qualifications"
                  id="qualifications"
                  className="w-full rounded-lg border border-borderSecondary bg-bgPrimary p-3 text-textSecondary outline-none transition duration-200 ease-in"
                >
                  <option value="qualifications">Select Qualifications</option>
                </select>
              </div>
              <div>
                <label htmlFor="subject" >
                Subject
                </label>
                <select
                  name="subject"
                  id="subject"
                  className="w-full rounded-lg border border-borderSecondary bg-bgPrimary p-3 text-textSecondary outline-none transition duration-200 ease-in"
                >
                  <option value="subject">Select Subject</option>
                </select>
              </div>
              
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditProfile;
