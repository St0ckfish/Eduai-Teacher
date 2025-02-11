"use client";
import Image from "next/image";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import {
  useGetProfileUpdate,
  useProfile,
  useUpdateProfile,
  useUpdateProfilePicture
} from "~/APIs/hooks/useProfile";
import { useGetAllNationalities } from "~/APIs/hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { type TeacherProfileUpdate } from "~/types";
import Button from "~/_components/Button";
import { useGetAllTextBookSummarys } from "~/APIs/hooks/useTextBook";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ImageComponent from "~/_components/ImageSrc";
import { Pencil } from "lucide-react";

const EditProfile = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, refetch: refetchProfile } = useProfile();
  const { data: dataUpdate } = useGetProfileUpdate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [nationality, setNationality] = useState("");
  const [qualification, setQualification] = useState("");
  const [subject, setSubject] = useState("");

  const { data: nationalityData, isLoading: isNationalities } =
    useGetAllNationalities() as {
      data: Record<string, string>;
      isLoading: boolean;
    };

  const { mutate: updateProfilePicture } = useUpdateProfilePicture({
    onSuccess: () => {
      toast.success("Profile picture updated successfully!");
      void refetchProfile();
    },
    onError: () => {
      toast.error("Error updating profile picture!");
    },
  });

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('picture', file);
      updateProfilePicture(formData);
    }
  };

  const optionsNationalities = nationalityData?.data
    ? Object.entries(nationalityData.data).map(([key, value]) => ({
        value: key,
        label: `${value}`,
      }))
    : [];

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || "");
      setPhone(data.data.number || "");
      setGender(
        dataUpdate?.data.gender === "MALE"
          ? "MALE"
          : dataUpdate?.data.gender === "FEMALE"
            ? "FEMALE"
            : "MALE",
      );
      setNationality(dataUpdate?.data.nationality || "");
      setQualification(data.data.qualification || "");
      setSubject(data.data.subjects[0] || "");
    }
  }, [data, dataUpdate]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e.target.value === "MALE" ? setGender("MALE") : setGender("FEMALE");
  };

  const handleNationalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNationality(e.target.value);
  };

  const handleQualificationChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setQualification(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  const { data: dataSubjects } = useGetAllTextBookSummarys();
  
  const { mutate: updateProfileMutation } = useUpdateProfile({
    onSuccess: () => {
      router.push("/");
      toast.success("Profile Edited successfully!");
      void refetchProfile();
    },
    onError: () => {
      toast.error("Error editing profile!");
    },
  });

  const handleSubmit = () => {
    const updatedProfile: TeacherProfileUpdate = {
      username: dataUpdate?.data?.username || "",
      email: dataUpdate?.data?.email || "",
      name_ar: name,
      name_en: name,
      name_fr: name,
      number: phone,
      gender,
      qualification,
      nationality,
      subjects: ["SCIENCE"],
    };
    updateProfileMutation(updatedProfile);
  };

  if (isLoading || isNationalities) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <div className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
          <Text font={"bold"} size={"4xl"}>
            Edit Profile
          </Text>
          <div className="mt-4 flex flex-col items-center">
            <div className="relative">
              <ImageComponent
                fallbackSrc="/images/noImage.png"
                priority={true}
                src={data?.data?.picture ?? null}
                alt="Profile Photo"
                width={100}
                height={100}
                className="rounded-full w-[100px] h-[100px]"
              />
              <button
                onClick={handleProfilePictureClick}
                className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white hover:bg-primary/80"
              >
                <Pencil size={16} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col items-center">
              <Text font={"bold"} size={"2xl"} className="mt-2">
                {data?.data?.name}
              </Text>
              <Text size={"xl"} color="gray" className="mb-2">
                @{data?.data?.username}
              </Text>
            </div>
          </div>

          {/* Rest of the form remains the same */}
          <div className="m-auto w-4/5">
            <div className="flex gap-8">
              <div>
                <a href="/profile" className="text-xl text-primary underline">
                  Personal Info.
                </a>
              </div>
              <div>
                <a href="/password" className="text-xl">
                  Change Password{" "}
                </a>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name">Name</label>
                <Input
                  name="name"
                  placeholder="Enter name"
                  theme="transparent"
                  border="gray"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  pattern="^\+?[1-9]\d{1,14}$"
                  theme="transparent"
                  border="gray"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>

              <div>
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  className="w-full rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary outline-none transition duration-200 ease-in"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="nationality">Nationality</label>
                <select
                  name="nationality"
                  id="nationality"
                  className="w-full rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary outline-none transition duration-200 ease-in"
                  value={nationality}
                  onChange={handleNationalityChange}
                >
                  <option value="">Select Nationality</option>
                  {optionsNationalities.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="qualifications">Qualifications</label>
                <select
                  name="qualifications"
                  id="qualifications"
                  className="w-full rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary outline-none transition duration-200 ease-in"
                  value={qualification}
                  onChange={handleQualificationChange}
                >
                  <option value="qualifications">Select Qualifications</option>
                  <option value="MASTER_DEGREE">Master&apos;s Degree</option>
                  <option value="BACHELOR_DEGREE">Bachelor&apos;s Degree</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject">Subject</label>
                <select
                  name="subject"
                  id="subject"
                  className="w-full rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary outline-none transition duration-200 ease-in"
                  value={subject}
                  onChange={handleSubjectChange}
                >
                  <option value="SCIENCE">Science</option>
                </select>
              </div>
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
      </Container>
    </>
  );
};

export default EditProfile;