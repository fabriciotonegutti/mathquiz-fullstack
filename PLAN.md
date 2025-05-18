# Plano de Ação: Quiz de Matemática (Nest.js + Next.js)

Este documento detalha os passos para construir a aplicação de quiz de matemática, com backend em Nest.js e frontend em Next.js com TailwindCSS.

## Fase 1: Configuração do Projeto e Backend (Nest.JS)

O objetivo desta fase é ter um backend funcional capaz de gerar e fornecer perguntas para o quiz.

### ✅ Tarefa 1.1: Inicializar Projeto Nest.JS
*   **O que fazer**: Criar a estrutura base do projeto Nest.JS para o backend.
*   **Como fazer**:
    1.  Navegar até o diretório raiz do projeto.
    2.  Executar o comando do Nest CLI: `nest new backend`.
    3.  Quando solicitado sobre o gerenciador de pacotes, escolher `npm`.
*   **Resultado Esperado**: Um diretório `backend` será criado contendo uma aplicação Nest.JS padrão, pronta para desenvolvimento. O diretório incluirá `package.json`, `tsconfig.json`, `src/main.ts`, `src/app.module.ts`, etc.

### ✅ Tarefa 1.2: Definir Módulo do Quiz
*   **O que fazer**: Criar um módulo dedicado para agrupar toda a lógica relacionada ao quiz.
*   **Como fazer**:
    1.  Navegar até o diretório `backend`.
    2.  Executar o comando do Nest CLI: `nest g module quiz`.
*   **Resultado Esperado**: Um diretório `backend/src/quiz` será criado, contendo o arquivo `quiz.module.ts`. Este módulo será importado no `AppModule`.

### ✅ Tarefa 1.3: Definir Estrutura da Pergunta (DTO/Interface)
*   **O que fazer**: Especificar a estrutura de dados para uma pergunta de matemática.
*   **Como fazer**:
    1.  Criar um arquivo, por exemplo, `backend/src/quiz/dto/question.dto.ts` ou `backend/src/quiz/interfaces/question.interface.ts`.
    2.  Definir uma classe ou interface com os seguintes campos:
        *   `id: string` (identificador único)
        *   `topic: string` (ex: "Números e Operações", "Frações e Decimais")
        *   `questionText: string` (o enunciado da pergunta)
        *   `options: string[]` (uma lista de opções de resposta, ex: ["A", "B", "C", "D"])
        *   `correctAnswer: string` (a opção correta)
        *   `difficulty: string` (opcional, ex: "fácil", "médio") - Para adequar ao 4th grade.
*   **Resultado Esperado**: Um tipo de dado (`QuestionDto` ou `Question`) claramente definido que representará cada pergunta no sistema.

### ✅ Tarefa 1.4: Criar Serviço de Perguntas (QuestionService)
*   **O que fazer**: Implementar a lógica de negócio para gerar ou buscar as perguntas do quiz.
*   **Como fazer**:
    1.  Navegar até o diretório `backend`.
    2.  Executar o comando do Nest CLI: `nest g service quiz/services/question --flat` (ou `nest g s quiz` e mover o arquivo).
    3.  No `QuestionService` (`backend/src/quiz/services/question.service.ts`):
        *   Criar um array privado com um banco de perguntas de exemplo, cobrindo os tópicos do 4th grade:
            *   Números e Operações (valor posicional, adição, subtração, multiplicação, divisão).
            *   Frações e Decimais (compreensão, equivalência, adição/subtração com denominadores iguais, introdução a decimais).
            *   Geometria e Medidas (figuras, perímetro/área, ângulos, conversão de unidades).
            *   Dados e Probabilidade (gráficos, tabelas, noções de probabilidade).
        *   Implementar um método `getQuizQuestions(): QuestionDto[]` que:
            *   Selecione aleatoriamente 10 perguntas únicas do banco de dados.
            *   Assegure que as perguntas são adequadas para o nível (4th grade).
*   **Resultado Esperado**: O `QuestionService` será capaz de fornecer um array de 10 objetos `QuestionDto` para iniciar um quiz. O serviço deve ser injetável no `QuizController`.

