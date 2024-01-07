import { body } from 'express-validator';


export const registerValidation = [
  body('username', 'Логин должен быть минимуь 5 символов').isLength({ min: 5 }),
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];