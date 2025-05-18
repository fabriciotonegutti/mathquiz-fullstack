import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS to allow frontend to make requests
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*', // Use environment variable or allow all
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // Add 'api' prefix to all routes
  app.setGlobalPrefix('api');
  
  // Use PORT from environment or default to 3001
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
