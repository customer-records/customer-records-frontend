# Используем официальный образ Node.js 20
FROM node:20 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем исходный код (включая .env с VITE_API_URL)
COPY . .

# Принимаем аргумент из docker-compose и экспортируем его в ENV для Vite
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Собираем приложение (Vite подхватит VITE_API_URL из окружения)
RUN npm run build

# Используем легковесный образ Nginx для раздачи статики
FROM nginx:alpine

# Копируем собранные файлы в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Подключаем ваш nginx-конфиг
COPY nginx.test.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
