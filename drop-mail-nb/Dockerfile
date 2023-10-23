# Use a imagem oficial do Node.js
FROM node:16

# Crie um diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos do seu projeto Next.js para o diretório de trabalho
COPY . /app

# Instale as dependências
RUN npm install

# Exponha a porta em que o seu aplicativo Next.js será executado (geralmente a porta 3000)
EXPOSE 3000

# Inicie o servidor Next.js
CMD ["npm", "run", "dev"]
