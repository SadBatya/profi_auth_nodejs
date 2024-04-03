const { Router } = require('express'); // Импорт объекта Router
const router = Router(); // Создание роутера
const controller = require('./authController'); // Импорт контроллера
const { check } = require('express-validator'); // Импорт валидатора
const authMiddleware = require('./middleware/authMiddleware'); // Импорт middleware
const roleMiddleware = require('./middleware/roleMiddleware');
// Регистрация маршрутов
router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check(
      'password',
      'Пароль не должен быть больше 4 и меньше 10 символов'
    ).isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(["USER", "ADMIN"]), controller.getUser);

module.exports = router; // Экспорт роутера
