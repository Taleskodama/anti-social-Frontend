# Anti-Social - Rede Social MVP

Este projeto é um Mínimo Produto Viável (MVP) de uma Rede Social, desenvolvido como parte da avaliação da disciplina de Engenharia de Software na UNIFEI. O objetivo é criar uma plataforma interativa que permita a conexão e interação entre usuários.

## 🚀 Funcionalidades

O projeto conta com as seguintes funcionalidades principais:

- **Autenticação:** Login, Cadastro (Signup) e Recuperação de Senha.
- **Feed de Notícias:** Visualização de postagens dos usuários.
- **Perfil:** Página de perfil do usuário com informações e histórico.
- **Interação:**
  - **Atividade:** Visualização de atividades recentes.
  - **Mensagens:** Sistema de troca de mensagens.
  - **Trending:** Tópicos em alta.
  - **Salvos:** Possibilidade de salvar conteúdos.
- **Busca:** Pesquisa de usuários ou conteúdos.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e robusta:

### Frontend

- **[React](https://react.dev/):** Biblioteca para construção de interfaces de usuário.
- **[Vite](https://vitejs.dev/):** Build tool rápida para desenvolvimento web moderno.
- **[TypeScript](https://www.typescriptlang.org/):** Superset JavaScript com tipagem estática.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS utility-first para estilização rápida.
- **[Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/):** Componentes de UI acessíveis e customizáveis.
- **[TanStack Query (React Query)](https://tanstack.com/query/latest):** Gerenciamento de estado assíncrono e data fetching.
- **[React Hook Form](https://react-hook-form.com/):** Gerenciamento de formulários.
- **[Wouter](https://github.com/molefrog/wouter):** Roteamento leve e minimalista para React.
- **[Zod](https://zod.dev/):** Validação de esquemas TypeScript-first.
- **[Framer Motion](https://www.framer.com/motion/):** Biblioteca de animações para React.
- **[Lucide React](https://lucide.dev/):** Biblioteca de ícones consistente e leve.

### Backend & Dados (Integrado)

- **[Express](https://expressjs.com/):** Framework web para Node.js.
- **[Passport.js](https://www.passportjs.org/):** Middleware de autenticação para Node.js.
- **[WebSocket (ws)](https://github.com/websockets/ws):** Comunicação em tempo real (para mensagens).
- **[Drizzle ORM](https://orm.drizzle.team/):** ORM TypeScript leve e performático.
- **[Neon Database](https://neon.tech/):** Banco de dados Postgres serverless.

## 📂 Estrutura do Projeto

```
anti-social-Frontend/
├── src/
│   ├── assets/          # Recursos estáticos (imagens, etc)
│   ├── components/      # Componentes Reutilizáveis
│   │   ├── ui/          # Componentes de UI base (botões, inputs, etc)
│   │   └── ...          # Componentes específicos (PostCard, UserAvatar, etc)
│   ├── hooks/           # Custom Hooks (use-toast, use-mobile)
│   ├── lib/             # Utilitários e configurações (queryClient, utils)
│   ├── pages/           # Páginas da aplicação (Feed, Login, Profile, etc)
│   ├── services/        # Integração com API
│   ├── App.tsx          # Componente principal e rotas
│   └── main.tsx         # Ponto de entrada da aplicação
├── shared/              # Código compartilhado (schemas de validação/banco)
├── public/              # Arquivos públicos
└── ...arquivos de configuração
```

## 🏁 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- Gerenciador de pacotes (npm, pnpm ou yarn)

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone <url-do-repositorio>
    cd anti-social-Frontend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    pnpm install
    ```

3.  **Configure as variáveis de ambiente:**
    Verifique se é necessário configurar um arquivo `.env` com as credenciais do banco de dados ou outras configurações específicas.

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O projeto estará rodando localmente, geralmente em `http://localhost:5000` ou `http://localhost:5173`.

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção (Frontend e Backend).
- `npm run start`: Inicia o servidor de produção.
- `npm run check`: Executa a verificação de tipos do TypeScript.
- `npm run db:push`: Envia alterações do schema para o banco de dados (Drizzle).

## 📝 Sobre

Este projeto foi desenvolvido para a disciplina de Engenharia de Software da UNIFEI. O tema proposto foi o desenvolvimento de uma Rede Social, focando na documentação e implementação de um MVP.

---