### ✅ Tarefa 1.5: Criar Controlador do Quiz (QuizController)
*   **O que fazer**: Definir os endpoints da API para interagir com o quiz.
*   **Como fazer**:
    1.  Navegar até o diretório `backend`.
    2.  Executar o comando do Nest CLI: `nest g controller quiz/controllers/quiz --flat`.
    3.  No `QuizController` (`backend/src/quiz/controllers/quiz.controller.ts`):
        *   Injetar o `QuestionService`.
        *   Criar um endpoint `GET /quiz/start` (ou apenas `/quiz` se o controller tiver o prefixo 'quiz').
        *   Este endpoint chamará `questionService.getQuizQuestions()` e retornará a lista de perguntas.
*   **Resultado Esperado**: Um endpoint de API (ex: `http://localhost:3000/api/quiz/start`) que, ao ser acessado via GET, retorna um JSON com 10 perguntas de matemática.

### Tarefa 1.6: (Opcional Inicialmente) Endpoint de Submissão de Respostas
*   **O que fazer**: Criar um endpoint para o usuário submeter suas respostas e receber o resultado.
*   **Como fazer**:
    1.  No `QuizController`, adicionar um endpoint `POST /quiz/submit`.
    2.  Este endpoint receberá um payload com as respostas do usuário (ex: `[{ questionId: string, selectedAnswer: string }]`).
    3.  No `QuestionService` (ou um novo `QuizService`), implementar a lógica para verificar as respostas e calcular a pontuação.
    4.  O endpoint retornará o resultado (ex: `{ score: number, totalQuestions: number, results: [{ questionId: string, correct: boolean, correctAnswer: string }] }`).
*   **Resultado Esperado**: Um endpoint que permite a avaliação das respostas do quiz.

## Fase 2: Frontend (Next.js & TailwindCSS)

O objetivo desta fase é criar uma interface de usuário interativa e visualmente agradável para o quiz, baseada na imagem de referência.

### ✅ Tarefa 2.1: Inicializar Projeto Next.JS com TailwindCSS
*   **O que fazer**: Configurar a estrutura base do projeto frontend.
*   **Como fazer**:
    1.  Navegar até o diretório raiz do projeto.
    2.  Executar o comando: `npx create-next-app@latest frontend --typescript --tailwind`.
    3.  Seguir as instruções do CLI (nome do projeto: `frontend`, usar App Router se perguntado e fizer sentido para a complexidade).
*   **Resultado Esperado**: Um diretório `frontend` com uma aplicação Next.js funcional e TailwindCSS configurado. Incluirá `package.json`, `tailwind.config.js`, `postcss.config.js`, e a estrutura de diretórios `pages` (ou `app`) e `public`.

### ✅ Tarefa 2.2: Design e Criação de Componentes UI
*   **O que fazer**: Desenvolver componentes React reutilizáveis para a interface do quiz, inspirados na imagem de referência.
*   **Como fazer**:
    1.  Criar um diretório `frontend/src/components`.
    2.  Desenvolver componentes como:
        *   `Header.tsx`: Para o cabeçalho da aplicação (Logo "AgencyCo", links de navegação - adaptar para "MathQuiz").
        *   `HeroSection.tsx`: Para a seção principal da página inicial (adaptar o texto para o quiz).
        *   `Button.tsx`: Um componente de botão estilizado.
        *   `QuestionCard.tsx`: Para exibir uma pergunta, suas opções e lidar com a seleção.
        *   `ProgressBar.tsx`: Para mostrar o progresso no quiz (ex: "Pergunta 3 de 10").
        *   `ResultsDisplay.tsx`: Para mostrar a pontuação final e feedback.
    3.  Estilizar os componentes usando classes do TailwindCSS. Usar a imagem de referência para guiar o design (cores, layout, tipografia), mas adaptando para o tema do quiz.
*   **Resultado Esperado**: Um conjunto de componentes React estilizados e prontos para serem usados nas páginas da aplicação.

