# RelaxMap API

## Українська версія

## Про проєкт

**RelaxMap** — вебзастосунок для пошуку та обміну місцями відпочинку. Користувачі можуть переглядати каталог локацій, застосовувати фільтри й пошук, відкривати детальну інформацію про місце, створювати власні локації та залишати відгуки.

Цей репозиторій містить серверну частину RelaxMap. Backend надає REST API для роботи з користувачами, авторизацією, локаціями, категоріями та відгуками, а також забезпечує валідацію даних, завантаження зображень і взаємодію з MongoDB.

## Основні можливості

- Реєстрація, вхід і вихід користувачів
- Авторизація та захист приватних маршрутів
- Робота з профілем користувача
- Отримання списку локацій із пагінацією
- Фільтрація локацій за регіоном і типом
- Пошук локацій за назвою
- Отримання детальної інформації про локацію за ID
- Створення та редагування локацій
- Завантаження зображень для локацій
- Робота з категоріями
- Створення та отримання відгуків
- Документація API за допомогою Swagger
- CORS-підтримка для взаємодії з frontend-застосунком

## Технології

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Joi / Celebrate
- Multer
- Cloudinary
- Swagger
- CORS
- dotenv

## Архітектура проєкту

```text
src/
├── constants/       # Константи застосунку
├── controllers/     # Обробники HTTP-запитів
├── db/              # Підключення до MongoDB
├── middleware/      # Middleware: auth, помилки, завантаження файлів тощо
├── models/          # Mongoose-моделі
├── routes/          # API-маршрути
├── services/        # Бізнес-логіка та робота із зовнішніми сервісами
├── utils/           # Допоміжні функції
├── validations/     # Схеми валідації запитів
└── server.js        # Точка входу застосунку
```

## Встановлення

1. Клонуйте репозиторій:

```bash terminal
git clone [https://github.com/LazySabi/goit-relaxMap-group5_back.git](https://github.com/LazySabi/goit-relaxMap-group5_back.git)
```

2. Перейдіть до папки проєкту:

```bash terminal
cd goit-relaxMap-group5_back
```

3. Встановіть залежності:

```bash terminal
npm install
```

4. Створіть файл `.env` на основі `.env.example`.

5. Запустіть сервер у режимі розробки:

```bash terminal
npm run dev
```

Для production-запуску:

```bash terminal
npm start
```

## Змінні середовища

Створіть файл `.env` у корені проєкту та додайте необхідні змінні.

```env .env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/relaxmap?retryWrites=true&w=majority
JWT_SECRET=<your_jwt_secret>

CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>

FRONTEND_DOMAIN=http://localhost:3000
```

> Не додавайте `.env` до Git. Використовуйте `.env.example` для зразка конфігурації без секретних даних.

## API

Базовий URL локального API:

```text
http://localhost:3000/api
```

Основні групи маршрутів:

| Група | Базовий шлях | Призначення |
|---|---|---|
| Auth | `/api/auth` | Реєстрація, вхід, вихід, оновлення токенів |
| Users | `/api/users` | Профілі користувачів |
| Locations | `/api/locations` | Локації для відпочинку |
| Categories | `/api/categories` | Типи та категорії локацій |
| Feedbacks | `/api/feedbacks` | Відгуки про локації |

## Авторизація

Для доступу до приватних endpoint'ів передавайте JWT у заголовку:

```text
Authorization: Bearer <token>
```

### Реєстрація

```text
POST /api/auth/register
```

Приклад body:

```json
{
  "name": "Olena",
  "email": "olena@example.com",
  "password": "securePassword123"
}
```

### Вхід

```text
POST /api/auth/login
```

Приклад body:

```json
{
  "email": "olena@example.com",
  "password": "securePassword123"
}
```

### Вихід

```text
POST /api/auth/logout
```

## Користувачі

```text
GET /api/users/:userId
```

Повертає публічну інформацію профілю користувача та його локації.

```text
PATCH /api/users/me
```

Оновлює інформацію авторизованого користувача.

```text
PATCH /api/users/me/avatar
```

Оновлює аватар авторизованого користувача.

## Локації

### Отримати список локацій

```text
GET /api/locations
```

Endpoint підтримує пагінацію, фільтрацію та пошук.

| Query-параметр | Приклад | Опис |
|---|---|---|
| `page` | `?page=1` | Номер сторінки |
| `limit` | `?limit=10` | Кількість елементів на сторінці |
| `region` | `?region=id1` | Фільтр за регіоном |
| `type` | `?type=id1` | Фільтр за типом локації |
| `search` | `?search=затока` | Пошук за назвою |

Приклад:

```bash terminal
curl "http://localhost:3000/api/locations?page=1&limit=10&region=id1&type=id1&search=затока"
```

### Отримати локацію за ID

```text
GET /api/locations/:locationId
```

