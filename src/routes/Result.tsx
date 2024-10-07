import { useLocation } from 'react-router-dom';
import Button from '../components/Button';

const Result = () => {
    const location = useLocation();
    const { questions, selectedAnswers, score } = location.state || {};

    return (
        <>
            <h1>Results</h1>
            <p>You scored {score} out of {questions.length}</p>

            {questions.map((question: {
                question: string;
                correct_answer: string;
            }, index: number) => (
                <div key={index}>
                    <h2>{question.question}</h2>
                    <p>Your Answer: {selectedAnswers[index]}</p>
                    <p>Correct Answer: {question.correct_answer}</p>
                </div>
            ))}

            <Button to='/' text='Play again' />
        </>
    );
}
export default Result;