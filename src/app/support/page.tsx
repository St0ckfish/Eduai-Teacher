"use client";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import { Text } from "~/_components/Text";
import axios from "axios";
import { baseURL } from "~/APIs/axios";
import { toast } from "react-toastify";
import useLanguageStore from "~/APIs/store";

const Bus = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!subject || !message) {
      toast.info(translate("Please fill out the subject and message.", "Veuillez remplir le sujet et le message.", "يرجى ملء الموضوع والرسالة."));
      return;
    }

    const formData = new FormData();
    formData.append(
      "feedback",
      JSON.stringify({ subject, message })
    );
    if (file) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(`${baseURL}/api/v1/feedback`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(translate("Feedback submitted successfully!", "Retour envoyé avec succès!", "تم إرسال التعليق بنجاح!"));
    } catch (error) {
      toast.error(translate("Failed to submit feedback. Please try again.", "Échec de l'envoi du retour. Veuillez réessayer.", "فشل في إرسال التعليق. يرجى المحاولة مرة أخرى."));
    }
  };

  return (
    <Container>
      <div className="mt-8 w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
        <div className="flex h-[80vh] flex-col items-center justify-evenly gap-8 md:flex-row">
          <div className="w-1/3 hidden md:block">
            <Image
              src={"/images/support.png"}
              alt={translate("Support", "Support", "الدعم")}
              width={500}
              height={500}
            />
          </div>
          <div className="w-full md:w-1/3">
            <div>
              <Text font={"bold"} size={"2xl"}>
                {translate("Support", "Support", "الدعم")}
              </Text>
              <Text className="mt-4">
                {translate(
                  "If you encounter any issues or have any inquiries, please provide the details below. You can also upload an image showing the problem. Our support team is here to assist you.",
                  "Si vous rencontrez des problèmes ou avez des questions, veuillez fournir les détails ci-dessous. Vous pouvez également télécharger une image montrant le problème. Notre équipe de support est là pour vous aider.",
                  "إذا واجهت أي مشاكل أو كانت لديك استفسارات، يرجى تقديم التفاصيل أدناه. يمكنك أيضًا تحميل صورة تُظهر المشكلة. فريق الدعم لدينا هنا لمساعدتك."
                )}
              </Text>
            </div>
            <form
              className="flex w-full flex-col gap-2 mt-8"
              onSubmit={handleSubmit}
            >
              <div>
                <Input
                  type="text"
                  id="subject"
                  placeholder={translate("Subject", "Sujet", "الموضوع")}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  theme="transparent"
                  border="gray"
                  className="mt-2"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  placeholder={translate("Write the problem", "Décrivez le problème", "اكتب المشكلة")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
                    <Text color={"gray"}>{translate("Upload Image", "Télécharger une image", "تحميل صورة")}</Text>
                  )}
                </div>
                <input
                  type="file"
                  className="opacity-0"
                  onChange={handleFileChange}
                />
              </label>
              <div className="mt-8">
                <Button type="submit">{translate("Submit", "Soumettre", "إرسال")}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Bus;