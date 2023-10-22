const Candidate = require('./modules/Candidate');
const nodemailer = require('nodemailer');
const { smtp_host, smtp_port, smtp_user, smtp_password } = require('./config');

class authController {
    async createCandidate(req, res) {
        try {
            const { firstName, lastName, email, phoneNumber } = req.body;

            if (!firstName || !lastName || !phoneNumber) {
                return res.status(400).json({ message: 'Всі обов’язкові поля повинні бути заповнені' });
            }

            const candidate = new Candidate({ firstname: firstName, lastname: lastName, email, phoneNumber });
            await candidate.save();

            const transporter = nodemailer.createTransport({
                host: smtp_host,
                port: smtp_port,
                service: 'gmail',
                secure: false,
                auth: {
                    user: smtp_user,
                    pass: smtp_password,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            const mailOptions = {
                to: email,
                from: smtp_user,
                subject: 'Ваша заявка прийнята',
                text: 'Дякуємо за вашу заявку. Ваша кандидатура успішно зареєстрована.',
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'Ваша заявка прийнята' });
        } catch (error) {
            console.error('Помилка при обробці запиту:', error);

            res.status(500).json({ message: 'Помилка при обробці запиту', error: error.message });
        }
    }
}

module.exports = new authController();
