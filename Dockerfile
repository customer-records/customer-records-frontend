# Используем официальный образ Node.js 18
FROM node:20 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Используем легковесный образ Nginx для раздачи статики
FROM nginx:alpine

# Копируем собранные файлы в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]