"use client"
import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Container from '~/_components/Container';
import Button from '~/_components/Button';

const Questions = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [questionText, setQuestionText] = useState(
        "Every one of the students ____ to pass the exam."
    );
    const [options, setOptions] = useState([
        { id: 'a', text: 'hope' },
        { id: 'b', text: 'hopes' },
        { id: 'c', text: 'hoped' },
        { id: 'd', text: 'have hoped' }
    ]);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Container>

        
        <div className={`min-h-screen `}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Review Generated Questions</h1>
                </div>

                <div className={`p-6 rounded-lg mb-6 bg-bgPrimary shadow-lg`}>
                    <div className="mb-4">
                        <h2 className="font-semibold mb-4">1. Choose the correct form of verb for the given sentence:</h2>
                        
                        {isEditing ? (
                            <textarea
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                className={`w-full p-2 rounded border `}
                                rows={3}
                            />
                        ) : (
                            <p className="mb-4">&quot;{questionText}&quot;</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className={`flex items-center space-x-3 p-2 rounded `}
                            >
                                <input
                                    type="radio"
                                    name="answer"
                                    id={option.id}
                                    className="form-radio"
                                />
                                <label htmlFor={option.id} className="flex-grow">
                                    {option.id}) {option.text}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <Button
                            onClick={handleEdit}
                            className={`flex-1 py-2 px-4 rounded bg-primary text-white`}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                        <Button
                        theme='outline'
                            className={`flex-1 py-2 px-4 rounded  text-primary`}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </Container>
    );
};

export default Questions;