# 📡 Intelligent Content Platform – Frontend

This is the **frontend** for the SaaS-based AI-powered content recommendation system. It is built using **Next.js 13 with the App Router**, **TypeScript**, **TailwindCSS**, and supports user authentication, content tracking, and personalized recommendations.

---

## 🚀 Features

- 📂 Add, edit, and delete content (text, images, links)
- 🧠 View AI-powered recommendations
- 📊 Dashboard for content analytics
- 👁️ Track user interactions (views, likes, unlikes)
- 👥 Role-aware UI with user session display
- 🐳 Docker-ready for production deployment

---

## 🧱 Tech Stack

- **Next.js** 13 (App Router)
- **React** 19
- **TypeScript**
- **TailwindCSS** 4
- **Axios** – HTTP requests
- **js-cookie** – Token storage
- **react-hot-toast** – Notifications
- **Recharts** – Analytics visuals

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/Akala200/saas_frontend.git

# 2. Navigate to frontend
cd saas_frontend

# 3. Install dependencies
yarn install
```

---

## 💻 Development

```bash
# Run in development mode with Turbopack
yarn dev
```

Frontend will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Usage

### 🧪 Local Build & Run

```bash
# Build Docker image
docker build -t content-platform-frontend .

# Run container
docker run -p 3000:3000 content-platform-frontend
```

### 🛠 Dockerfile (uses multi-stage build)

- `output: 'standalone'` enabled in `next.config.ts`
- `node:18-alpine` used for slim production container

---

## 🔐 Authentication

- JWT-based auth
- Token stored in cookies via `js-cookie`
- User info (name, email) stored in `localStorage` for personalization

---

## 📁 Project Structure

```bash
frontend/
├── app/                # Next.js App Router structure
│   └── (private)/      # Authenticated routes
├── components/         # UI components (Button, Card, etc.)
├── hooks/              # Custom hooks (auth, content)
├── services/           # Axios service setup
├── validation/         # Zod validation schemas
├── styles/             # Tailwind + global styles
├── next.config.ts      # Next.js config (standalone)
└── Dockerfile          # Multi-stage Dockerfile
```

---

## 🌐 Environment Variables

```env
# .env.local (not committed)
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

Make sure this value matches your backend API server.

---

## 🧠 Recommendation Engine Integration

- Recommended content is fetched via `/recommend`
- Interactions are tracked via `/track` with types: `view`, `like`, `unlike`
- All recommendations are displayed with the option to engage

---

## 📈 Analytics & Tracking

- Recharts used to render engagement data
- Interaction buttons (👁️, 👍, 👎) trigger POST requests to log actions

---

## 📋 Scripts

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## 📖 API Endpoints Used

- `POST /auth/login` – Log in
- `GET /auth/me` – Get current user
- `POST /auth/register` – Register new user
- `GET /content` – All content
- `POST /content` – Create content
- `PUT /content/:id` – Update content
- `DELETE /content/:id` – Delete content
- `GET /recommend` – Get personalized recommendations
- `POST /track` – Track user interaction (view/like/unlike)

---

## 🧪 Testing (Manual)

- ✅ Content creation/deletion/editing
- ✅ Recommendation tracking
- ✅ Auth flow with token validation
- ✅ Docker image builds and serves on port 3000

---

## 📌 Notes

- Make sure backend and database services are running before starting frontend
- Consider using Docker Compose for combined backend/frontend deployment
- See [Technical Assessment PDF](./) for full platform spec

---

## 🧑‍💻 Author

**Your Name** – [GitHub](https://github.com/akala200)

---

## 📜 License

MIT