## 🧙DropMail Natan Borges🧙

• Descrição do projeto: Este projeto tem como objetivo desenvolver uma aplicação que permitirá aos usuários utilizar endereços de e-mail temporários para proteger sua privacidade e evitar spam ao interagir
com sites e serviços online. Em vez de fornecer seus e-mails reais, os usuários poderão gerar e utilizar endereços de e-mail descartáveis por meio de uma API especializada. Essa solução proporciona uma camada
adicional de segurança e privacidade, permitindo que os usuários desfrutem de serviços online com tranquilidade.

• Stack de tecnologias:
Front-end: React com Next, Chakra-ui, TypeScript, Axios, Docker e Nookies

## 🎲 [Rodando a aplicação](#rodando-o-app)

### Rodando localmente

```bash
# Primeiramente é necessário clonar a aplicação no github:
$ git clone https://github.com/natanborges5/drop-mail-nb.git

# Acessar a pasta do proxy
$ cd .\drop-mail-proxy\

# Criar a imagem docker
$ docker build -t drop-mail-proxy .

# Iniciar o Container Docker(Docker precisa estar aberto)
$ docker run -p 8080:8080 drop-mail-proxy

# Voltar a pasta inicial e depois acessar a pasta da aplicação Front-End
$ cd ../
$ cd .\drop-mail-nb\

# Instalar todas as dependências da aplicação
$ npm i


# Rode a aplicação com os seguintes comandos
$ npm run build
$ npm run start

# Pode ser rodado para dev com o comando
$ npm run dev
```
