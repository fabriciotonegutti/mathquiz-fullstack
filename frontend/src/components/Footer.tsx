import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-600 py-4 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MathQuiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 