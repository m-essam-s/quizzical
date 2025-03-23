# Quizzical

Quizzical is a React-based quiz application that allows users to select their quiz preferences and take a quiz based on those preferences. The application fetches quiz questions from an API and displays the results to the user.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Select quiz preferences including category, difficulty, amount, and type of questions.
- Fetch quiz questions from an API based on user preferences.
- Display quiz questions and handle user answers.
- Show quiz results and allow users to retake the quiz.

## Installation

To get started with Quizzical, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/m-essam-s/quizzical.git
    ```

2. Navigate to the project directory:

   ```bash
   cd quizzical
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

To run the application locally, use the following command:

```bash
npm run dev
```

This will start the development server and open the application in your default web browser. You can then interact with the application and take quizzes based on your preferences.

## Project Structure

The project structure is organized as follows:

```plaintext
quizzical/
├── public/
│   ├── index.html
│   ├── tr-shape.png
│   └── bl-shape.png
├── src/
│   ├── components/
│   │   └── Question.tsx
│   ├── routes/
│   │   ├── GettingReady.tsx
│   │   ├── Home.tsx
│   │   └── Quiz.tsx
│   ├── lib/
│   │   ├── data.ts
│   │   └── definitions.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
└── README.md
```

### Key Files

- `src/App.tsx`: Main application component that handles routing and quiz preferences.
- `src/components/Question.tsx`: Component for displaying individual quiz questions.
- `src/routes/GettingReady.tsx`: Component for selecting quiz preferences.
- `src/routes/Quiz.tsx`: Component for displaying the quiz and handling quiz submission.
- `src/lib/data.ts`: Contains data and functions for fetching quiz questions from the API.
- `src/lib/definitions.ts`: Defines TypeScript interfaces for the project.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
