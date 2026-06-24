# SelectIQ - AI-Powered Career Intelligence Platform

<div align="center">

![SelectIQ Logo](./public/assets/images/logo.png)

**Transform Your Career with AI-Powered Intelligence**

[![Angular](https://img.shields.io/badge/Angular-19+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

</div>

## 📋 Overview

SelectIQ is a comprehensive, enterprise-grade SaaS platform that helps professionals optimize their career journey through AI-powered tools:

- 📄 **Resume Analyzer** - ATS scoring and optimization
- 💼 **Job Matcher** - Intelligent job-resume matching
- 💡 **Interview Generator** - Custom interview questions
- 🎓 **Skill Gap Analysis** - Identify and bridge skill gaps
- 🤖 **AI Career Coach** - Personalized career guidance
- 📊 **Analytics Dashboard** - Track your career progress

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v22+ or v24+
- **Python**: 3.12+
- **PostgreSQL**: 14+
- **Redis**: 7+

### Frontend Setup

```bash
cd SelectIQ-Frontend
npm install
npm start
```

Open `http://localhost:4200`

### Backend Setup (Coming Next)

```bash
cd SelectIQ-Backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open `http://localhost:8000/docs` for API documentation

## 📁 Project Structure

```
SelectIQ/
├── SelectIQ-Frontend/          # Angular 19+ Frontend
│   ├── src/app/
│   │   ├── core/              # Services, Guards, Interceptors
│   │   ├── shared/            # Reusable Components
│   │   └── features/          # Feature Modules
│   └── public/assets/         # Static Assets
│
└── SelectIQ-Backend/          # FastAPI Backend (Building Now)
    ├── app/
    │   ├── api/              # API Routes
    │   ├── core/             # Core Configuration
    │   ├── models/           # Database Models
    │   ├── services/         # Business Logic
    │   └── ai/               # AI Integration
    ├── alembic/              # Database Migrations
    └── tests/                # Test Suite
```

## ✨ Features

### Frontend ✅
- Responsive design with dark mode
- Real-time updates
- Smooth animations
- Comprehensive form validation
- File upload with drag & drop
- Secure authentication
- Role-based access control

### Backend (Building)
- Clean Architecture
- Repository Pattern
- AI Router abstraction
- Cost optimization
- Rate limiting
- Audit logging
- Real-time analytics

## 🛠 Tech Stack

### Frontend
- **Framework**: Angular 19+
- **Language**: TypeScript 5.6+
- **UI**: Angular Material + TailwindCSS
- **State**: Angular Signals + RxJS
- **Auth**: JWT with refresh tokens

### Backend
- **Framework**: FastAPI (Python 3.12)
- **Database**: PostgreSQL 14+ with pgvector
- **Cache**: Redis 7+
- **ORM**: SQLAlchemy 2.0
- **Migrations**: Alembic
- **Tasks**: Celery
- **AI**: OpenAI GPT-4, LangChain
- **Storage**: AWS S3

## 📖 Documentation

- **Getting Started**: See below
- **API Docs**: `http://localhost:8000/docs` (after backend setup)
- **Architecture**: Clean Architecture with DDD
- **Deployment**: Docker + Kubernetes ready

## 🚦 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/SelectIQ.git
cd SelectIQ
```

### 2. Frontend Setup

```bash
cd SelectIQ-Frontend
npm install
```

Update `src/environments/environment.ts`:
```typescript
export const environment = {
  apiUrl: 'http://localhost:8000/api',
  // ... other config
};
```

Start dev server:
```bash
npm start
```

### 3. Backend Setup (Next Step)

We're building this now following enterprise best practices!

## 🎨 Brand Colors

- **Primary Blue**: #00A8E8
- **Secondary Orange**: #FF6B35
- **Accent Light Blue**: #33bfeb
- **Dark Blue**: #0087ba

## 📝 Available Scripts

### Frontend
```bash
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Lint code
```

### Backend (Coming)
```bash
uvicorn app.main:app --reload    # Start dev server
pytest                            # Run tests
alembic upgrade head             # Run migrations
```

## 🔒 Security

- JWT authentication
- Refresh token rotation
- RBAC (Role-Based Access Control)
- Rate limiting
- Input validation
- OWASP protection
- Audit logging

## 📊 Monitoring

- Prometheus metrics
- Structured logging
- Health checks
- Error tracking
- Performance monitoring

## 🚀 Deployment

### Frontend
- Netlify / Vercel ready
- Docker containerized
- SSR enabled

### Backend
- Docker + Docker Compose
- Kubernetes ready
- Auto-scaling configured
- CI/CD pipelines

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by the SelectIQ Team

## 📞 Support

- Email: support@selectiq.com
- Documentation: https://docs.selectiq.com
- Issues: GitHub Issues

---

<div align="center">

**[Website](https://selectiq.com)** • **[Documentation](https://docs.selectiq.com)** • **[Blog](https://blog.selectiq.com)**

Made with ❤️ by the SelectIQ Team

</div>
