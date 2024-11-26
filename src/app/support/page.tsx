"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import { Text } from "~/_components/Text";

const Bus = () => {
  const [fileName, setFileName] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <>
      <Container>
        <div className="mt-8 w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
          <div className="flex h-[80vh] flex-col items-center justify-evenly gap-8 md:flex-row">
            <div className="w-1/3 hidden md:block">
              <Image
                src={"/images/support.png"}
                alt="Support"
                width={500}
                height={500}
              />
            </div>
            <div className="w-full md:w-1/3">
              <div>
                <Text font={"bold"} size={"2xl"}>
                  Support
                </Text>
                <Text className="mt-4">
                  If you encounter any issues or have any inquiries, please
                  provide the details below. You can also upload an image
                  showing the problem. Our support team is here to assist you.
                </Text>
              </div>
              <form className="flex w-full flex-col gap-2 mt-8">
                <div>
                  <Input
                    type="subject"
                    id="subject"
                    placeholder="Subject"
                    theme="transparent"
                    border="gray"
                    className="mt-2"
                  />
                </div>
                <div>
                  <textarea
                    id="area"
                    placeholder="Write the problem"
                    className="mt-4 w-full rounded-lg border border-borderPrimary bg-bgPrimary px-3 pt-3 pb-8 text-textPrimary outline-none transition duration-200 ease-in placeholder:text-textSecondary"
                  ></textarea>
                </div>
                <label className="h-[200px] rounded-xl border-2 border-dashed border-borderPrimary">
                  <div className="flex h-full flex-col items-center justify-center">
                    <AiOutlineCloudUpload
                      size={50}
                      className="text-textSecondary"
                    />
                    {fileName ? (
                      <Text className="mt-2 rounded-xl border border-borderPrimary px-4 py-2">
                        {fileName}
                      </Text>
                    ) : (
                      <Text
                        color={"gray"}
                      >
                        Upload Image
                      </Text>
                    )}
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    onChange={handleFileChange}
                  />
                </label>
                <div></div>

                
              </form>
              <div className="mt-8">
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Bus;
