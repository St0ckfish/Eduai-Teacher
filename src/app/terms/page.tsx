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

const Terms: React.FC = () => {
  return (
    <Container>
      <div className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
        <Text font={"bold"} size={"4xl"}>Terms and Conditions</Text>
        <Section title="Effective Date" content="[Date]" />
        <Section 
          title="Acceptance Of Terms" 
          content="By accessing or using the EDU AI System, you agree to be bound by these Terms and Conditions. If you do not agree with these terms, you should not use our services."
        />
        <Text font={"bold"} size={"2xl"}>Use Of The Service</Text>
        <Section 
          title="Eligibility" 
          content="You must be at least 13 years old to use the EDU AI System. By using the system, you represent and warrant that you meet this eligibility requirement."
        />
        <Section 
          title="Account Registration" 
          content="To use certain features of the EDU AI System, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to keep your account information updated."
        />
        <Section 
          title="User Responsibilities" 
          content="You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
        />
        <Section
          title="Prohibited Activities"
          content="You agree not to use the EDU AI System for any unlawful or prohibited activities, including but not limited to:"
          items={[
            { title: "Innovation", description: "We believe in the power of innovation to transform education and drive progress." },
            { title: "Excellence", description: "We are committed to delivering high-quality solutions that meet the needs of our users." },
            { title: "Accessibility", description: "We strive to make education accessible to everyone, regardless of location or background." },
            { title: "Integrity", description: "We uphold the highest standards of integrity in everything we do, ensuring transparency and trust." },
            { title: "Collaboration", description: "We believe in the importance of collaboration, working together with educators, students, and institutions to achieve common goals." }
          ]}
        />
        <Section 
          title="Intellectual Property" 
          content="All content, trademarks, and intellectual property on the EDU AI System are owned by us or our licensors. You may not use, reproduce, or distribute any content from the system without our express written permission."
        />
        <Section 
          title="Termination Of Service" 
          content="We reserve the right to suspend or terminate your access to the EDU AI System at our sole discretion, without notice, if we believe you have violated these Terms and Conditions."
        />
        <Section 
          title="Limitation of Liability" 
          content="To the fullest extent permitted by law, we shall not be liable for any damages arising from your use of the EDU AI System, including but not limited to direct, indirect, incidental, punitive, and consequential damages."
        />
        <Section 
          title="Indemnification" 
          content="You agree to indemnify, defend, and hold harmless the EDU AI System, its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, and expenses arising out of your use of the system or your violation of these Terms and Conditions."
        />
        <Section 
          title="Governing Law" 
          content="These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law principles."
        />
        <Section 
          title="Changes to Terms" 
          content="We may update these Terms and Conditions from time to time. We will notify you of any material changes by posting the new Terms and Conditions on our website and updating the 'Effective Date' at the top of this document. Your continued use of the EDU AI System after such changes constitutes your acceptance of the updated terms."
        />
        <Section title="Contact Information" />
        <Section title="Email" content="contact@expotech.online" />
        <Section title="Address" content="Tetouan: Mezanine block B Office n° 4 BOROUJ 16 Avenue des Far N° 873 Tétouan" />
        <Section title="Phone" content="0708759037" />
      </div>
    </Container>
  );
};

export default Terms;
