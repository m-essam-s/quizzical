import {
    useId,
    useState
} from "react"

import { Link, useNavigate } from "react-router-dom";

import {
    Category,
    Difficulty,
    Type,
} from "../lib/data";

const GettingReady = (props: {
    setFormData: (
        formData: {
            category: number;
            difficulty: number;
            amount: number;
            type: number;
        }
    ) => void
}) => {

    const [formData, setFormData] = useState({
        category: 0,
        difficulty: 0,
        amount: 5,
        type: 0,
    });

    const handleFormChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: Number(value),
        }));

    };
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setFormData(formData);
        navigate('/quiz');
    };

    const id = useId();

    return (
        <>
            <h1 className="text-center font-bold text-3xl mb-2">Getting Ready</h1>
            <p className="italic mb-4 text-lg text-center">Select your preferences</p>
            <form onSubmit={handleSubmit}
                className="flex flex-col"
            >
                <label htmlFor={id + "-category"} className="cursor-pointer">Select Category:</label>
                <select
                    name="category"
                    id={id + "-category"}
                    className="mb-4 rounded-lg p-3 cursor-pointer border-2 border-gray-100 hover:border-button-bg"
                    onChange={handleFormChange}

                >
                    {Object.entries(Category).map(([id, category]) => (
                        <option key={id} value={id}>{category}</option>
                    ))}
                </select>
                <label htmlFor={id + "-difficulty"} className="cursor-pointer">Select Difficulty:</label>
                <select
                    name="difficulty"
                    id={id + "-difficulty"}
                    className="mb-4 rounded-lg p-3 cursor-pointer border-2 border-gray-100 hover:border-button-bg"
                    onChange={handleFormChange}
                >
                    {Object.entries(Difficulty).map(([id, difficulty]) => (
                        <option key={id} value={id}>{difficulty}</option>
                    ))}
                </select>
                <label htmlFor={id + "-amount"} className="cursor-pointer">Select Amount:</label>
                <select
                    name="amount"
                    id={id + "-amount"}
                    className="mb-4 rounded-lg p-3 cursor-pointer border-2 border-gray-100 hover:border-button-bg"
                    onChange={handleFormChange}
                >
                    {[5, 10, 15].map((amount) => (
                        <option key={amount} value={amount}>{amount}</option>
                    ))}
                </select>
                <label htmlFor={id + "-type"} className="cursor-pointer">Select Type:</label>
                <select
                    name="type"
                    id={id + "-type"}
                    className="mb-4 rounded-lg p-3 cursor-pointer border-2 border-gray-100 hover:border-button-bg"
                    onChange={handleFormChange}
                >
                    {Object.entries(Type).map(([id, type]) => (
                        <option key={id} value={id}>{type}</option>
                    ))}
                </select>
                <button className="bg-button-bg rounded-lg p-3 border-2 border-button-bg text-custom-bg hover:text-custom-color hover:bg-custom-bg font-bold text-center">
                    <Link
                        to={'/quiz'}
                    >
                        Start Quiz
                    </Link>
                </button>

            </form>
        </>
    )
}

export default GettingReady;