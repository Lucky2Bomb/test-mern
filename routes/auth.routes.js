const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = Router();

router.post(
    "/register",
    [
        check("email", "email введён некоректно.")
            .isEmail(),

        check("password", "Длинна пароля должна быть больше 6 символов")
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Данные регистрации введены некорректно"
                })
            }

            const { email, password } = req.body;
            // const { email, password, confirmPassword } = req.body;
            // if (confirmPassword !== password) {
            //     return res.status(400).json({ message: "Пароли не совпадают" });
            // }

            const ghost = await User.findOne({ email });

            if (ghost) {
                return res.status(400).json({ message: "Почтовый адрес уже используется" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: "Пользователь успешно создан." });

        } catch (error) {
            //server error
            res.status(500).json({ message: "Кажется на сервере что то пошло не так..." });
        }
    });

router.post(
    "/login",
    [
        check("email", "Введите корректный email")
            .normalizeEmail().isEmail(),
        check("password", "Введите пароль").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Данные для входа введены неверно"
                })
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(500).json({ message: "Пользователь не найден." });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Неверный пароль." });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get("JWTSecretKey"),
                { expiresIn: "1h" }
            );

            res.json({ token, userId: user.id });

        } catch (error) {
            //server error
            res.status(500).json({ message: "Кажется на сервере что то пошло не так..." });
        }
    });

module.exports = router;