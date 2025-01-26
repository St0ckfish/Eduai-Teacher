"use client";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import useLanguageStore from "~/APIs/store";

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
  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  return (
    <Container>
      <div dir={language === "ar" ? "rtl" : "ltr"} className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
        <Text font={"bold"} size={"4xl"}>
          {translate("About us", "À propos de nous", "من نحن")}
        </Text>

        <Section title={translate("About EDU AI System", "À propos du système EDU AI", "حول نظام EDU AI")}>
          <Text font={"medium"} color={"gray"}>
            {translate(
              "The EDU AI System is an advanced educational platform designed to enhance the learning experience for students, educators, and institutions. Leveraging the power of artificial intelligence, our system offers personalized learning paths, academic tracking, and a suite of tools to support educational success.",
              "Le système EDU AI est une plateforme éducative avancée conçue pour améliorer l'expérience d'apprentissage des étudiants, des éducateurs et des institutions. En exploitant la puissance de l'intelligence artificielle, notre système propose des parcours d'apprentissage personnalisés, un suivi académique et une gamme d'outils pour favoriser la réussite éducative.",
              "نظام EDU AI هو منصة تعليمية متقدمة تهدف إلى تحسين تجربة التعلم للطلاب والمعلمين والمؤسسات. باستخدام الذكاء الاصطناعي، يوفر نظامنا مسارات تعلم مخصصة، وتتبع أكاديمي، ومجموعة من الأدوات لدعم النجاح التعليمي."
            )}
          </Text>
        </Section>

        <Section title={translate("Our Mission", "Notre mission", "مهمتنا")}>
          <Text font={"medium"} color={"gray"}>
            {translate(
              "Our mission is to revolutionize education by providing intelligent solutions that empower students to reach their full potential. We aim to bridge the gap between traditional learning methods and modern technology, making education more accessible, personalized, and effective.",
              "Notre mission est de révolutionner l'éducation en proposant des solutions intelligentes permettant aux étudiants d'atteindre leur plein potentiel. Nous visons à combler le fossé entre les méthodes d'apprentissage traditionnelles et la technologie moderne, rendant l'éducation plus accessible, personnalisée et efficace.",
              "مهمتنا هي إحداث ثورة في التعليم من خلال تقديم حلول ذكية تمكّن الطلاب من تحقيق إمكاناتهم الكاملة. نسعى لسد الفجوة بين أساليب التعلم التقليدية والتكنولوجيا الحديثة، مما يجعل التعليم أكثر سهولة وتخصيصًا وفعالية."
            )}
          </Text>
        </Section>

        <Section title={translate("Our Vision", "Notre vision", "رؤيتنا")}>
          <Text font={"medium"} color={"gray"}>
            {translate(
              "We envision a world where every learner has access to the tools and resources they need to succeed. By harnessing AI, we strive to create a future where education is tailored to individual needs, fostering growth and achievement for all.",
              "Nous envisageons un monde où chaque apprenant a accès aux outils et ressources dont il a besoin pour réussir. En exploitant l'IA, nous nous efforçons de créer un avenir où l'éducation est adaptée aux besoins individuels, favorisant la croissance et la réussite pour tous.",
              "نحن نتخيل عالماً يتمكن فيه كل متعلم من الوصول إلى الأدوات والموارد التي يحتاجها للنجاح. من خلال استغلال الذكاء الاصطناعي، نسعى لخلق مستقبل يُلائم التعليم فيه الاحتياجات الفردية، مما يعزز النمو والإنجاز للجميع."
            )}
          </Text>
        </Section>

        <Section title={translate("Our Values", "Nos valeurs", "قيمنا")}>
          <ol className="list-decimal pl-6">
            {[
              {
                en: "Innovation",
                fr: "Innovation",
                ar: "الابتكار",
                description: {
                  en: "We believe in the power of innovation to transform education and drive progress.",
                  fr: "Nous croyons au pouvoir de l'innovation pour transformer l'éducation et stimuler le progrès.",
                  ar: "نؤمن بقوة الابتكار في تحويل التعليم ودفع التقدم."
                },
              },
              {
                en: "Excellence",
                fr: "Excellence",
                ar: "التميز",
                description: {
                  en: "We are committed to delivering high-quality solutions that meet the needs of our users.",
                  fr: "Nous nous engageons à fournir des solutions de haute qualité répondant aux besoins de nos utilisateurs.",
                  ar: "نلتزم بتقديم حلول عالية الجودة تلبي احتياجات مستخدمينا."
                },
              },
              // Add other values similarly
            ].map(({ en, fr, ar, description }) => (
              <div key={en}>
                <li className="text-xl font-semibold">{translate(en, fr, ar)}:</li>
                <Text font={"medium"} color={"gray"}>
                  {translate(description.en, description.fr, description.ar)}
                </Text>
              </div>
            ))}
          </ol>
        </Section>

        <Section title={translate("Contact Information", "Informations de contact", "معلومات الاتصال")}>
          <ContactInfo
            label={translate("Email", "E-mail", "البريد الإلكتروني")}
            value="contact@expotech.online"
          />
          <ContactInfo
            label={translate("Address", "Adresse", "العنوان")}
            value="Tetouan: Mezanine block B Office n° 4 BOROUJ 16 Avenue des Far N° 873 Tétouan"
          />
          <ContactInfo
            label={translate("Phone", "Téléphone", "الهاتف")}
            value="0708759037"
          />
        </Section>
      </div>
    </Container>
  );
};

export default About;
