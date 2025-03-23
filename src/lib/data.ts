import { nanoid } from "nanoid";
import { QuestionType, QuizPreferences } from "./definitions";

export const Category = {
    0: "Any Category",
    9: "General Knowledge",
    10: "Entertainment: Books ",
    11: "Entertainment: Film",
    12: "Entertainment: Music ",
    13: "Entertainment: Musicals & amp; Theatres",
    14: "Entertainment: Television",
    15: "Entertainment: Video Games",
    16: "Entertainment: Board Games",
    17: "Science & amp; Nature",
    18: "Science: Computers",
    19: "Science: Mathematics",
    20: "Mythology",
    21: "Sports",
    22: "Geography",
    23: "History",
    24: "Politics",
    25: "Art",
    26: "Celebrities",
    27: "Animals",
    28: "Vehicles",
    29: "Entertainment: Comics",
    30: "Science: Gadgets",
    31: "Entertainment: Japanese Anime & amp; Manga",
    32: "Entertainment: Cartoon & amp; Animations ",
}

export const Difficulty = {
    0: "Any Difficulty",
    1: "Easy",
    2: "Medium",
    3: "Hard",
}

export const Type = {
    0: "Any Type",
    1: "Multiple Choice",
    2: "True / False",
}


export const fetchQuizQuestions = async (quizPreferences: QuizPreferences): Promise<QuestionType[]> => {
    const { category, difficulty, amount, type } = quizPreferences;

    const categoryParam = category !== 0 ? `&category=${category}` : "";
    const difficultyParam = difficulty !== 0 ? `&difficulty=${Difficulty[quizPreferences.difficulty as keyof typeof Difficulty].toLowerCase()}` : "";
    const typeParam = type === 1 ? "&type=multiple" : type === 2 ? "&type=boolean" : "";

    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}${categoryParam}${difficultyParam}${typeParam}`);
    const data = await response.json();

    if (data === null || data.response_code !== 0) {
        throw new Error("Error fetching questions");
    }

    return data.results.map((q: QuestionType) => ({
        id: nanoid(),
        category: q.category,
        difficulty: q.difficulty,
        type: q.type,
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
        shuffled_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        userAnswer: "",
        isCorrect: false
    }));
};

