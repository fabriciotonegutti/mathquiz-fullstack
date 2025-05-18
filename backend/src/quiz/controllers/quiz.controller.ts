import { Controller, Get } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { QuestionDto } from '../dto/question.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('start')
  getQuizQuestions(): QuestionDto[] {
    return this.questionService.getQuizQuestions();
  }
}
