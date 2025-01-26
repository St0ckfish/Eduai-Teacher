"use client";
import { useState } from 'react';
import Container from "~/_components/Container";
import { Plus } from 'lucide-react';
import useLanguageStore from '~/APIs/store';

const FAQ = () => {
    const [openItem, setOpenItem] = useState<number | null>(null);
    const language = useLanguageStore((state) => state.language);
    const translate = (en: string, fr: string, ar: string) => {
        return language === "fr" ? fr : language === "ar" ? ar : en;
    };

    const faqItems = [
        {
            question: translate(
                "What is the EDU AI System?",
                "Qu'est-ce que le système EDU AI ?",
                "ما هو نظام EDU AI؟"
            ),
            answer: translate(
                "The EDU AI System is a platform designed to enhance educational experiences by providing personalized learning recommendations, academic tracking, and various tools for students, teachers, and educational institutions.",
                "Le système EDU AI est une plateforme conçue pour améliorer les expériences éducatives en fournissant des recommandations d'apprentissage personnalisées, un suivi académique et divers outils pour les étudiants, les enseignants et les institutions éducatives.",
                "نظام EDU AI هو منصة تهدف إلى تحسين التجارب التعليمية من خلال تقديم توصيات تعليمية مخصصة، تتبع أكاديمي، وأدوات مختلفة للطلاب والمعلمين والمؤسسات التعليمية."
            )
        },
        {
            question: translate(
                "How do I create an account?",
                "Comment créer un compte ?",
                "كيف يمكنني إنشاء حساب؟"
            ),
            answer: translate(
                "To create an account, click on the 'Sign Up' button and follow the registration process...",
                "Pour créer un compte, cliquez sur le bouton 'S'inscrire' et suivez le processus d'inscription...",
                "لإنشاء حساب، انقر على زر 'إنشاء حساب' واتبع عملية التسجيل..."
            )
        },
        {
            question: translate(
                "What information do I need to provide during registration?",
                "Quelles informations dois-je fournir lors de l'inscription ?",
                "ما المعلومات التي يجب تقديمها أثناء التسجيل؟"
            ),
            answer: translate(
                "During registration, you'll need to provide basic information such as your name, email, and role...",
                "Lors de l'inscription, vous devrez fournir des informations de base telles que votre nom, votre email et votre rôle...",
                "أثناء التسجيل، ستحتاج إلى تقديم معلومات أساسية مثل الاسم والبريد الإلكتروني والدور..."
            )
        },
        {
            question: translate(
                "Is my personal information safe with the EDU AI System?",
                "Mes informations personnelles sont-elles en sécurité avec le système EDU AI ?",
                "هل معلوماتي الشخصية آمنة مع نظام EDU AI؟"
            ),
            answer: translate(
                "Yes, we take data security seriously and implement various measures to protect your information...",
                "Oui, nous prenons la sécurité des données très au sérieux et mettons en œuvre diverses mesures pour protéger vos informations...",
                "نعم، نحن نتعامل مع أمان البيانات بجدية وننفذ تدابير متعددة لحماية معلوماتك..."
            )
        },
        {
            question: translate(
                "How can I reset my password?",
                "Comment réinitialiser mon mot de passe ?",
                "كيف يمكنني إعادة تعيين كلمة المرور؟"
            ),
            answer: translate(
                "You can reset your password by clicking on the 'Forgot Password' link on the login page...",
                "Vous pouvez réinitialiser votre mot de passe en cliquant sur le lien 'Mot de passe oublié' sur la page de connexion...",
                "يمكنك إعادة تعيين كلمة المرور بالنقر على رابط 'نسيت كلمة المرور' في صفحة تسجيل الدخول..."
            )
        },
        {
            question: translate(
                "Can I delete my account?",
                "Puis-je supprimer mon compte ?",
                "هل يمكنني حذف حسابي؟"
            ),
            answer: translate(
                "Yes, you can delete your account through the account settings page...",
                "Oui, vous pouvez supprimer votre compte via la page des paramètres du compte...",
                "نعم، يمكنك حذف حسابك من خلال صفحة إعدادات الحساب..."
            )
        },
        {
            question: translate(
                "What should I do if I encounter technical issues?",
                "Que dois-je faire si je rencontre des problèmes techniques ?",
                "ماذا أفعل إذا واجهت مشاكل تقنية؟"
            ),
            answer: translate(
                "If you encounter technical issues, please contact our support team...",
                "Si vous rencontrez des problèmes techniques, veuillez contacter notre équipe de support...",
                "إذا واجهت مشاكل تقنية، يرجى التواصل مع فريق الدعم لدينا..."
            )
        },
        {
            question: translate(
                "How often is the system updated?",
                "À quelle fréquence le système est-il mis à jour ?",
                "كم مرة يتم تحديث النظام؟"
            ),
            answer: translate(
                "The system receives regular updates to improve functionality and security...",
                "Le système reçoit des mises à jour régulières pour améliorer les fonctionnalités et la sécurité...",
                "يتلقى النظام تحديثات منتظمة لتحسين الوظائف والأمان..."
            )
        },
        {
            question: translate(
                "Who can access my educational data?",
                "Qui peut accéder à mes données éducatives ?",
                "من يمكنه الوصول إلى بياناتي التعليمية؟"
            ),
            answer: translate(
                "Only authorized personnel and yourself can access your educational data...",
                "Seul le personnel autorisé et vous-même pouvez accéder à vos données éducatives...",
                "فقط الموظفون المخولون وأنت يمكنك الوصول إلى بياناتك التعليمية..."
            )
        },
        {
            question: translate(
                "How can I provide feedback or suggestions?",
                "Comment puis-je fournir des commentaires ou des suggestions ?",
                "كيف يمكنني تقديم ملاحظات أو اقتراحات؟"
            ),
            answer: translate(
                "You can provide feedback through our feedback form or contact support...",
                "Vous pouvez fournir des commentaires via notre formulaire de retour ou contacter le support...",
                "يمكنك تقديم ملاحظاتك من خلال نموذج التعليقات الخاص بنا أو الاتصال بالدعم..."
            )
        }
    ];

    const toggleItem = (index: number | null) => {
        setOpenItem(openItem === index ? null : index);
    };

    return (
        <Container>
            <div dir={language === "ar" ? "rtl" : "ltr"}  className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-8">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold">
                        {translate(
                            "We're here to help you with anything and everything on EDU AI",
                            "Nous sommes là pour vous aider avec tout ce qui concerne EDU AI",
                            "نحن هنا لمساعدتك في كل شيء يتعلق بـ EDU AI"
                        )}
                    </h1>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="border-b border-borderPrimary">
                            <button
                                className="flex w-full justify-between py-4 text-left"
                                onClick={() => toggleItem(index)}
                            >
                                <span className="font-medium">{item.question}</span>
                                <Plus
                                    className={`h-6 w-6 transform text-primary transition-transform ${
                                        openItem === index ? 'rotate-45' : ''
                                    }`}
                                />
                            </button>
                            {openItem === index && (
                                <div className="pb-4 text-gray-600">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default FAQ;
