import Button from '../components/Button';
import { useState, useEffect } from 'react';
import { Difficulty } from "../data";
import Question from "./../components/Question";
import { nanoid } from 'nanoid';

const Quiz = (props: {
    formData: {
        category: number;
        difficulty: number;
        type: number;
    }
}) => {
    const [questions, setQuestions] = useState([]);
    // const [answeredQuestions, setAnsweredQuestions] = useState([]);

    const amount: number = 5;
    const category = props.formData['category'] === 0 ? '' : `&category=${props.formData['category']}`;
    const difficulty = props.formData['difficulty'] === 0 ? '' : `&difficulty=${Difficulty[props.formData['difficulty'] as keyof typeof Difficulty].toLowerCase()}`;
    const type = props.formData['type'] === 0 ? '' : props.formData['type'] === 1 ? '&type=multiple' : '&type=boolean';

    let x = 0;
    useEffect(() => {
        if (x > 0) return;
        fetch(`https://opentdb.com/api.php?amount=${amount}${category}${difficulty}${type}`)
            .then((response) => response.json())
            .then((data) => {
                setQuestions(
                    data.results.map((question: {
                        id: string;
                        category: string;
                        difficulty: string;
                        type: string;
                        question: string;
                        correct_answer: string;
                        incorrect_answers: string[];
                        userAnswer: string;
                    }) => {
                        return {
                            id: nanoid(),
                            category: question.category,
                            difficulty: question.difficulty,
                            type: question.type,
                            question: question.question,
                            correct_answer: question.correct_answer,
                            incorrect_answers: question.incorrect_answers,
                            userAnswer: ''
                        }
                    })
                );
            });
        x++;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedQuestions = questions.map((question: {
            id: string;
            category: string;
            difficulty: string;
            type: string;
            question: string;
            correct_answer: string;
            incorrect_answers: string[];
            userAnswer: string;
        }) => {
            if (question.id === name) {
                return {
                    ...question,
                    userAnswer: value
                }
            }
            return question;
        });
        console.log(updatedQuestions);
        // setAnsweredQuestions(updatedQuestions);
    }
    return (
        <>
            {questions.map((question: {
                id: string;
                category: string;
                difficulty: string;
                type: string;
                question: string;
                correct_answer: string;
                incorrect_answers: string[];
                userAnswer: string;
            }, index: number) => (
                <Question
                    key={index}
                    id={question.id}
                    category={question.category}
                    difficulty={question.difficulty}
                    type={question.type}
                    question={question.question}
                    correct_answer={question.correct_answer}
                    incorrect_answers={question.incorrect_answers}
                    userAnswer={question.userAnswer}
                    handleAnswerChange={handleAnswerChange}
                />
            ))}
            <Button
                to='/result'
                text='Submit'
            />
        </>
    )
}

export default Quiz;