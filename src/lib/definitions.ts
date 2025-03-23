export interface QuestionType {
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

export interface QuizPreferences {
    category: number;
    difficulty: number;
    amount: number;
    type: number;
}