import { Module } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { QuizController } from './controllers/quiz.controller';

@Module({
  providers: [QuestionService],
  controllers: [QuizController]
})
export class QuizModule {}
