import { Link } from 'react-router-dom'

const Button = (props: {
    to: string,
    text: string,
    className?: string
}) => {
    return (
        <Link
            to={props.to}
            className={`bg-button-bg rounded-lg p-3 border-2 border-button-bg text-custom-bg hover:text-custom-color hover:bg-custom-bg font-bold text-center ${props.className}`}
        >
            {props.text}
        </Link>
    )
}

export default Button;