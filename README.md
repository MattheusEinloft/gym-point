# Gympoint
O Gympoint é uma aplicação gerenciadora de academias, onde os alunos podem ser cadastrados, matriculados em planos da academia, fazer pedidos de auxílios (dicas de alimentação e treinos) e realizar check-in quando chegam à academia. Os administradores da aplicação podem, além de visualizar e controlar os dados dos alunos, gerenciar os planos, as matrículas e responder os pedidos de auxílios.

A aplicação é divida em 3 camadas: Back-End, Front-End e Mobile. A ideia ao utilizar essas camadas é justamente para separar melhor as responsabilidades de cada uma, onde o Back-End servirá os dados para as outras duas camadas os consumirem, e apresentarem da melhor forma ao usuário final.

## Back-End
O Back-End é a camada da aplicação responsável por todas as regras de negócio, modelagens dos dados e configurações gerais da aplicação. É uma API REST desenvolvida em Node.js, cuja responsabilidade principal é garantir que os dados cheguem de maneira correta às outras camadas.
