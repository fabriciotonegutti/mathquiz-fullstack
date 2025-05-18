import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('getQuizQuestions', () => {
    it('should return an array of exactly 10 questions', () => {
      const questions = service.getQuizQuestions();
      expect(questions).toBeInstanceOf(Array);
      expect(questions.length).toBe(10);
    });
    
    it('should return questions with the correct structure', () => {
      const questions = service.getQuizQuestions();
      
      // Check that each question has the required fields
      questions.forEach(question => {
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('topic');
        expect(question).toHaveProperty('questionText');
        expect(question).toHaveProperty('options');
        expect(question).toHaveProperty('correctAnswer');
        
        // Check options array
        expect(question.options).toBeInstanceOf(Array);
        expect(question.options.length).toBeGreaterThanOrEqual(2);
        
        // Verify correctAnswer is one of the options
        expect(question.options).toContain(question.correctAnswer);
      });
    });
    
    it('should not return the same set of questions on subsequent calls', () => {
      const firstSet = service.getQuizQuestions();
      const secondSet = service.getQuizQuestions();
      
      // This test might occasionally fail due to randomness,
      // but it's very unlikely both sets would be identical
      expect(firstSet).not.toEqual(secondSet);
      
      // Alternative check: at least one question should be different
      let atLeastOneDifferent = false;
      for (let i = 0; i < firstSet.length; i++) {
        if (firstSet[i].id !== secondSet[i].id) {
          atLeastOneDifferent = true;
          break;
        }
      }
      
      expect(atLeastOneDifferent).toBe(true);
    });
  });
});
