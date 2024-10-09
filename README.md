# Quizzical

A dynamic quiz app that fetches trivia questions from the [Open Trivia Database](https://opentdb.com/) (OpenTDB) API based on user preferences such as category, difficulty, and question type. The app is built with React, using modern hooks like `useState`, `useEffect`, and `useRef` for optimized data fetching and state handling.

## Features

- **Customizable Questions:** Users can select the category, difficulty, and type of questions.
- **Dynamic Question Fetching:** Trivia questions are fetched in real-time from the OpenTDB API.
- **Multiple Answer Formats:** Supports both multiple-choice and true/false questions.
- **Shuffled Answers:** The app shuffles answers to avoid bias.
- **Instant Feedback:** Users get feedback on whether their answers are correct.
- **Final Score:** Displays the total number of correct answers at the end of the quiz.
- **Replay Option:** Allows users to play again after completing a quiz.

## Technologies Used

- **React**: For building the user interface and managing state.
- **TypeScript**: For type safety and improved code quality.
- **nanoid**: For generating unique IDs for each question.
- **clsx**: For conditional class name management.
- **html-entities**: For decoding HTML entities in the quiz questions.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/m-essam-s/quizzical.git
    cd quizzical
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the app:

    ```bash
    npm run dev
    ```
    
## Usage

1. Select the category, difficulty, and type of questions.
2. Answer the quiz questions by selecting an option.
3. Submit your answers to get feedback and see your score.
4. Replay the quiz by clicking "Play Again" after the game ends.

## Contributing

Feel free to open an issue or submit a pull request for any bugs or improvements.

## License

This project is licensed under the MIT License.