Приклад:

```bash terminal
curl http://localhost:3000/api/locations/68d568270e6bcc357e9833e9
```

### Створити локацію

```text
POST /api/locations
```

Приватний endpoint. Запит передається у форматі `multipart/form-data`.

Поля:

| Поле | Тип | Правила |
|---|---|---|
| `name` | string | Обов'язкове, від 3 до 96 символів |
| `type` | string | Обов'язкове, до 64 символів |
| `region` | string | Обов'язкове, до 64 символів |
| `description` | string | Обов'язкове, від 20 до 6000 символів |
| `images` | file | Обов'язкове, JPG або PNG, до 1 MB |

### Редагувати локацію

```text
PATCH /api/locations/:locationId
```

Приватний endpoint для автора локації.

## Категорії

```text
GET /api/categories
```

Повертає доступні категорії та типи локацій, що використовуються у фільтрах і формах.

## Відгуки

### Отримати відгуки

```text
GET /api/feedbacks
```

Повертає список відгуків. Endpoint може використовувати параметр `locationId` для отримання відгуків конкретної локації.

```text
GET /api/feedbacks?locationId=:locationId
```

### Створити відгук

```text
POST /api/feedbacks
```

Приватний endpoint. Для створення відгуку користувач повинен бути авторизований.

Приклад body:

```json
{
  "locationId": "68d568270e6bcc357e9833e9",
  "userName": "Olena",
  "rate": 5,
  "description": "Чудове місце для відпочинку."
}
```

## Правила валідації

### Реєстрація

| Поле | Правила |
|---|---|
| `name` | Рядок, обов'язкове, 2–32 символи |
| `email` | Валідний email, обов'язкове, максимум 64 символи, унікальне |
| `password` | Рядок, обов'язкове, 8–128 символів |

### Локація

| Поле | Правила |
|---|---|
| `name` | Рядок, обов'язкове, 3–96 символів |
| `type` | Рядок, обов'язкове, максимум 64 символи |
| `region` | Рядок, обов'язкове, максимум 64 символи |
| `description` | Рядок, обов'язкове, 20–6000 символів |
| `images` | Обов'язковий файл JPG/PNG до 1 MB |

### Відгук

| Поле | Правила |
|---|---|
| `locationId` | Валідний ID локації, обов'язкове |
| `userName` | Рядок, обов'язкове, 2–32 символи |
| `rate` | Число, обов'язкове, від 1 до 5 |
| `description` | Рядок, обов'язкове, 1–200 символів |

## Swagger

Інтерактивна документація API доступна через Swagger після запуску сервера.

```text
GET /api-docs
```

Swagger містить опис endpoint'ів, параметрів, прикладів request body та відповідей API.

## Обробка помилок

API використовує стандартні HTTP-статуси:

| Код | Значення |
|---|---|
| `200` | Успішний запит |
| `201` | Ресурс успішно створено |
| `400` | Помилка валідації або некоректний запит |
| `401` | Необхідна авторизація |
| `403` | Недостатньо прав для виконання дії |
| `404` | Ресурс або маршрут не знайдено |
| `409` | Конфлікт даних, наприклад email вже існує |
| `500` | Внутрішня помилка сервера |

---

## English version

## About the project

**RelaxMap** is a web application for discovering and sharing recreational places. Users can browse a location catalogue, use filters and search, view detailed information about a place, create their own locations, and leave feedback.

This repository contains the backend part of RelaxMap. The backend provides a REST API for users, authentication, locations, categories, and feedback, as well as request validation, image uploads, and MongoDB integration.

## Key features

- User registration, login, and logout
- Authorization and protected routes
- User profile management
- Location list with pagination
- Filtering locations by region and type
- Searching locations by name
- Retrieving detailed location information by ID
- Creating and editing locations
- Uploading images for locations
- Categories management
- Creating and retrieving feedback
- Swagger API documentation
- CORS support for frontend integration

## Tech stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Joi / Celebrate
- Multer
- Cloudinary
- Swagger
- CORS
- dotenv

## Project structure

```text
src/
├── constants/       # Application constants
├── controllers/     # HTTP request handlers
├── db/              # MongoDB connection
├── middleware/      # Auth, error handling, uploads, and other middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic and external services
├── utils/           # Utility functions
├── validations/     # Request validation schemas
└── server.js        # Application entry point
```

## Installation

1. Clone the repository:

```bash terminal
git clone [https://github.com/LazySabi/goit-relaxMap-group5_back.git](https://github.com/LazySabi/goit-relaxMap-group5_back.git)
```

2. Open the project directory:

```bash terminal
cd goit-relaxMap-group5_back
```

3. Install dependencies:

```bash terminal
npm install
```

4. Create an `.env` file based on `.env.example`.

5. Start the server in development mode:

