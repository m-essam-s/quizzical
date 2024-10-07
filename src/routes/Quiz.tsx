import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Difficulty } from "../data";
import Question from "./../components/Question";
import { nanoid } from 'nanoid';
import clsx from 'clsx';

const Quiz = (props: {
    formData: {
        category: number;
        difficulty: number;
        type: number;
    },
    setUserAnswers: (questions: {
        id: string;
        category: string;
        difficulty: string;
        type: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
        userAnswer: string;
        shuffledAnswers: string[];
    }[]) => void
}) => {
    const [questions, setQuestions] = useState([]);

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
                        shuffledAnswers: allAnswers.sort(() => Math.random() - 0.5), // Shuffle answers
                        userAnswer: '' // Initialize as empty string
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
                    userAnswer: value
                };
            }
            return question;
        });

        setQuestions(updatedQuestions);
    };

    const allQuestionsAnswered = questions.every(question => question.userAnswer !== "");
    const numberOfAnsweredQuestions = questions.filter(question => question.userAnswer !== "").length;

    const navigate = useNavigate();

    const handleSubmit = () => {
        props.setUserAnswers(questions); // Pass updated questions to setUserAnswers
        navigate('/result'); // Navigate to the result page
        console.log(questions);
    };

    return (
        <>
            {questions.map((question) => (
                <Question
                    key={question.id}
                    id={question.id}
                    category={question.category}
                    difficulty={question.difficulty}
                    type={question.type}
                    question={question.question}
                    correct_answer={question.correct_answer}
                    incorrect_answers={question.incorrect_answers} // Display shuffled answers
                    shuffled_answers={question.shuffledAnswers} // Pass shuffled answers to Question component
                    userAnswer={question.userAnswer}
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
