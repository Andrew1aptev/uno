const express = require('express');
const app = express();
const port = 3000;

// Раздаем статику из папки client
app.use(express.static('../client'));

// Тестовый роут
app.get('/api/test', (req, res) => {
  res.json({ message: 'Сервер работает!' });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});