```bash terminal
npm run dev
```

For a production start:

```bash terminal
npm start
```

## Environment variables

Create an `.env` file in the project root and add the required variables.

```env .env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/relaxmap?retryWrites=true&w=majority
JWT_SECRET=<your_jwt_secret>

CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>

FRONTEND_DOMAIN=http://localhost:3000
```

> Do not commit `.env` to Git. Use `.env.example` as a configuration template without sensitive credentials.

## API

Local API base URL:

```text
http://localhost:3000/api
```

Main route groups:

| Group | Base path | Purpose |
|---|---|---|
| Auth | `/api/auth` | Registration, login, logout, and token refresh |
| Users | `/api/users` | User profiles |
| Locations | `/api/locations` | Recreational locations |
| Categories | `/api/categories` | Location categories and types |
| Feedbacks | `/api/feedbacks` | Location feedback |

## Authentication

For private endpoints, send a JWT in the request header:

```text
Authorization: Bearer <token>
```

### Registration

```text
POST /api/auth/register
```

Example body:

```json
{
  "name": "Olena",
  "email": "olena@example.com",
  "password": "securePassword123"
}
```

### Login

```text
POST /api/auth/login
```

Example body:

```json
{
  "email": "olena@example.com",
  "password": "securePassword123"
}
```

### Logout

```text
POST /api/auth/logout
```

## Users

```text
GET /api/users/:userId
```

Returns public user profile information and the user's locations.

```text
PATCH /api/users/me
```

Updates the authenticated user's profile.

```text
PATCH /api/users/me/avatar
```

Updates the authenticated user's avatar.

## Locations

### Get locations

```text
GET /api/locations
```

The endpoint supports pagination, filtering, and search.

| Query parameter | Example | Description |
|---|---|---|
| `page` | `?page=1` | Page number |
| `limit` | `?limit=10` | Number of items per page |
| `region` | `?region=id1` | Filter by region |
| `type` | `?type=id1` | Filter by location type |
| `search` | `?search=zatoka` | Search by location name |

Example:

```bash terminal
curl "http://localhost:3000/api/locations?page=1&limit=10&region=id1&type=id1&search=zatoka"
```

### Get a location by ID

```text
GET /api/locations/:locationId
```

Example:

```bash terminal
curl http://localhost:3000/api/locations/68d568270e6bcc357e9833e9
```

### Create a location

```text
POST /api/locations
```

This is a private endpoint. The request must use `multipart/form-data`.

Fields:

| Field | Type | Rules |
|---|---|---|
| `name` | string | Required, 3–96 characters |
| `type` | string | Required, up to 64 characters |
| `region` | string | Required, up to 64 characters |
| `description` | string | Required, 20–6000 characters |
| `images` | file | Required, JPG or PNG, up to 1 MB |

### Update a location

```text
PATCH /api/locations/:locationId
```

Private endpoint available to the location author.

## Categories

```text
GET /api/categories
```

Returns available categories and location types used in filters and forms.

## Feedbacks

### Get feedback

```text
GET /api/feedbacks
```

Returns feedback entries. The `locationId` parameter can be used to get feedback for a specific location.

```text
GET /api/feedbacks?locationId=:locationId
```

### Create feedback

```text
POST /api/feedbacks
```

This is a private endpoint. Users must be authenticated to create feedback.

Example body:

```json
{
  "locationId": "68d568270e6bcc357e9833e9",
  "userName": "Olena",
  "rate": 5,
  "description": "A wonderful place to relax."
}
```

## Validation rules

### Registration

| Field | Rules |
|---|---|
| `name` | String, required, 2–32 characters |
| `email` | Valid email, required, maximum 64 characters, unique |
| `password` | String, required, 8–128 characters |

### Location

| Field | Rules |
|---|---|
| `name` | String, required, 3–96 characters |
| `type` | String, required, maximum 64 characters |
| `region` | String, required, maximum 64 characters |
| `description` | String, required, 20–6000 characters |
| `images` | Required JPG/PNG file up to 1 MB |

### Feedback

| Field | Rules |
|---|---|
| `locationId` | Valid location ID, required |
| `userName` | String, required, 2–32 characters |
| `rate` | Number, required, from 1 to 5 |
| `description` | String, required, 1–200 characters |

## Swagger

Interactive API documentation is available through Swagger after the server starts.

```text
GET /api-docs
```

Swagger contains endpoint descriptions, parameters, request-body examples, and API responses.

## Error handling

The API uses standard HTTP status codes:

| Code | Meaning |
|---|---|
| `200` | Successful request |
| `201` | Resource created successfully |
| `400` | Validation error or invalid request |
| `401` | Authentication is required |
| `403` | Insufficient permissions |
| `404` | Resource or route was not found |
| `409` | Data conflict, for example an email already exists |
| `500` | Internal server error |