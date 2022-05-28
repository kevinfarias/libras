# TalkByHand
  
## Introdução
  
O projeto foi criado durante a disciplina de Libras lecionada durante o primeiro semestre do ano de 2022 na faculdade IMED.  
Reunindo os conhecimentos obtidos dos alunos Kevin Farias e Leonardo Leonhardt sobre desenvolvimento mobile, python e redes neurais/machine learning e sentindo-se desafiados, foi desenvolvido um projeto conceito para verificar se desenvolver um aplicativo que traduza libras em tempo real via machine learning era de fato possível com as tecnologias atuais.

O resultado gerou um app que é pouco preciso e demanda diversas evoluções em sua rede neural, mas que já consegue identificar algumas letras do alfabeto em Libras como "C" ou "O".
  
Apesar de possuir um caminho grande para ser trilhado, fica a sensaçao de que, se mais voluntários se interessarem e auxiliarem no desenvolvimento, é possível lapidar o produto de forma que o mesmo fique utilizável para situações do dia-a-dia.

## Tecnologias utilizadas  
  
-> Backend: Python, WebSockets e Tensorflow  
-> Frontend: React Native com Expo  
-> Deploy: Docker e AWS  

## Como rodar?
-> Backend: com docker e docker-compose instalados, navegar até a pasta e rodar o seguinte comando: `docker-compose up --build`. Um websocket irá iniciar na porta 9999.  
-> Frontend: com node 14+ instalado na máquina, o primeiro passo é modificar o arquivo `./mobile/.env` para apontar para um servidor que esteja rodando o backend (um servidor de demonstração foi utilizado - dependendo de qual o momento que o software seja testado, o servidor pode não estar mais no ar). Após, rodar o comando `npm install` seguido de:  
1.  `npm run ios`: rodar no IOS
2.  `npm run android`: rodar no Android
  
## Créditos
Este projeto não seria possível devido as restrições de tempo, se não existisse o belo trabalho realizado por Lucas Lacerda. Nosso trabalho em relação ao backend foi refatorar, desacoplar o código e torná-lo possível de responder através de um WebSocket. Link do trabalho original: [Deep Learning & Visão Computacional — REDES NEURAIS CONVOLUCIONAIS](https://link.medium.com/Jjnt43P0K3)
