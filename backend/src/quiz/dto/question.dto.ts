export class QuestionDto {
  id: string;
  topic: string; // e.g., "Numbers and Operations", "Fractions and Decimals"
  questionText: string;
  options: string[]; // e.g., ["A", "B", "C", "D"]
  correctAnswer: string; // The correct option
  difficulty?: string; // e.g., "easy", "medium" - to suit 4th grade
} 