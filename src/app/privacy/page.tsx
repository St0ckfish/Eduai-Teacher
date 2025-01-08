"use client"
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";

type SectionProps = {
  title: string;
  content?: string;
  items?: { title: string; description: string }[];
};

const Section: React.FC<SectionProps> = ({ title, content, items }) => (
  <div className="my-4">
    <Text font={"bold"} size={"2xl"}>{title}</Text>
    {content && <Text font={"bold"} color="gray" className="mt-2">{content}</Text>}
    {items && (
      <ol className="list-decimal pl-6">
        {items.map((item, index) => (
          <li key={index} className="text-xl font-semibold">{item.title}
            <Text font={"bold"} color="gray" className="mt-2">{item.description}</Text>
          </li>
        ))}
      </ol>
    )}
  </div>
);

const Privacy: React.FC = () => {
  return (
    <Container>
      <div className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
        <Text font={"bold"} size={"4xl"}>Privacy Policy</Text>
        <Section title="Effective Date" content="[Date]" />
        <Text font={"bold"} size={"2xl"}>Information We Collect</Text>
        <Section 
          title="Information You Provide:" 
          content="Personal Information: When you register or interact with our system, we may collect personal information such as your name, email address, phone number, and educational institution.
          Educational Eata: We may collect information related to your academic performance, courses, assignments, and other educational activities.
          "
        />
        <Section 
          title="Information Collected Automatically:" 
          content="Usage Data: We collect information about your interactions with the system, including log data, such as your IP address, browser type, access times, pages viewed, and the links you clicked.
          Device Information: We may collect information about the device you use to access our system, including hardware model, operating system, and device identifiers.
          "
        />
        <Section 
          title="Information from Third Parties:" 
          content="We may receive information about you from third-party services, such as educational institutions or learning management systems that integrate with our EDU AI System."
        />
        <Text font={"bold"} size={"2xl"}>How We Use Your Information:</Text>
        <Section 
          title="Providing Services:" 
          content="To operate, maintain, and improve the EDU AI System, including providing personalized learning experiences and educational recommendations."
        />
        <Section
          title="Communication:"
          content="To communicate with you, respond to your inquiries, and provide customer support."
        />
        <Section 
          title="Research and Development:" 
          content="To conduct research and analysis to improve our services and develop new features and functionalities."
        />
        <Section 
          title="Compliance:" 
          content="To comply with legal obligations, resolve disputes, and enforce our agreements."
        />
        <Section 
          title="Security:" 
          content="To monitor and protect the security of our system, prevent fraud, and address technical issues."
        />
        <Text font={"bold"} size={"2xl"}>Sharing Your Information:</Text>
        <Section 
          title="Educational Institutions:" 
          content="With your consent, we may share your information with your educational institution for academic purposes."
        />
        <Section 
          title="Service Providers:" 
          content="We may share your information with third-party service providers who assist us in operating the system, such as hosting, data analysis, and customer service."
        />
        <Section 
          title="Legal Requirements:" 
          content="We may disclose your information if required by law, regulation, or legal process, or if we believe it is necessary to protect the rights, property, or safety of our users or others."
        />
        <Section title="Your Rights and Choices:" />
        <Section 
          title="Access:" 
          content="You may request access to the personal information we hold about you."
        />
        <Section 
          title="Correction:" 
          content="You may request that we correct or update your personal information."
        />
        <Section 
          title="Deletion:" 
          content="You may request that we delete your personal information, subject to certain exceptions."
        />
        <Section 
          title="Objection:" 
          content="You may object to the processing of your personal information for certain purposes."
        />
        <Section 
          title="Children's Privacy:" 
          content="Our system is designed for use by educational institutions and students. We do not knowingly collect personal information from children under the age of 13 without parental consent. If we learn that we have collected personal information from a child under 13 without verification of parental consent, we will delete that information."
        />
        <Section 
          title="Changes to Privacy Policy:" 
          content="We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website and updating the 'Effective Date' at the top of this document. Your continued use of the EDU AI System after such changes constitutes your acceptance of the updated policy."
        />
        <Section title="Contact Information" />
        <Section title="Email" content="contact@expotech.online" />
        <Section title="Address" content="Tetouan: Mezanine block B Office n° 4 BOROUJ 16 Avenue des Far N° 873 Tétouan" />
        <Section title="Phone" content="0708759037" />
      </div>
    </Container>
  );
};

export default Privacy;
