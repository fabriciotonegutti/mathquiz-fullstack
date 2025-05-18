import React from 'react';
import Button from './Button';

export interface Question {
  id: string;
  text: string;
  topic: string;
  difficulty: string;
  answers: Answer[];
  correctAnswerId: string;
}

export interface Answer {
  id: string;
  text: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswerId: string | null;
  onSelectAnswer: (answerId: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswerId,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="bg-white dark:bg-gray-700 shadow-xl rounded-lg p-6 md:p-8 w-full max-w-2xl mx-auto my-8">
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Question {questionNumber} of {totalQuestions}
        </p>
        {question.topic && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Topic: {question.topic}
          </p>
        )}
        {question.difficulty && (
           <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
             Level: {question.difficulty}
           </p>
        )}
      </div>
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.answers.map((answer) => (
          <Button
            key={answer.id}
            onClick={() => onSelectAnswer(answer.id)}
            variant={selectedAnswerId === answer.id ? 'solid' : 'default'} // 'solid' for selected, 'default' for others
            size="md"
            className={`w-full text-left justify-start !font-normal ${selectedAnswerId === answer.id ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}
          >
            {answer.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard; 