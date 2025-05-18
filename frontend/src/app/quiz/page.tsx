"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import QuestionCard from '../../components/QuestionCard';
import ProgressBar from '../../components/ProgressBar';
import ResultsDisplay from '../../components/ResultsDisplay';
import Button from '../../components/Button';

interface Question {
  id: string;
  text: string;
  topic: string;
  difficulty: string;
  answers: Answer[];
  correctAnswerId: string;
}

interface Answer {
  id: string;
  text: string;
}

interface UserAnswer {
  questionId: string;
  selectedAnswerId: string | null;
  isCorrect: boolean;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch questions when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        // Use environment variable if available, otherwise use the deployed backend URL
        const apiUrl = process.env.NEXT_PUBLIC_API_URL 
          ? `${process.env.NEXT_PUBLIC_API_URL}/quiz/start` 
          : 'https://mathquiz-backend.onrender.com/api/quiz/start';
        
        console.log('Fetching quiz questions from:', apiUrl);
        const response = await fetch(apiUrl, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Include credentials if needed for cookies
          // credentials: 'include',
          // Add CORS mode
          mode: 'cors',
        });
        
        if (!response.ok) {
          console.error(`API request failed with status ${response.status}`);
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Quiz questions received:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          // No need for translation, just map the data to our expected format
          const formattedQuestions = data.map(item => {
            return {
              id: item.id,
              text: item.questionText,
              topic: item.topic,
              difficulty: item.difficulty,
              answers: item.options.map((option: string, index: number) => ({
                id: `answer-${index}`,
                text: option
              })),
              correctAnswerId: `answer-${item.options.indexOf(item.correctAnswer)}`
            };
          });
          
          setQuestions(formattedQuestions);
          setError(null);
        } else {
          setQuestions([]);
          setError("No questions available. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleNextQuestion = () => {
    // Save user's answer
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswerId;
    
    setUserAnswers([
      ...userAnswers,
      {
        questionId: currentQuestion.id,
        selectedAnswerId: selectedAnswer,
        isCorrect
      }
    ]);
    
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading Quiz...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8 max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
              <p className="text-gray-700 mb-6">{error || "No questions available. Please try again later."}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="solid"
                size="md"
              >
                Try Again
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <ResultsDisplay 
              questions={questions}
              userAnswers={userAnswers}
              onRestart={handleRestart}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <ProgressBar progress={progress} />
          
          <div className="mt-6">
            <QuestionCard
              question={currentQuestion}
              selectedAnswerId={selectedAnswer}
              onSelectAnswer={handleAnswerSelect}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              variant="solid"
              size="lg"
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 