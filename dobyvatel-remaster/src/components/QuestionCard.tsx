import { useEffect, useState } from "react";
import { QuestionSet, QuestionType } from "../utils/types";

const QuestionComponent = () => {
    // State for questions
    const [questions, setQuestions] = useState<QuestionSet>({});
    // State for currently displayed question
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);

    // Fetch questions on component mount
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("../utils/Questions.json");
                const data = await response.json();
                setQuestions(data);
                console.log("Questions fetched:", data)
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    // Function to select a random question
    const selectRandomQuestion = () => {
        const questionKeys = Object.keys(questions);
        const randomKey = questionKeys[Math.floor(Math.random() * questionKeys.length)];
        const randomQuestion = questions[randomKey];
        setCurrentQuestion(randomQuestion);
    };

    // Render the component
    return (
        <div>
            <button onClick={selectRandomQuestion}>Next Question</button>
            {currentQuestion && (
                <div key={currentQuestion.id}>
                    <h2>{currentQuestion.text}</h2>
                    {currentQuestion.type === "option" && (
                        <ul>
                            {currentQuestion.options.map((option, index) => (
                                <li key={index}>{String(option)}</li>
                            ))}
                        </ul>
                    )}
                    {currentQuestion.type === "write" && (
                        <input type="text" placeholder="Your answer" />
                    )}
                </div>
            )}
        </div>
    );
};

export default QuestionComponent;
