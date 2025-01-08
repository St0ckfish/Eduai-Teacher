"use client"
import { useState } from 'react';
import Container from "~/_components/Container";
import { Plus } from 'lucide-react';

const FAQ = () => {
    const [openItem, setOpenItem] = useState<number | null>(null);

    const faqItems = [
        {
            question: "What is the EDU AI System?",
            answer: "The EDU AI System is a platform designed to enhance educational experiences by providing personalized learning recommendations, academic tracking, and various tools for students, teachers, and educational institutions."
        },
        {
            question: "How do I create an account?",
            answer: "To create an account, click on the 'Sign Up' button and follow the registration process..."
        },
        {
            question: "What information do I need to provide during registration?",
            answer: "During registration, you'll need to provide basic information such as your name, email, and role..."
        },
        {
            question: "Is my personal information safe with the EDU AI System?",
            answer: "Yes, we take data security seriously and implement various measures to protect your information..."
        },
        {
            question: "How can I reset my password?",
            answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page..."
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can delete your account through the account settings page..."
        },
        {
            question: "What should I do if I encounter technical issues?",
            answer: "If you encounter technical issues, please contact our support team..."
        },
        {
            question: "How often is the system updated?",
            answer: "The system receives regular updates to improve functionality and security..."
        },
        {
            question: "Who can access my educational data?",
            answer: "Only authorized personnel and yourself can access your educational data..."
        },
        {
            question: "How can I provide feedback or suggestions?",
            answer: "You can provide feedback through our feedback form or contact support..."
        }
    ];

    const toggleItem = (index: number | null) => {
        setOpenItem(openItem === index ? null : index);
    };

    return ( 
        <Container>
            <div className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-8">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold">We&apos;re here to help you with anything and everyting on EDUAI</h1>
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