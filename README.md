## 🚀 Installation
📂 Clone the repository

```bash
git clone https://github.com/achmadya-dev/backend-app-ts.git
```

📦 Install all dependencies

```bash
npm install
```

📋 Copy .env.example to .env

```bash
cp .env.example .env
```

🐳 Run Docker for the database

```bash
docker compose up -d
```

🔧 Run Prisma migration

```bash
npm run migration:generate
```

💻 Run the application

```bash
npm run dev
```

🌐 Access Swagger APIs
```bash
http://localhost:8000/api-docs
```