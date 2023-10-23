## 🧙DropMail Natan Borges🧙

• Descrição do projeto: Este projeto tem como objetivo desenvolver uma aplicação que permitirá aos usuários utilizar endereços de e-mail temporários para proteger sua privacidade e evitar spam ao interagir
com sites e serviços online. Em vez de fornecer seus e-mails reais, os usuários poderão gerar e utilizar endereços de e-mail descartáveis por meio de uma API especializada. Essa solução proporciona uma camada
adicional de segurança e privacidade, permitindo que os usuários desfrutem de serviços online com tranquilidade.

• Stack de tecnologias:
Front-end: React com Next, Chakra-ui, TypeScript, Axios, Docker e Nookies

• Decisões de Design  
  Decidi trabalhar com o framework [**ChakraUI**](https://chakra-ui.com/) por já ter experiencia com ele e ser bem responsivo.
  O projeto foi criado usando o Next, para consumir a [**DropMail API**](https://dropmail.me/api/) decidi usar o Axios que tem como URL base o endereço onde está rodando o container docker do 
  [**drop-mail-proxy**](https://github.com/natanborges5/drop-mail-nb/tree/master/drop-mail-proxy), isso foi criado para resolver o problema de CORS ao acessar a API. O projeto foi publicado na [**vercel app**](https://drop-mail-nb.vercel.app/):,
  o Front-end está online porém a API não está funcional na vercel, pois o proxy só roda localmente(Publiquei o proxy no Heroku, mas não existe mais plano gratis, então desabilitei o serviço).

  Para desenvolver a aplicação usei os conceitos de arquitetura de **Component-Based Architecture** e **Context API**, utilizei o Context como AuthContext para gerenciar a sessão do usario, nesse contexto é onde existe todas as funções que lidam com
  o usuario(GetSession, GetNewSession e RefreshInbox) é onde também é salvo os dados do usuario, aqui eu decidi usar a lib [**Nookies**](https://www.npmjs.com/package/nookies/) para salvar nos cookies o id da session do user.
  
  <img width="663" alt="image" src="https://github.com/natanborges5/Images/blob/91b7fa3caab62c107874be057c083f190990fdbc/dropMailHome.png">
  <img width="663" alt="image" src="https://github.com/natanborges5/Images/blob/91b7fa3caab62c107874be057c083f190990fdbc/homeMobile.png">
  <img width="663" alt="image" src="https://github.com/natanborges5/Images/blob/91b7fa3caab62c107874be057c083f190990fdbc/mailMobile.png">
  
  Escolhemos uma API de e-mail temporário confiável e bem mantida como nossa fonte de endereços de e-mail temporários.
  Desenvolvemos uma interface de usuário simples e intuitiva para permitir aos usuários gerar e gerenciar facilmente esses endereços.
  Implementamos medidas de segurança rigorosas para proteger os dados do usuário.
  
• *This is a challenge by Coodesh*
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
