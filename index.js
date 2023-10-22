const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Додайте цей рядок

const authRouter = require('./authRouter');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use('/auth', authRouter);
const start = async () => {
    try {
        mongoose.connect('mongodb+srv://qwerty:qwerty-1@cluster9.urrg9v6.mongodb.net/kandidat_panel?retryWrites=true&w=majority');
        app.listen(PORT, () => console.log(`SERVER START PORT ${PORT}`));
    } catch (error) {
        console.error('Помилка при запуску сервера:', error);
    }
}

start();
