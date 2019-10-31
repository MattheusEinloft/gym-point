# Backend - Tecnologias utilizadas
API REST desenvolvida em [Node.js](https://nodejs.org/), utilizando o framework [Express.js](https://expressjs.com/).

## Ferramentas
- Editor de código: [VSCode](https://code.visualstudio.com/)
- Cliente PostgreSQL: [Postbird](https://electronjs.org/apps/postbird)
- Cliente REST: [Insomnia](https://insomnia.rest/)
- Servidor SMTP para teste de e-mails: [Mailtrap](https://mailtrap.io/)
- Software de monitoramento de aplicações e rastreador de erros: [Sentry](https://sentry.io/)

## Bibliotecas/Módulos
- Reinicialização automática da aplicação com [Nodemon](https://nodemon.io/)
- Compilação para código JavaScript moderno com [Sucrase](https://sucrase.io/)
- Padronização e formatação de código com [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) e [EditorConfig](https://editorconfig.org/)
- Gerenciamento de um banco de dados [PostgreSQL](https://www.postgresql.org/) utilizando o [Sequelize](https://sequelize.org/)
- Autenticação de usuário com [JWT](https://jwt.io/) e [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- Tratamento de datas e horários com [date-fns](https://date-fns.org/)
- Validação de object schema com [Yup](https://github.com/jquense/yup)
- Envio de e-mails com [Nodemailer](https://nodemailer.com/)
- Gerenciamento de filas de jobs com [Redis](https://redis.io/) e [Bee Queue](https://bee-queue.com/)
- Reporting de erros em ambiente de desenvolvimento com [Youch](https://github.com/poppinss/youch)
- Monitoramento de erros em ambiente de produção com [Sentry](https://sentry.io/)
- Gerenciamento de variáveis ambiente com [dotenv](https://www.npmjs.com/package/dotenv)

## Rotas implementadas
- CRUD de _Alunos_
- Criação de _Sessões_
- CRUD de _Planos_
- CRUD de _Matrículas_
- Listagem e criação de _Check-ins_
- Listagem e criação de _Pedidos de Auxílios_ por parte do Aluno
- Listagem de _Pedidos de Auxílios_ não respondidos e criação de uma resposta aos mesmos
