import { useState, useEffect, useRef } from 'react';
import { Difficulty } from "../data";
import Question from "./../components/Question";
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import { decode } from 'html-entities';
import { useNavigate } from 'react-router-dom';

interface QuizProps {
    formData: {
        category: number;
        difficulty: number;
        type: number;
    };
}

const Quiz: React.FC<QuizProps> = (props: {
    formData: {
        category: number;
        difficulty: number;
        type: number;
    },
}) => {
    interface QuestionType {
        id: string;
        category: string;
        difficulty: string;
        type: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
        shuffled_answers: string[];
        userAnswer: string;
        isCorrect: boolean;
    }

    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [checkAnswer, setCheckAnswer] = useState(0);
    const [endGame, setEndGame] = useState(false);


    const amount: number = 5;
    const category = props.formData['category'] === 0 ? '' : `&category=${props.formData['category']}`;
    const difficulty = props.formData['difficulty'] === 0 ? '' : `&difficulty=${Difficulty[props.formData['difficulty'] as keyof typeof Difficulty].toLowerCase()}`;
    const type = props.formData['type'] === 0 ? '' : props.formData['type'] === 1 ? '&type=multiple' : '&type=boolean';

    // Using useRef to track if it's the first render
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;

        fetch(`https://opentdb.com/api.php?amount=${amount}${category}${difficulty}${type}`)
            .then((response) => response.json())
            .then((data) => {
                const fetchedQuestions = data.results.map((question: {
                    category: string;
                    difficulty: string;
                    type: string;
                    question: string;
                    correct_answer: string;
                    incorrect_answers: string[];
                }) => {
                    const allAnswers = [...question.incorrect_answers, question.correct_answer];
                    return {
                        id: nanoid(),
                        category: question.category,
                        difficulty: question.difficulty,
                        type: question.type,
                        question: question.question,
                        correct_answer: question.correct_answer,
                        incorrect_answers: question.incorrect_answers,
                        shuffled_answers: allAnswers.sort(() => Math.random() - 0.5), // Shuffle answers
                        userAnswer: '', // Initialize as empty string
                        isCorrect: false
                    };
                });

                setQuestions(fetchedQuestions);
                hasFetched.current = true; // Ensure data is only fetched once
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        const updatedQuestions = questions.map((question) => {
            if (question.id === name) {
                return {
                    ...question,
                    userAnswer: value,
                    isCorrect: value === question.correct_answer
                };
            }
            return question;
        });

        setQuestions(updatedQuestions);

    };

    const allQuestionsAnswered = questions.every(question => question.userAnswer !== "");
    const numberOfAnsweredQuestions = questions.filter(question => question.userAnswer !== "").length;

    const handleSubmit = () => {
        if (checkAnswer === 0) {
            const updatedQuestions = questions.map((question) => {
                if (question.userAnswer === question.correct_answer) {
                    return {
                        ...question,
                        isCorrect: true
                    };
                }
                return question;
            });

            setQuestions(updatedQuestions);
            setCheckAnswer(
                checkAnswer + 1
            );
        }
        setEndGame(true);
    };

    const navigate = useNavigate();

    const playAgain = () => {
        navigate('/');
    }

    if (endGame) {
        return (
            <>
                {questions.map((question: QuestionType) => (
                    <div key={question.id} className="border-b-2 border-custom-br mb-4 p-2">
                        <p className="flex justify-between">
                            <span className="border rounded-md bg-sky-100 border-sky-300 italic px-2">{question.category}</span>
                            <span
                                className={
                                    clsx(
                                        'border rounded-md px-2',
                                        question.difficulty === 'easy' && 'bg-green-100 border-green-300 text-green-800',
                                        question.difficulty === 'medium' && 'bg-yellow-100 border-yellow-300 text-yellow-800',
                                        question.difficulty === 'hard' && 'bg-red-100 border-red-300 text-red-800',
                                    )
                                }
                            >
                                {question.difficulty}
                            </span>
                        </p>
                        <h1 className="font-bold text-xl text-wrap mt-2 mb-0">{decode(question.question)}</h1>

                        <div className='flex justify-between gap-x-10 w-fit flex-wrap'>
                            {question.shuffled_answers.map((answer) => (
                                <ul key={answer} className={`flex flex-row mb-2`}>
                                    <li
                                        className={
                                            clsx(
                                                'border rounded-md px-2',
                                                question.correct_answer === answer && 'bg-green-100 border-green-300 text-green-800',
                                                question.userAnswer === answer && !question.isCorrect && 'bg-red-100 border-red-300 text-red-800',
                                            )
                                        }
                                    >{decode(answer)}</li>
                                </ul>
                            ))}

                        </div>


                    </div>
                ))}
                <h2 className="text-center font-bold text-2xl">You scored {questions.filter(question => question.isCorrect).length} out of {questions.length}</h2>
                <button
                    onClick={playAgain}
                    className={clsx(
                        'mt-4 w-1/2 mx-auto',
                        !allQuestionsAnswered && 'opacity-50 cursor-not-allowed bg-button-bg rounded-lg p-3 border-2 border-button-bg text-white font-bold text-center',
                        allQuestionsAnswered && "bg-button-bg rounded-lg p-3 border-2 border-button-bg text-custom-bg hover:text-custom-color hover:bg-custom-bg font-bold text-center",
                    )}
                >
                    PlayAgain
                </button>
            </>
        );
    }

    return (
        <>
            {questions.map((question) => (
                <Question
                    {...question}
                    key={question.id}
                    handleAnswerChange={handleAnswerChange}
                />
            ))}
            <button
                onClick={handleSubmit}
                className={clsx(
                    'mt-4 w-1/2 mx-auto',
                    !allQuestionsAnswered && 'opacity-50 cursor-not-allowed bg-button-bg rounded-lg p-3 border-2 border-button-bg text-white font-bold text-center',
                    allQuestionsAnswered && "bg-button-bg rounded-lg p-3 border-2 border-button-bg text-custom-bg hover:text-custom-color hover:bg-custom-bg font-bold text-center",
                )}
                disabled={!allQuestionsAnswered}
            >
                {allQuestionsAnswered ? 'Submit' : `Answered ${numberOfAnsweredQuestions} of ${questions.length} questions`}
            </button>
        </>
    );
}

export default Quiz;
