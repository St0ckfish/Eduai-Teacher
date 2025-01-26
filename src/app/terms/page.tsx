"use client";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import useLanguageStore from "~/APIs/store";

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
  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };
  return (
    <Container>
      <div dir={language === "ar" ? "rtl" : "ltr"}  className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
        <Text font={"bold"} size={"4xl"}>{translate("Terms and Conditions", "Termes et Conditions", "الشروط والأحكام")}</Text>
        <Section title={translate("Effective Date", "Date d'entrée en vigueur", "تاريخ السريان")} content="[Date]" />
        <Section 
          title={translate("Acceptance Of Terms", "Acceptation des Conditions", "قبول الشروط")}
          content={translate(
            "By accessing or using the EDU AI System, you agree to be bound by these Terms and Conditions. If you do not agree with these terms, you should not use our services.",
            "En accédant ou en utilisant le système EDU AI, vous acceptez d'être lié par ces Termes et Conditions. Si vous n'êtes pas d'accord avec ces termes, vous ne devriez pas utiliser nos services.",
            "من خلال الوصول إلى نظام EDU AI أو استخدامه، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، فلا يجب عليك استخدام خدماتنا."
          )}
        />
        <Text font={"bold"} size={"2xl"}>{translate("Use Of The Service", "Utilisation du Service", "استخدام الخدمة")}</Text>
        <Section 
          title={translate("Eligibility", "Admissibilité", "الأهلية")}
          content={translate(
            "You must be at least 13 years old to use the EDU AI System. By using the system, you represent and warrant that you meet this eligibility requirement.",
            "Vous devez avoir au moins 13 ans pour utiliser le système EDU AI. En utilisant le système, vous déclarez et garantissez que vous remplissez cette condition d'admissibilité.",
            "يجب أن تكون على الأقل في سن 13 عامًا لاستخدام نظام EDU AI. باستخدامك للنظام، فإنك تقر وتضمن أنك تستوفي هذا الشرط."
          )}
        />
        <Section 
          title={translate("Account Registration", "Enregistrement de Compte", "تسجيل الحساب")}
          content={translate(
            "To use certain features of the EDU AI System, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to keep your account information updated.",
            "Pour utiliser certaines fonctionnalités du système EDU AI, vous devrez peut-être créer un compte. Vous acceptez de fournir des informations précises, à jour et complètes lors du processus d'enregistrement et de maintenir vos informations de compte à jour.",
            "لاستخدام ميزات معينة من نظام EDU AI، قد تحتاج إلى إنشاء حساب. أنت توافق على تقديم معلومات دقيقة وحديثة وكاملة أثناء عملية التسجيل والحفاظ على تحديث معلومات حسابك."
          )}
        />
        <Section 
          title={translate("User Responsibilities", "Responsabilités de l'Utilisateur", "مسؤوليات المستخدم")}
          content={translate(
            "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
            "Vous êtes responsable de la confidentialité de vos identifiants de compte et de toutes les activités qui se déroulent sous votre compte. Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte.",
            "أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك وعن جميع الأنشطة التي تحدث بموجب حسابك. توافق على إخطارنا فورًا بأي استخدام غير مصرح به لحسابك."
          )}
        />
        <Section
          title={translate("Prohibited Activities", "Activités Interdites", "الأنشطة المحظورة")}
          content={translate("You agree not to use the EDU AI System for any unlawful or prohibited activities, including but not limited to:", "Vous acceptez de ne pas utiliser le système EDU AI pour des activités illégales ou interdites, y compris mais sans s'y limiter:", "توافق على عدم استخدام نظام EDU AI لأي أنشطة غير قانونية أو محظورة، بما في ذلك على سبيل المثال لا الحصر:")}
          items={[
            { title: translate("Innovation", "Innovation", "الابتكار"), description: translate("We believe in the power of innovation to transform education and drive progress.", "Nous croyons au pouvoir de l'innovation pour transformer l'éducation et stimuler le progrès.", "نؤمن بقوة الابتكار في تحويل التعليم ودفع التقدم.") },
            { title: translate("Excellence", "Excellence", "التميز"), description: translate("We are committed to delivering high-quality solutions that meet the needs of our users.", "Nous nous engageons à fournir des solutions de haute qualité répondant aux besoins de nos utilisateurs.", "نلتزم بتقديم حلول عالية الجودة تلبي احتياجات مستخدمينا.") },
            { title: translate("Accessibility", "Accessibilité", "إمكانية الوصول"), description: translate("We strive to make education accessible to everyone, regardless of location or background.", "Nous nous efforçons de rendre l'éducation accessible à tous, quel que soit le lieu ou l'origine.", "نسعى لجعل التعليم متاحًا للجميع بغض النظر عن الموقع أو الخلفية.") },
            { title: translate("Integrity", "Intégrité", "النزاهة"), description: translate("We uphold the highest standards of integrity in everything we do, ensuring transparency and trust.", "Nous respectons les normes les plus élevées d'intégrité dans tout ce que nous faisons, en garantissant la transparence et la confiance.", "نتمسك بأعلى معايير النزاهة في كل ما نقوم به لضمان الشفافية والثقة.") },
            { title: translate("Collaboration", "Collaboration", "التعاون"), description: translate("We believe in the importance of collaboration, working together with educators, students, and institutions to achieve common goals.", "Nous croyons en l'importance de la collaboration, en travaillant ensemble avec les éducateurs, les étudiants et les institutions pour atteindre des objectifs communs.", "نؤمن بأهمية التعاون والعمل مع المعلمين والطلاب والمؤسسات لتحقيق أهداف مشتركة.") }
          ]}
        />
        <Section 
          title={translate("Intellectual Property", "Propriété Intellectuelle", "الملكية الفكرية")}
          content={translate(
            "All content, trademarks, and intellectual property on the EDU AI System are owned by us or our licensors. You may not use, reproduce, or distribute any content from the system without our express written permission.",
            "Tous les contenus, marques et propriétés intellectuelles sur le système EDU AI nous appartiennent ou appartiennent à nos licenciés. Vous ne pouvez pas utiliser, reproduire ou distribuer de contenu du système sans notre autorisation écrite expresse.",
            "جميع المحتويات والعلامات التجارية والملكية الفكرية على نظام EDU AI مملوكة لنا أو لمرخصينا. لا يجوز لك استخدام أو نسخ أو توزيع أي محتوى من النظام دون إذن كتابي صريح منا."
          )}
        />
        <Section 
          title={translate("Termination Of Service", "Résiliation du Service", "إنهاء الخدمة")}
          content={translate(
            "We reserve the right to suspend or terminate your access to the EDU AI System at our sole discretion, without notice, if we believe you have violated these Terms and Conditions.",
            "Nous nous réservons le droit de suspendre ou de résilier votre accès au système EDU AI à notre seule discrétion, sans préavis, si nous pensons que vous avez violé ces Termes et Conditions.",
            "نحتفظ بالحق في تعليق أو إنهاء وصولك إلى نظام EDU AI حسب تقديرنا الخاص، دون إشعار، إذا كنا نعتقد أنك انتهكت هذه الشروط والأحكام."
          )}
        />
        <Section 
          title={translate("Limitation of Liability", "Limitation de Responsabilité", "تحديد المسؤولية")}
          content={translate(
            "To the fullest extent permitted by law, we shall not be liable for any damages arising from your use of the EDU AI System, including but not limited to direct, indirect, incidental, punitive, and consequential damages.",
            "Dans toute la mesure permise par la loi, nous ne serons pas responsables des dommages résultant de votre utilisation du système EDU AI, y compris mais sans s'y limiter les dommages directs, indirects, accessoires, punitifs et consécutifs.",
            "إلى الحد الأقصى الذي يسمح به القانون، لن نكون مسؤولين عن أي أضرار تنشأ عن استخدامك لنظام EDU AI، بما في ذلك على سبيل المثال لا الحصر الأضرار المباشرة أو غير المباشرة أو العرضية أو العقابية أو التبعية."
          )}
        />
        <Section 
          title={translate("Indemnification", "Indemnisation", "التعويض")}
          content={translate(
            "You agree to indemnify, defend, and hold harmless the EDU AI System, its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, and expenses arising out of your use of the system or your violation of these Terms and Conditions.",
            "Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité le système EDU AI, ses affiliés, dirigeants, administrateurs, employés et agents de toutes réclamations, responsabilités, dommages et dépenses découlant de votre utilisation du système ou de votre violation de ces Termes et Conditions.",
            "أنت توافق على تعويض وحماية وإعفاء نظام EDU AI والشركات التابعة له والمسؤولين والمديرين والموظفين والوكلاء من أي مطالبات أو مسؤوليات أو أضرار أو نفقات تنشأ عن استخدامك للنظام أو انتهاكك لهذه الشروط والأحكام."
          )}
        />
        <Section 
          title={translate("Governing Law", "Droit Applicable", "القانون الساري")}
          content={translate(
            "These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law principles.",
            "Ces Termes et Conditions seront régis et interprétés conformément aux lois de [Votre Pays/État], sans égard à ses principes de conflit de lois.",
            "تخضع هذه الشروط والأحكام وتُفسر وفقًا لقوانين [بلدك/ولايتك]، بغض النظر عن مبادئ تعارض القوانين الخاصة بها."
          )}
        />
        <Section 
          title={translate("Changes to Terms", "Modifications des Conditions", "تغييرات في الشروط")}
          content={translate(
            "We may update these Terms and Conditions from time to time. We will notify you of any material changes by posting the new Terms and Conditions on our website and updating the 'Effective Date' at the top of this document. Your continued use of the EDU AI System after such changes constitutes your acceptance of the updated terms.",
            "Nous pouvons mettre à jour ces Termes et Conditions de temps en temps. Nous vous informerons de tout changement important en publiant les nouveaux Termes et Conditions sur notre site Web et en mettant à jour la 'Date d'entrée en vigueur' en haut de ce document. Votre utilisation continue du système EDU AI après ces modifications constitue votre acceptation des termes mis à jour.",
            "يجوز لنا تحديث هذه الشروط والأحكام من وقت لآخر. سنعلمك بأي تغييرات جوهرية عن طريق نشر الشروط والأحكام الجديدة على موقعنا الإلكتروني وتحديث 'تاريخ السريان' في أعلى هذا المستند. يعتبر استمرارك في استخدام نظام EDU AI بعد هذه التغييرات قبولاً منك للشروط المحدثة."
          )}
        />
        <Section title={translate("Contact Information", "Informations de Contact", "معلومات الاتصال")} />
        <Section title={translate("Email", "E-mail", "البريد الإلكتروني")} content="contact@expotech.online" />
        <Section title={translate("Address", "Adresse", "العنوان")} content="Tetouan: Mezanine block B Office n° 4 BOROUJ 16 Avenue des Far N° 873 Tétouan" />
        <Section title={translate("Phone", "Téléphone", "الهاتف")} content="0708759037" />
      </div>
    </Container>
  );
};

export default Terms;
