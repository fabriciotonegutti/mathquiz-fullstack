import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from './quiz.controller';
import { QuestionService } from '../services/question.service';
import { QuestionDto } from '../dto/question.dto';

describe('QuizController', () => {
  let controller: QuizController;
  let questionService: QuestionService;

  // Mock data for testing
  const mockQuestions: QuestionDto[] = [
    {
      id: '1',
      topic: 'Addition',
      questionText: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      difficulty: 'easy',
    },
    {
      id: '2',
      topic: 'Subtraction',
      questionText: 'What is 5 - 3?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '2',
      difficulty: 'easy',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            getQuizQuestions: jest.fn().mockReturnValue(mockQuestions),
          },
        },
      ],
    }).compile();

    controller = module.get<QuizController>(QuizController);
    questionService = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getQuizQuestions', () => {
    it('should return an array of questions', () => {
      const result = controller.getQuizQuestions();
      
      expect(questionService.getQuizQuestions).toHaveBeenCalled();
      expect(result).toEqual(mockQuestions);
    });
  });
});
