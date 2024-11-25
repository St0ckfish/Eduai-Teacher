import Container from "~/_components/Container";
import { Text } from "~/_components/Text";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface ContactInfoProps {
  label: string;
  value: string;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="my-4 flex flex-col gap-2">
    <Text font={"semiBold"} size={"2xl"}>{title}</Text>
    {children}
  </div>
);

const ContactInfo: React.FC<ContactInfoProps> = ({ label, value }) => (
  <div className="flex flex-col gap-2">
    <Text font={"semiBold"} size={"2xl"}>{label}:</Text>
    <Text font={"medium"} color={"gray"}>{value}</Text>
  </div>
);

const About: React.FC = () => {
  return (
    <Container>
      <div className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
        <Text font={"bold"} size={"4xl"}>About us</Text>

        <Section title="About EDU AI System">
          <Text font={"medium"} color={"gray"}>
            The EDU AI System is an advanced educational platform designed to enhance the learning experience for students, educators, and institutions. Leveraging the power of artificial intelligence, our system offers personalized learning paths, academic tracking, and a suite of tools to support educational success.
          </Text>
        </Section>

        <Section title="Our Mission">
          <Text font={"medium"} color={"gray"}>
            Our mission is to revolutionize education by providing intelligent solutions that empower students to reach their full potential. We aim to bridge the gap between traditional learning methods and modern technology, making education more accessible, personalized, and effective.
          </Text>
        </Section>

        <Section title="Our Vision">
          <Text font={"medium"} color={"gray"}>
            We envision a world where every learner has access to the tools and resources they need to succeed. By harnessing AI, we strive to create a future where education is tailored to individual needs, fostering growth and achievement for all.
          </Text>
        </Section>

        <Section title="Our Values">
          <ol className="list-decimal pl-6">
            {[
              { title: "Innovation", description: "We believe in the power of innovation to transform education and drive progress." },
              { title: "Excellence", description: "We are committed to delivering high-quality solutions that meet the needs of our users." },
              { title: "Accessibility", description: "We strive to make education accessible to everyone, regardless of location or background." },
              { title: "Integrity", description: "We uphold the highest standards of integrity in everything we do, ensuring transparency and trust." },
              { title: "Collaboration", description: "We believe in the importance of collaboration, working together with educators, students, and institutions to achieve common goals." },
            ].map(({ title, description }) => (
              <div key={title}>
                <li className="text-xl font-semibold">{title}:</li>
                <Text font={"medium"} color={"gray"}>{description}</Text>
              </div>
            ))}
          </ol>
        </Section>

        <Section title="Contact Information">
          <ContactInfo label="Email" value="contact@expotech.online" />
          <ContactInfo label="Address" value="Tetouan: Mezanine block B Office n° 4 BOROUJ 16 Avenue des Far N° 873 Tétouan" />
          <ContactInfo label="Phone" value="0708759037" />
        </Section>
      </div>
    </Container>
  );
}

export default About;
