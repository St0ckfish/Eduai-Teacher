"use client"
import React, { useState } from 'react';
import Container from '~/_components/Container';
import Button from '~/_components/Button';
import { useGetAllUnreviedQuestions, useUpdateupdateQuestion } from '~/APIs/hooks/useMaterial';
import Spinner from '~/_components/Spinner';
import { toast } from 'react-toastify';

interface Question {
    id: number;
    question: string;
    lesson_name: string;
    options: string[];
    correct_answer: string;
    question_type: string;
}

interface EditedQuestion {
    question: string;
    options: string[];
    correct_answer: string;
}

const Questions = () => {
    const { data, isLoading, refetch } = useGetAllUnreviedQuestions();
    const { mutate, isPending } = useUpdateupdateQuestion();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedQuestions, setEditedQuestions] = useState<Record<number, EditedQuestion>>({});

    const handleEdit = (questionId: number) => {
        if (editingId === questionId) {
            setEditingId(null);
        } else {
            setEditingId(questionId);
            if (!editedQuestions[questionId]) {
                const currentQuestion = data?.find((q: Question) => q.id === questionId);
                if (currentQuestion) {
                    setEditedQuestions({
                        ...editedQuestions,
                        [questionId]: {
                            question: currentQuestion.question,
                            options: [...currentQuestion.options],
                            correct_answer: currentQuestion.correct_answer
                        }
                    });
                }
            }
        }
    };

    const handleQuestionEdit = (questionId: number, newText: string) => {
        setEditedQuestions({
            ...editedQuestions,
            [questionId]: {
                ...editedQuestions[questionId] ?? {
                    question: '',
                    options: [],
                    correct_answer: ''
                },
                question: newText
            }
        });
    };

    const handleOptionEdit = (questionId: number, optionIndex: number, newText: string) => {
        const updatedOptions = [...(editedQuestions[questionId]?.options || [])];
        updatedOptions[optionIndex] = newText;
        
        setEditedQuestions({
            ...editedQuestions,
            [questionId]: {
                ...editedQuestions[questionId] ?? {
                    question: '',
                    options: [],
                    correct_answer: ''
                },
                options: updatedOptions
            }
        });
    };

    const handleCorrectAnswerChange = (questionId: number, answer: string) => {
        setEditedQuestions({
            ...editedQuestions,
            [questionId]: {
                ...editedQuestions[questionId] ?? {
                    question: '',
                    options: [],
                    correct_answer: ''
                },
                correct_answer: answer
            }
        });
    };

    const handleConfirm = (question: Question) => {
        const updatePayload = {
            id: question.id,
            question: editedQuestions[question.id]?.question || question.question,
            question_type: question.question_type,
            options: editedQuestions[question.id]?.options || question.options,
            correct_answer: editedQuestions[question.id]?.correct_answer || question.correct_answer
        };

        mutate({ data: updatePayload }, {
            onSuccess: () => {
                toast.success('Question updated successfully');
                void refetch();
                setEditingId(null);
                setEditedQuestions((prev) => {
                    const newState = { ...prev };
                    delete newState[question.id];
                    return newState;
                });
            },
            onError: (error) => {
                toast.error('Failed to update question');
                console.error('Update error:', error);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex w-full justify-center">
                <Spinner />
            </div>
        );
    }

    if (!data || !Array.isArray(data)) {
        return (
            <Container>
                <div className="flex w-full justify-center">
                    <p>No questions available</p>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Review Generated Questions</h1>
                        <p>Total Questions: {data.length}</p>
                    </div>
    
                    {data.map((question: Question, index: number) => (
                        <div key={question.id} className="p-6 rounded-lg mb-6 bg-bgPrimary shadow-lg">
                            <div className="mb-4">
                                <h2 className="font-semibold mb-4">{index + 1}. {question.lesson_name}:</h2>
                                
                                {editingId === question.id ? (
                                    <textarea
                                        value={editedQuestions[question.id]?.question ?? question.question}
                                        onChange={(e) => handleQuestionEdit(question.id, e.target.value)}
                                        className="w-full p-2 rounded border"
                                        rows={3}
                                        dir="rtl"
                                    />
                                ) : (
                                    <p className="mb-4 text-right" dir="rtl">{question.question}</p>
                                )}
                            </div>

                            <div className="space-y-3">
                                {question.options.map((option, optIndex) => (
                                    <div
                                        key={optIndex}
                                        className="flex items-center space-x-3 p-2 rounded"
                                        dir="rtl"
                                    >
                                        <input
                                            type="radio"
                                            name={`answer-${question.id}`}
                                            id={`${question.id}-${optIndex}`}
                                            className="form-radio"
                                            checked={option === (editedQuestions[question.id]?.correct_answer ?? question.correct_answer)}
                                            onChange={() => handleCorrectAnswerChange(question.id, option)}
                                        />
                                        {editingId === question.id ? (
                                            <input
                                                type="text"
                                                value={editedQuestions[question.id]?.options[optIndex] ?? option}
                                                onChange={(e) => handleOptionEdit(question.id, optIndex, e.target.value)}
                                                className="flex-grow mr-2 p-1 border rounded"
                                                dir="rtl"
                                            />
                                        ) : (
                                            <label htmlFor={`${question.id}-${optIndex}`} className="flex-grow mr-2">
                                                {option}
                                            </label>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex space-x-4 mt-6">
                                {editingId === question.id ? (
                                    <>
                                        <Button
                                            onClick={() => handleEdit(question.id)}
                                            className="flex-1 py-2 px-4 rounded bg-primary text-white"
                                            disabled={isPending}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            theme="outline"
                                            className="flex-1 py-2 px-4 rounded text-primary"
                                            onClick={() => handleConfirm(question)}
                                            disabled={isPending}
                                        >
                                            {isPending ? 'Updating...' : 'Confirm'}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => handleEdit(question.id)}
                                            className="flex-1 py-2 px-4 rounded bg-primary text-white"
                                            disabled={isPending}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            theme="outline"
                                            className="flex-1 py-2 px-4 rounded text-primary"
                                            onClick={() => handleConfirm(question)}
                                            disabled={isPending}
                                        >
                                            {isPending ? 'Updating...' : 'Confirm'}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Questions;