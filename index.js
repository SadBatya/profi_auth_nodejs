// index.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const cors = require('cors');
require('dotenv').config(); // Подключаем пакет dotenv для загрузки переменных среды из файла .env

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

const PORT = process.env.PORT || 4000; // Используем PORT из переменных среды или устанавливаем значение по умолчанию
const MONGOCONNECT = process.env.MONGOCONNECT; // Используем MONGOCONNECT из переменных среды

const start = async () => {
  try {
    if (!MONGOCONNECT) {
      throw new Error('Переменная окружения MONGOCONNECT не указана в файле .env');
    }

    await mongoose.connect(MONGOCONNECT);
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error.message);
    process.exit(1); // Завершение процесса с ненулевым кодом
  }
};

start();
