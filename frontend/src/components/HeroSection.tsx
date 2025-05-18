"use client";

import React from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';

const HeroSection: React.FC = () => {
  const router = useRouter();
  
  const handleStartQuiz = () => {
    router.push('/quiz');
  };
  
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to MathQuiz!
          </h2>
          <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Challenge your 4th-grade math skills in a fun and interactive environment. Test your abilities and learn new concepts. Ready to start?
          </p>
          <Button 
            onClick={handleStartQuiz} 
            variant="solid" 
            size="lg" 
            shape="pill"
            className="text-lg tracking-wide"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 