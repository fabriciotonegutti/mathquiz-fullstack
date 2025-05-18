import React from 'react';
import Button from './Button';
import { Question } from './QuestionCard';

interface UserAnswer {
  questionId: string;
  selectedAnswerId: string | null;
  isCorrect: boolean;
}

interface ResultsDisplayProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  questions,
  userAnswers,
  onRestart,
}) => {
  const score = userAnswers.filter(answer => answer.isCorrect).length;
  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  
  let message = "Good effort! How about trying again?";
  if (percentage === 100) {
    message = "Congratulations, you got them all right! 🎉";
  } else if (percentage >= 70) {
    message = "Great job! Keep practicing.";
  }

  // Helper function to find answer text by ID
  const getAnswerTextById = (question: Question, answerId: string | null) => {
    if (!answerId) return "No answer selected";
    const answer = question.answers.find(a => a.id === answerId);
    return answer ? answer.text : "Unknown answer";
  };

  // Helper function to find correct answer text
  const getCorrectAnswerText = (question: Question) => {
    const answer = question.answers.find(a => a.id === question.correctAnswerId);
    return answer ? answer.text : "Unknown answer";
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow-xl rounded-lg p-6 md:p-8 w-full max-w-2xl mx-auto my-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Quiz Completed!</h2>
      <p className="text-xl text-gray-700 dark:text-gray-200 mb-2">
        Your score: {score} of {totalQuestions}
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        {message}
      </p>

      <div className="text-left my-6 border-t border-gray-200 dark:border-gray-600 pt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Answer Summary:</h3>
        <ul className="space-y-3">
          {userAnswers.map((answer, index) => {
            const question = questions.find(q => q.id === answer.questionId);
            if (!question) return null;
            
            return (
              <li 
                key={answer.questionId} 
                className={`p-3 rounded-md ${answer.isCorrect ? 'bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700'}`}
              >
                <p className="font-medium text-gray-800 dark:text-white">{index + 1}. {question.text}</p>
                <p className={`text-sm ${answer.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  Your answer: {getAnswerTextById(question, answer.selectedAnswerId)} 
                  {answer.isCorrect ? 
                    <span className="font-semibold"> (Correct)</span> : 
                    <span className="font-semibold"> (Correct: {getCorrectAnswerText(question)})</span>
                  }
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <Button 
        onClick={onRestart} 
        variant="solid" 
        size="lg"
        shape="pill"
        className="mt-8 text-lg tracking-wide"
      >
        Play Again
      </Button>
    </div>
  );
};

export default ResultsDisplay; 