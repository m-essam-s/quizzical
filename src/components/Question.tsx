import clsx from 'clsx';
import { decode } from 'html-entities';
import { useState } from 'react'

const Question = (props: {
    id: string,
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
    shuffled_answers: string[]
    userAnswer: string
    isCorrect: boolean
    handleAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {

    const [answers] = useState(() => {

        return props.shuffled_answers;
    });

    return (
        <div className="border-b-2 border-custom-br mb-4 p-2">
            <p className="flex justify-between">
                <span className="border rounded-md bg-sky-100 border-sky-300 italic px-2">{props.category}</span>
                <span
                    className={
                        clsx(
                            'border rounded-md px-2',
                            props.difficulty === 'easy' && 'bg-green-100 border-green-300 text-green-800',
                            props.difficulty === 'medium' && 'bg-yellow-100 border-yellow-300 text-yellow-800',
                            props.difficulty === 'hard' && 'bg-red-100 border-red-300 text-red-800',
                        )
                    }
                >
                    {props.difficulty}
                </span>
            </p>
            <h3 className="font-bold text-base md:text-lg text-justify text-wrap my-1">{decode(props.question)}</h3>
            <form action="" className=''>
                <div className='flex justify-between gap-x-2 md:gap-x-10 flex-wrap'>
                    {answers.map((answer, index) => (
                        <div key={index} className={`flex flex-row radio-toolbar mb-3`}>
                            <input
                                type="radio"
                                name={props.id}
                                id={props.id + index}
                                value={decode(answer)}
                                onChange={props.handleAnswerChange}
                            />
                            <label
                                htmlFor={props.id + index}
                                className='cursor-pointer text-sm md:text-base'
                            >
                                {decode(answer)}
                            </label>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default Question;