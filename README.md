# MathQuiz

Um aplicativo de quiz de matemática interativo para estudantes do 4º ano, desenvolvido com Next.js e Nest.js.

![MathQuiz Logo](frontend/public/logo.png)

## Visão Geral

MathQuiz é uma aplicação web que fornece um ambiente divertido e educativo para testar conhecimentos de matemática. Os usuários podem responder a perguntas sobre vários tópicos de matemática do nível do 4º ano e receber feedback imediato sobre seu desempenho.

### Funcionalidades Principais

- Quizzes interativos de matemática
- Tópicos diversos (Operações, Frações, Geometria, etc.)
- Feedback imediato sobre respostas
- Sistema de pontuação
- Suporte a múltiplos idiomas (Inglês, Português, Espanhol)
- Design responsivo para dispositivos móveis e desktop

## Tecnologias Utilizadas

### Frontend
- [Next.js 15](https://nextjs.org/) - Framework React com suporte a SSR e internacionalização
- [TailwindCSS 4](https://tailwindcss.com/) - Framework CSS utilitário
- [next-intl](https://next-intl-docs.vercel.app/) - Biblioteca de internacionalização para Next.js

### Backend
- [Nest.js 11](https://nestjs.com/) - Framework Node.js progressivo
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Jest](https://jestjs.io/) - Framework de testes

## Como Executar

### Pré-requisitos
- Node.js (versão 18.x ou superior)
- npm ou yarn

### Configuração do Backend
1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run start:dev
   ```

O servidor será iniciado na porta 3001 por padrão e estará acessível em `http://localhost:3001/api`.

### Configuração do Frontend
1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O servidor será iniciado na porta 3000 por padrão e estará acessível em `http://localhost:3000`.

## Estrutura do Projeto

```
quiz-app/
│
├── backend/                  # Aplicação Nest.js
│   ├── src/
│   │   ├── quiz/             # Módulo principal do quiz
│   │   │   ├── controllers/  # Controladores da API
│   │   │   ├── dto/          # Objetos de transferência de dados
│   │   │   └── services/     # Serviços de negócio
│   │   ├── app.module.ts     # Módulo raiz da aplicação
│   │   └── main.ts           # Ponto de entrada da aplicação
│   └── test/                 # Testes
│
└── frontend/                 # Aplicação Next.js
    ├── messages/             # Arquivos de tradução
    │   ├── en.json           # Inglês
    │   ├── pt.json           # Português
    │   └── es.json           # Espanhol
    ├── public/               # Ativos estáticos
    └── src/
        ├── app/              # Páginas da aplicação
        │   └── [locale]/     # Rotas com suporte a idiomas
        │       └── quiz/     # Página do quiz
        ├── components/       # Componentes React reutilizáveis
        └── i18n/             # Configuração de internacionalização
```

## Deployment

Para instruções de implantação, consulte o arquivo [DEPLOYMENT.md](DEPLOYMENT.md).

## Testes

### Backend
```bash
cd backend
npm test            # Executar todos os testes
npm run test:watch  # Executar testes no modo watch
```

### Frontend
```bash
cd frontend
npm test            # Executar testes do frontend
```

## Contribuições

Contribuições são bem-vindas! Por favor, sinta-se à vontade para abrir issues ou enviar pull requests para melhorar o aplicativo.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE). 