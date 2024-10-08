import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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

const Quiz: React.FC<QuizProps> = ({ formData }) => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [checkAnswer, setCheckAnswer] = useState(0);
    const [endGame, setEndGame] = useState(false);

    const amount = 5;

    // Memoize category, difficulty, and type to avoid recalculating on every render
    const category = useMemo(() => formData.category === 0 ? '' : `&category=${formData.category}`, [formData.category]);
    const difficulty = useMemo(() => formData.difficulty === 0 ? '' : `&difficulty=${Difficulty[formData.difficulty as keyof typeof Difficulty].toLowerCase()}`, [formData.difficulty]);
    const type = useMemo(() => formData.type === 0 ? '' : formData.type === 1 ? '&type=multiple' : '&type=boolean', [formData.type]);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;

        const fetchQuestions = async () => {
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}${category}${difficulty}${type}`);
            const data = await response.json();
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
                    shuffled_answers: allAnswers.sort(() => Math.random() - 0.5),
                    userAnswer: '',
                    isCorrect: false
                };
            });

            setQuestions(fetchedQuestions);
            hasFetched.current = true; // Prevent multiple fetches
        };

        fetchQuestions();
    }, [amount, category, difficulty, type]);

    // Update only the specific question that changes
    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setQuestions(prevQuestions => prevQuestions.map(question =>
            question.id === name
                ? { ...question, userAnswer: value, isCorrect: value === question.correct_answer }
                : question
        ));
    };

    const allQuestionsAnswered = questions.every(question => question.userAnswer !== "");
    const numberOfAnsweredQuestions = questions.filter(question => question.userAnswer !== "").length;

    const handleSubmit = useCallback(() => {
        if (checkAnswer === 0) {
            const updatedQuestions = questions.map(question => ({
                ...question,
                isCorrect: question.userAnswer === question.correct_answer
            }));
            setQuestions(updatedQuestions);
            setCheckAnswer(1);
        }
        setEndGame(true);
    }, [checkAnswer, questions]);

    const navigate = useNavigate();
    const playAgain = useCallback(() => navigate('/'), [navigate]);

    const buttonClasses = clsx(
        'mt-4 w-1/2 mx-auto rounded-lg p-3 font-bold text-center',
        !allQuestionsAnswered
            ? 'opacity-50 cursor-not-allowed bg-button-bg text-white border-2 border-button-bg'
            : 'bg-button-bg text-custom-bg hover:text-custom-color hover:bg-custom-bg border-2 border-button-bg'
    );

    if (endGame) {
        return (
            <>
                {questions.map((question: QuestionType) => (
                    <div key={question.id} className="border-b-2 border-custom-br mb-4 p-2">
                        <p className="flex justify-between">
                            <span className="border rounded-md bg-sky-100 border-sky-300 italic px-2">{question.category}</span>
                            <span
                                className={clsx(
                                    'border rounded-md px-2',
                                    question.difficulty === 'easy' && 'bg-green-100 border-green-300 text-green-800',
                                    question.difficulty === 'medium' && 'bg-yellow-100 border-yellow-300 text-yellow-800',
                                    question.difficulty === 'hard' && 'bg-red-100 border-red-300 text-red-800',
                                )}
                            >
                                {question.difficulty}
                            </span>
                        </p>
                        <h1 className="font-bold text-xl text-wrap mt-2 mb-0">{decode(question.question)}</h1>

                        <div className='flex flex-wrap gap-4'>
                            {question.shuffled_answers.map((answer) => (
                                <div
                                    key={answer}
                                    className={clsx(
                                        'border rounded-md px-2',
                                        question.correct_answer === answer && 'bg-green-100 border-green-300 text-green-800',
                                        question.userAnswer === answer && !question.isCorrect && 'bg-red-100 border-red-300 text-red-800',
                                    )}
                                >
                                    {decode(answer)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <h2 className="text-center font-bold text-2xl">You scored {questions.filter(question => question.isCorrect).length} out of {questions.length}</h2>
                <button
                    onClick={playAgain}
                    className={buttonClasses}
                >
                    Play Again
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
                className={buttonClasses}
                disabled={!allQuestionsAnswered}
            >
                {allQuestionsAnswered ? 'Submit' : `Answered ${numberOfAnsweredQuestions} of ${questions.length} questions`}
            </button>
        </>
    );
}

export default Quiz;
