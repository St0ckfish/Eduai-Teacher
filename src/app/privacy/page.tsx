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

const Privacy: React.FC = () => {
  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  return (
    <Container>
      <div dir={language === "ar" ? "rtl" : "ltr"}  className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
        <Text font={"bold"} size={"4xl"}>{translate("Privacy Policy", "Politique de Confidentialité", "سياسة الخصوصية")}</Text>
        <Section title={translate("Effective Date", "Date d'entrée en vigueur", "تاريخ السريان")} content="[Date]" />
        <Text font={"bold"} size={"2xl"}>{translate("Information We Collect", "Informations que Nous Collectons", "المعلومات التي نجمعها")}</Text>
        <Section 
          title={translate("Information You Provide:", "Informations que Vous Fournissez:", "المعلومات التي تقدمها:")}
          content={translate(
            "Personal Information: When you register or interact with our system, we may collect personal information such as your name, email address, phone number, and educational institution. Educational Data: We may collect information related to your academic performance, courses, assignments, and other educational activities.",
            "Informations Personnelles: Lorsque vous vous inscrivez ou interagissez avec notre système, nous pouvons collecter des informations personnelles telles que votre nom, votre adresse e-mail, votre numéro de téléphone et votre institution éducative. Données Éducatives: Nous pouvons collecter des informations relatives à vos performances académiques, cours, devoirs et autres activités éducatives.",
            "المعلومات الشخصية: عند التسجيل أو التفاعل مع نظامنا، قد نجمع معلومات شخصية مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك والمؤسسة التعليمية الخاصة بك. البيانات التعليمية: قد نجمع معلومات تتعلق بأدائك الأكاديمي والدورات الدراسية والواجبات والأنشطة التعليمية الأخرى."
          )}
        />
        <Section 
          title={translate("Information Collected Automatically:", "Informations Collectées Automatiquement:", "المعلومات التي تُجمع تلقائيًا:")}
          content={translate(
            "Usage Data: We collect information about your interactions with the system, including log data, such as your IP address, browser type, access times, pages viewed, and the links you clicked. Device Information: We may collect information about the device you use to access our system, including hardware model, operating system, and device identifiers.",
            "Données d'Utilisation: Nous collectons des informations sur vos interactions avec le système, y compris les données de journal, telles que votre adresse IP, le type de navigateur, les heures d'accès, les pages consultées et les liens sur lesquels vous avez cliqué. Informations sur l'Appareil: Nous pouvons collecter des informations sur l'appareil que vous utilisez pour accéder à notre système, y compris le modèle matériel, le système d'exploitation et les identifiants de l'appareil.",
            "بيانات الاستخدام: نجمع معلومات حول تفاعلاتك مع النظام، بما في ذلك بيانات السجل مثل عنوان IP الخاص بك، نوع المتصفح، أوقات الوصول، الصفحات التي تم عرضها، والروابط التي نقرت عليها. معلومات الجهاز: قد نجمع معلومات حول الجهاز الذي تستخدمه للوصول إلى نظامنا، بما في ذلك طراز الجهاز، نظام التشغيل، ومعرفات الجهاز."
          )}
        />
        <Section 
          title={translate("Information from Third Parties:", "Informations provenant de Tiers:", "المعلومات من أطراف ثالثة:")}
          content={translate(
            "We may receive information about you from third-party services, such as educational institutions or learning management systems that integrate with our EDU AI System.",
            "Nous pouvons recevoir des informations vous concernant provenant de services tiers, tels que des institutions éducatives ou des systèmes de gestion de l'apprentissage qui s'intègrent à notre système EDU AI.",
            "قد نتلقى معلومات عنك من خدمات أطراف ثالثة، مثل المؤسسات التعليمية أو أنظمة إدارة التعلم التي تندمج مع نظام EDU AI الخاص بنا."
          )}
        />
        <Text font={"bold"} size={"2xl"}>{translate("How We Use Your Information:", "Comment Nous Utilisons Vos Informations:", "كيف نستخدم معلوماتك:")}</Text>
        <Section 
          title={translate("Providing Services:", "Fournir des Services:", "تقديم الخدمات:")}
          content={translate(
            "To operate, maintain, and improve the EDU AI System, including providing personalized learning experiences and educational recommendations.",
            "Pour exploiter, maintenir et améliorer le système EDU AI, y compris fournir des expériences d'apprentissage personnalisées et des recommandations éducatives.",
            "لتشغيل نظام EDU AI وصيانته وتحسينه، بما في ذلك تقديم تجارب تعلم مخصصة وتوصيات تعليمية."
          )}
        />
        <Section 
          title={translate("Communication:", "Communication:", "الاتصال:")}
          content={translate(
            "To communicate with you, respond to your inquiries, and provide customer support.",
            "Pour communiquer avec vous, répondre à vos demandes et fournir un support client.",
            "للتواصل معك، الرد على استفساراتك، وتقديم الدعم للعملاء."
          )}
        />
        <Section 
          title={translate("Research and Development:", "Recherche et Développement:", "البحث والتطوير:")}
          content={translate(
            "To conduct research and analysis to improve our services and develop new features and functionalities.",
            "Pour effectuer des recherches et des analyses afin d'améliorer nos services et de développer de nouvelles fonctionnalités.",
            "لإجراء البحوث والتحليلات لتحسين خدماتنا وتطوير ميزات ووظائف جديدة."
          )}
        />
        <Section 
          title={translate("Compliance:", "Conformité:", "الامتثال:")}
          content={translate(
            "To comply with legal obligations, resolve disputes, and enforce our agreements.",
            "Pour se conformer aux obligations légales, résoudre les différends et faire respecter nos accords.",
            "للالتزام بالالتزامات القانونية، حل النزاعات، وفرض اتفاقياتنا."
          )}
        />
        <Section 
          title={translate("Security:", "Sécurité:", "الأمان:")}
          content={translate(
            "To monitor and protect the security of our system, prevent fraud, and address technical issues.",
            "Pour surveiller et protéger la sécurité de notre système, prévenir la fraude et résoudre les problèmes techniques.",
            "لمراقبة وحماية أمان نظامنا، منع الاحتيال، ومعالجة المشكلات التقنية."
          )}
        />
        <Text font={"bold"} size={"2xl"}>{translate("Sharing Your Information:", "Partage de Vos Informations:", "مشاركة معلوماتك:")}</Text>
        <Section 
          title={translate("Educational Institutions:", "Institutions Éducatives:", "المؤسسات التعليمية:")}
          content={translate(
            "With your consent, we may share your information with your educational institution for academic purposes.",
            "Avec votre consentement, nous pouvons partager vos informations avec votre institution éducative à des fins académiques.",
            "بموافقتك، قد نشارك معلوماتك مع مؤسستك التعليمية لأغراض أكاديمية."
          )}
        />
        <Section 
          title={translate("Service Providers:", "Fournisseurs de Services:", "مزودي الخدمات:")}
          content={translate(
            "We may share your information with third-party service providers who assist us in operating the system, such as hosting, data analysis, and customer service.",
            "Nous pouvons partager vos informations avec des fournisseurs de services tiers qui nous aident à exploiter le système, tels que l'hébergement, l'analyse des données et le service client.",
            "قد نشارك معلوماتك مع مزودي خدمات من أطراف ثالثة يساعدوننا في تشغيل النظام، مثل الاستضافة وتحليل البيانات وخدمة العملاء."
          )}
        />
        <Section 
          title={translate("Legal Requirements:", "Exigences Légales:", "المتطلبات القانونية:")}
          content={translate(
            "We may disclose your information if required by law, regulation, or legal process, or if we believe it is necessary to protect the rights, property, or safety of our users or others.",
            "Nous pouvons divulguer vos informations si la loi, un règlement ou une procédure légale l'exige, ou si nous pensons qu'il est nécessaire de protéger les droits, la propriété ou la sécurité de nos utilisateurs ou d'autres personnes.",
            "قد نفصح عن معلوماتك إذا كان ذلك مطلوبًا بموجب القانون أو اللوائح أو الإجراءات القانونية، أو إذا اعتقدنا أنه من الضروري حماية حقوق أو ممتلكات أو سلامة مستخدمينا أو الآخرين."
          )}
        />
        <Section title={translate("Your Rights and Choices:", "Vos Droits et Choix:", "حقوقك واختياراتك:")} />
        <Section 
          title={translate("Access:", "Accès:", "الوصول:")}
          content={translate(
            "You may request access to the personal information we hold about you.",
            "Vous pouvez demander l'accès aux informations personnelles que nous détenons à votre sujet.",
            "يمكنك طلب الوصول إلى المعلومات الشخصية التي نحتفظ بها عنك."
          )}
        />
        <Section 
          title={translate("Correction:", "Correction:", "التصحيح:")}
          content={translate(
            "You may request that we correct or update your personal information.",
            "Vous pouvez demander que nous corrigions ou mettions à jour vos informations personnelles.",
            "يمكنك طلب تصحيح أو تحديث معلوماتك الشخصية."
          )}
        />
        <Section 
          title={translate("Deletion:", "Suppression:", "الحذف:")}
          content={translate(
            "You may request that we delete your personal information, subject to certain exceptions.",
            "Vous pouvez demander que nous supprimions vos informations personnelles, sous réserve de certaines exceptions.",
            "يمكنك طلب حذف معلوماتك الشخصية، مع مراعاة بعض الاستثناءات."
          )}
        />
        <Section 
          title={translate("Objection:", "Objection:", "الاعتراض:")}
          content={translate(
            "You may object to the processing of your personal information for certain purposes.",
            "Vous pouvez vous opposer au traitement de vos informations personnelles à certaines fins.",
            "يمكنك الاعتراض على معالجة معلوماتك الشخصية لأغراض معينة."
          )}
        />
        <Section 
          title={translate("Children's Privacy:", "Confidentialité des Enfants:", "خصوصية الأطفال:")}
          content={translate(
            "Our system is designed for use by educational institutions and students. We do not knowingly collect personal information from children under the age of 13 without parental consent. If we learn that we have collected personal information from a child under 13 without verification of parental consent, we will delete that information.",
            "Notre système est conçu pour être utilisé par les institutions éducatives et les étudiants. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans sans le consentement parental. Si nous apprenons que nous avons collecté des informations personnelles auprès d'un enfant de moins de 13 ans sans vérification du consentement parental, nous supprimerons ces informations.",
            "تم تصميم نظامنا للاستخدام من قبل المؤسسات التعليمية والطلاب. نحن لا نجمع عن علم معلومات شخصية من أطفال دون سن 13 عامًا بدون موافقة الوالدين. إذا علمنا أننا جمعنا معلومات شخصية من طفل دون 13 عامًا دون التحقق من موافقة الوالدين، فسنحذف هذه المعلومات."
          )}
        />
        <Section 
          title={translate("Changes to Privacy Policy:", "Modifications de la Politique de Confidentialité:", "تغييرات في سياسة الخصوصية:")}
          content={translate(
            "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website and updating the 'Effective Date' at the top of this document. Your continued use of the EDU AI System after such changes constitutes your acceptance of the updated policy.",
            "Nous pouvons mettre à jour cette Politique de Confidentialité de temps en temps. Nous vous informerons de tout changement important en publiant la nouvelle Politique de Confidentialité sur notre site Web et en mettant à jour la 'Date d'entrée en vigueur' en haut de ce document. Votre utilisation continue du système EDU AI après ces changements constitue votre acceptation de la politique mise à jour.",
            "يجوز لنا تحديث سياسة الخصوصية هذه من وقت لآخر. سنعلمك بأي تغييرات جوهرية عن طريق نشر سياسة الخصوصية الجديدة على موقعنا الإلكتروني وتحديث 'تاريخ السريان' في أعلى هذا المستند. يعتبر استمرارك في استخدام نظام EDU AI بعد هذه التغييرات قبولاً منك للسياسة المحدثة."
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

export default Privacy;