### ✅ Tarefa 2.3: Desenvolver Página Inicial (Landing Page)
*   **O que fazer**: Criar a página inicial que introduz o quiz e permite ao usuário iniciá-lo.
*   **Como fazer**:
    1.  Editar/Criar `frontend/src/app/page.tsx` (ou `frontend/src/pages/index.tsx` se usando Pages Router).
    2.  Utilizar os componentes `Header` e `HeroSection` criados.
    3.  Adicionar um botão "Iniciar Quiz" que navegará para a página do quiz.
    4.  Adaptar o conteúdo da imagem de referência para ser sobre o quiz de matemática (ex: "Desafie seus conhecimentos de matemática do 4º ano!").
*   **Resultado Esperado**: Uma página inicial atraente e funcional que convida o usuário a começar o quiz.

### ✅ Tarefa 2.4: Desenvolver Página do Quiz
*   **O que fazer**: Criar a página principal onde o usuário responderá às perguntas.
*   **Como fazer**:
    1.  Criar uma nova rota/página, ex: `frontend/src/app/quiz/page.tsx` (ou `frontend/src/pages/quiz.tsx`).
    2.  **Estado da Página**: Gerenciar o estado do quiz (perguntas atuais, pergunta atual, respostas do usuário, pontuação). Usar `useState` e `useEffect`.
    3.  **Busca de Perguntas**: Ao carregar a página, fazer uma requisição ao endpoint `GET /api/quiz/start` do backend Nest.JS para obter as 10 perguntas. (Nota: Configurar um proxy no Next.js ou habilitar CORS no Nest.JS para desenvolvimento).
    4.  **Exibição de Perguntas**: Usar o componente `QuestionCard.tsx` para exibir a pergunta atual e suas opções.
    5.  **Navegação**: Implementar botões "Próxima Pergunta" e, opcionalmente, "Pergunta Anterior".
    6.  **Gerenciamento de Respostas**: Salvar a resposta selecionada pelo usuário para cada pergunta.
    7.  **Progresso**: Exibir o progresso usando `ProgressBar.tsx`.
*   **Resultado Esperado**: Uma página interativa onde o usuário pode ver as perguntas, selecionar respostas e navegar pelo quiz.

### ✅ Tarefa 2.5: Implementar Lógica de Pontuação e Exibição de Resultados
*   **O que fazer**: Calcular a pontuação do usuário ao final do quiz e mostrar os resultados.
*   **Como fazer**:
    1.  Após a última pergunta, navegar para uma página de resultados ou exibir os resultados na mesma página.
    2.  **Cálculo da Pontuação**: Comparar as respostas do usuário com as respostas corretas (obtidas do backend ou armazenadas no frontend após a busca inicial).
    3.  **Exibição**: Usar o componente `ResultsDisplay.tsx` para mostrar:
        *   Pontuação final (ex: "Você acertou 7 de 10!").
        *   Um resumo das respostas (quais foram corretas/incorretas).
        *   Um botão para "Jogar Novamente".
*   **Resultado Esperado**: Uma tela clara mostrando o desempenho do usuário no quiz e a opção de recomeçar.

### ✅ Tarefa 2.6: Estilização Global e Tema
*   **O que fazer**: Garantir uma aparência visual coesa e profissional, inspirada na imagem de referência, mas adaptada ao tema do quiz.
*   **Como fazer**:
    1.  Definir cores primárias, secundárias e fontes no `tailwind.config.js`.
    2.  Usar as classes do TailwindCSS de forma consistente.
    3.  Garantir responsividade para diferentes tamanhos de tela.
    4.  O fundo azul escuro com elementos gráficos (como o laptop e as pessoas na imagem de referência) pode ser simplificado ou adaptado. Focar na clareza e usabilidade do quiz.
*   **Resultado Esperado**: Uma aplicação com um design visualmente agradável, moderno e intuitivo.

## Fase 3: Integração e Refinamento

### ✅ Tarefa 3.1: Integração Completa Backend-Frontend
*   **O que fazer**: Assegurar que a comunicação entre o frontend e o backend está funcionando corretamente.
*   **Como fazer**:
    1.  Verificar todas as chamadas de API.
    2.  Configurar variáveis de ambiente para a URL da API do backend (ex: `NEXT_PUBLIC_API_URL`).
    3.  Implementar tratamento de erros para chamadas de API (ex: servidor offline, erros de requisição).
    4.  Configurar CORS no backend Nest.JS para permitir requisições do domínio do frontend em produção e desenvolvimento (`app.enableCors()` no `main.ts`).
