## 🧙DropMail Natan Borges🧙(#contexto-geral)

• Descrição do projeto: Este projeto tem como objetivo desenvolver uma aplicação que permitirá aos usuários utilizar endereços de e-mail temporários para proteger sua privacidade e evitar spam ao interagir
com sites e serviços online. Em vez de fornecer seus e-mails reais, os usuários poderão gerar e utilizar endereços de e-mail descartáveis por meio de uma API especializada. Essa solução proporciona uma camada
adicional de segurança e privacidade, permitindo que os usuários desfrutem de serviços online com tranquilidade.

• Stack de tecnologias:
Front-end: React com Next, Chakra-ui, TypeScript, Axios, Docker e Nookies

• Decisões de Design: Optei por utilizar o framework [**ChakraUI**](https://chakra-ui.com/) devido à minha experiência prévia com ele e sua capacidade de ser altamente responsivo. O projeto foi desenvolvido utilizando o Next.js, e para consumir a [**DropMail API**](https://dropmail.me/api/), optei pelo uso do Axios, configurando sua URL base para o endereço no qual o contêiner Docker do [**drop-mail-proxy**](https://github.com/natanborges5/drop-mail-nb/tree/master/drop-mail-proxy) está em execução. Essa configuração resolveu o problema de CORS (Cross-Origin Resource Sharing) ao acessar a API.
  
  O projeto foi hospedado na [**Vercel**](https://drop-mail-nb.vercel.app/), com o frontend disponível online. No entanto, a API não está funcional na Vercel, pois o proxy está configurado apenas para rodar localmente. Embora eu tenha publicado o proxy no Heroku, não foi viável devido às limitações de não possuir plano gratuito.
  
  Para desenvolver a aplicação, adotei os princípios de **Component-Based Architecture** e utilizei o **Context API** para gerenciar o estado da sessão do usuário. No contexto do **AuthContext**, foram definidas todas as funções relacionadas ao usuário, incluindo operações como GetSession, GetNewSession e RefreshInbox. Além disso, os dados do usuário são armazenados neste contexto. Optei por utilizar a biblioteca [**Nookies**](https://www.npmjs.com/package/nookies/) para armazenar o ID da sessão do usuário nos cookies.

  A aplicação foi desenvolvida com um design responsivo que se adapta ao tamanho da tela. Um layout especial foi criado para exibir os e-mails em dispositivos móveis, e ao clicar em um e-mail, um "drawer" ocupa a tela, exibindo o conteúdo do e-mail de forma mais detalhada.
  
<!-- Layout Normal -->
<h3 align="center">Layout Normal</h3>
<p align="center">
  <img width="663"  alt="image" src="https://github.com/natanborges5/Images/blob/91b7fa3caab62c107874be057c083f190990fdbc/dropMailHome.png">
</p>

<!-- Layout Mobile -->
<h3 align="center">Layout Mobile</h3>
<p align="center">
  <img width="663" height="963" alt="imageMobile" src="https://github.com/natanborges5/Images/blob/91b7fa3caab62c107874be057c083f190990fdbc/homeMobile.png">
</p>

<!-- Layout Mobile Mail -->
<h3 align="center">Layout Mobile Mail</h3>
<p align="center">
  <img width="663" height="963" alt="imageMailMobile" src="https://github.com/natanborges5/Images/blob/91b7fa3caab62c107874be057c083f190990fdbc/mailMobile.png">
</p>
  
• *This is a challenge by Coodesh*
## 🎲 [Rodando a aplicação](#rodando-o-app)

### Rodando localmente

```bash
# Primeiramente é necessário clonar a aplicação no github:
$ git clone https://github.com/natanborges5/drop-mail-nb.git

# Rodar o docker compose na pasta raiz (Docker tem que estar aberto)
$ docker-compose up --build
# Acessar http://localhost:3000/
```
