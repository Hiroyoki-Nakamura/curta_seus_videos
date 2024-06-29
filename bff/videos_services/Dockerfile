# Usa a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e pnpm-lock.yaml para o diretório de trabalho
COPY package.json ./

# Instala pnpm globalmente
RUN npm install -g pnpm

# Configura o diretório do store do pnpm
RUN pnpm config set store-dir ~/.pnpm-store --global

# Instala as dependências do projeto
RUN pnpm install

# Copia todos os arquivos do diretório atual para o diretório de trabalho
COPY . .

# Instala o TypeScript localmente no projeto
RUN pnpm install typescript

# Compila o TypeScript usando o caminho correto para o executável
RUN ./node_modules/.bin/tsc

# Expõe a porta 3000
EXPOSE 3000

# Define o comando para iniciar a aplicação
CMD ["pnpm", "start"]