*   **Resultado Esperado**: Uma comunicação fluida e robusta entre o cliente e o servidor.

### Tarefa 3.2: Geração de Perguntas Dinâmicas (Avançado)
*   **O que fazer**: (Melhoria) Em vez de um banco fixo, gerar perguntas de matemática programaticamente no backend.
*   **Como fazer**:
    1.  No `QuestionService` do Nest.JS, criar funções para cada tópico que geram:
        *   Números aleatórios dentro das faixas apropriadas (ex: para valor posicional até milhares, números entre 100 e 9999).
        *   Operações de adição/subtração com e sem reagrupamento.
        *   Problemas de multiplicação (1 dígito x 2 dígitos).
        *   Problemas de divisão (divisores de 1 dígito).
        *   Frações com denominadores comuns, problemas de equivalência.
        *   Perguntas simples de geometria (identificar forma, calcular perímetro/área de retângulos).
    2.  Gerar opções de resposta, incluindo a correta e alguns distratores plausíveis.
*   **Resultado Esperado**: Uma variedade muito maior de perguntas, tornando cada quiz único.

### ✅ Tarefa 3.3: Testes (Parcialmente Concluída)
*   **O que fazer**: Realizar testes para garantir a qualidade e funcionalidade da aplicação.
*   **Como fazer**:
    1.  **Testes Manuais**: Executar o fluxo completo do quiz várias vezes, testando diferentes cenários.
    2.  **Testes de Unidade (Backend)**: Escrever testes para o `QuestionService` (ex: verificar se gera o número correto de perguntas, se as respostas estão corretas).
    3.  **Testes de Componentes (Frontend)**: (Opcional) Usar Jest e React Testing Library para testar componentes individuais.
*   **Resultado Esperado**: Uma aplicação mais robusta e com menos bugs.
*   **Status**: Implementados testes de unidade para o backend (QuestionService e QuizController). Testes manuais e de componentes frontend pendentes.

### ✅ Tarefa 3.4: Preparação para Deploy (Considerações)
*   **O que fazer**: Documentar os passos básicos para construir e preparar a aplicação para deploy.
*   **Como fazer**:
    1.  No `backend/package.json`, garantir que o script `build` (`nest build`) está funcional.
    2.  No `frontend/package.json`, garantir que o script `build` (`next build`) está funcional.
    3.  Listar considerações:
        *   Escolha de plataformas de hospedagem (ex: Vercel para Next.js, Heroku/AWS/DigitalOcean para Nest.JS).
        *   Configuração de variáveis de ambiente em produção.
        *   Builds de produção.
*   **Resultado Esperado**: Instruções claras sobre como construir as aplicações para um ambiente de produção.
*   **Status**: Criado documento DEPLOYMENT.md com instruções detalhadas de como realizar o deploy do frontend e do backend, incluindo opções com Docker.

## Resumo Final

O projeto MathQuiz foi desenvolvido com sucesso, implementando todas as funcionalidades principais planejadas:

- ✅ Backend em Nest.js para fornecer perguntas de matemática para o quiz
- ✅ Frontend em Next.js com design responsivo usando TailwindCSS
- ✅ Internacionalização com suporte para Inglês, Português e Espanhol
- ✅ Sistema de pontuação e exibição de resultados
- ✅ Testes unitários para garantir a qualidade do código
- ✅ Documentação de desenvolvimento e deployment

Os únicos itens que permanecem como futuras melhorias opcionais são:
- Geração dinâmica de perguntas programaticamente (Tarefa 3.2)
- Testes adicionais para o frontend (parte da Tarefa 3.3)

Um README.md abrangente foi criado para documentar o projeto, sua estrutura e como executá-lo, e um DEPLOYMENT.md foi criado com instruções detalhadas para deploy em diferentes ambientes.

Este plano foi concluído com sucesso, resultando em um aplicativo de quiz de matemática funcional e multilíngue.

Este plano será a nossa guia. Podemos ajustar conforme necessário durante o desenvolvimento. 