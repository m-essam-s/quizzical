import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizQuestions } from "../lib/data";
import Question from "../components/Question";
import clsx from "clsx";
import { decode } from "html-entities";
import { QuestionType, QuizPreferences } from "../lib/definitions";

interface QuizProps {
    quizPreferences: QuizPreferences;
}

const Quiz: React.FC<QuizProps> = ({ quizPreferences }) => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        const fetchData = async () => {
            const data = await fetchQuizQuestions(quizPreferences);
            setQuestions(data);
            setIsLoaded(true);
        };
        fetchData();
        hasFetched.current = true; // Prevent multiple fetches
    }, [quizPreferences]);

    const navigate = useNavigate();

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setQuestions(prev =>
            prev.map(q =>
                q.id === name ? { ...q, userAnswer: value, isCorrect: value === q.correct_answer } : q
            )
        );
    };

    const handleSubmit = () => setIsSubmitted(true);
    const playAgain = () => navigate("/");

    const allAnswered = questions.every((q) => q.userAnswer);
    const correctAnswers = questions.filter((q) => q.isCorrect).length;

    const buttonClasses = clsx(
        "mt-4 w-1/2 mx-auto rounded-lg p-3 font-bold text-center",
        allAnswered
            ? "bg-button-bg text-custom-bg hover:bg-custom-hover border-2 border-button-bg"
            : "opacity-50 cursor-not-allowed bg-gray-300"
    );


    if (!isLoaded) return <p>Loading...</p>;

    return (
        <>
            {isSubmitted ? (
                <>
                    {questions.map((q) => (
                        <div key={q.id} className="border-b-2 border-custom-br mb-4 p-2">
                            <p className="flex justify-between">
                                <span className="border rounded-md bg-sky-100 border-sky-300 italic px-2">{q.category}</span>
                                <span className={clsx(
                                    "border rounded-md px-2",
                                    q.difficulty === "easy" && "bg-green-100 border-green-300 text-green-800",
                                    q.difficulty === "medium" && "bg-yellow-100 border-yellow-300 text-yellow-800",
                                    q.difficulty === "hard" && "bg-red-100 border-red-300 text-red-800"
                                )}>
                                    {q.difficulty}
                                </span>
                            </p>
                            <h1 className="font-bold text-xl mt-2">{decode(q.question)}</h1>
                            <div className="flex flex-wrap gap-4">
                                {q.shuffled_answers.map((answer) => (
                                    <div key={answer} className={clsx(
                                        "border rounded-md px-2",
                                        q.correct_answer === answer && "bg-green-100 border-green-300 text-green-800",
                                        q.userAnswer === answer && !q.isCorrect && "bg-red-100 border-red-300 text-red-800"
                                    )}>
                                        {decode(answer)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <h2 className="text-center font-bold text-2xl">
                        You scored {correctAnswers} out of {questions.length}
                    </h2>
                    <button onClick={playAgain} className={buttonClasses}>
                        Play Again
                    </button>
                </>
            ) : (
                <>
                    <div className="overflow-y-auto">
                        {questions.map((q) => (
                            <Question key={q.id} {...q} handleAnswerChange={handleAnswerChange} />
                        ))}
                    </div>
                    <button onClick={handleSubmit} className={buttonClasses} disabled={!allAnswered}>
                        {allAnswered ? "Submit" : `Answered ${questions.filter(q => q.userAnswer).length} of ${questions.length}`}
                    </button>
                </>
            )}
        </>
    );
};

export default Quiz;
