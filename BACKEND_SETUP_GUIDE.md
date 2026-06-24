# SelectIQ Backend - Complete Setup Guide

## 🎯 Architecture Overview

```
SelectIQ-Backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application entry
│   ├── config.py                  # Configuration settings
│   │
│   ├── api/                       # API layer
│   │   ├── __init__.py
│   │   ├── deps.py               # Dependencies
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py         # Main router
│   │       └── endpoints/
│   │           ├── auth.py
│   │           ├── users.py
│   │           ├── resume.py
│   │           ├── job_match.py
│   │           ├── interview.py
│   │           ├── career_coach.py
│   │           ├── subscription.py
│   │           └── admin.py
│   │
│   ├── core/                      # Core functionality
│   │   ├── __init__.py
│   │   ├── security.py           # Auth & Security
│   │   ├── config.py             # Settings
│   │   └── database.py           # DB connection
│   │
│   ├── models/                    # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── subscription.py
│   │   ├── resume.py
│   │   ├── job_match.py
│   │   ├── interview.py
│   │   └── audit.py
│   │
│   ├── schemas/                   # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── auth.py
│   │   ├── resume.py
│   │   ├── job_match.py
│   │   └── interview.py
│   │
│   ├── repositories/              # Data access layer
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── user.py
│   │   ├── resume.py
│   │   └── subscription.py
│   │
│   ├── services/                  # Business logic
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── resume_analyzer.py
│   │   ├── job_matcher.py
│   │   ├── interview_generator.py
│   │   ├── career_coach.py
│   │   └── subscription.py
│   │
│   ├── ai/                        # AI integration
│   │   ├── __init__.py
│   │   ├── router.py             # AI Router
│   │   ├── providers/
│   │   │   ├── __init__.py
│   │   │   ├── openai.py
│   │   │   └── base.py
│   │   ├── cost_tracker.py
│   │   └── prompts/
│   │       ├── resume_analysis.py
│   │       ├── job_matching.py
│   │       └── interview_gen.py
│   │
│   ├── middleware/                # Custom middleware
│   │   ├── __init__.py
│   │   ├── cors.py
│   │   ├── rate_limit.py
│   │   └── audit.py
│   │
│   └── utils/                     # Utilities
│       ├── __init__.py
│       ├── pdf_extractor.py
│       ├── docx_extractor.py
│       ├── s3_handler.py
│       └── email.py
│
├── alembic/                       # Database migrations
│   ├── versions/
│   └── env.py
│
├── tests/                         # Test suite
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_resume.py
│   └── test_ai_router.py
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── .dockerignore
│
├── .env.example
├── .gitignore
├── alembic.ini
├── pytest.ini
├── requirements.txt
└── README.md
```

## 📦 Step 1: Create Project Structure

```bash
# Navigate to SelectIQ directory
cd C:\Users\ranja\OneDrive\Desktop\SelectIQ

# Create backend directory
mkdir SelectIQ-Backend
cd SelectIQ-Backend

# Create all directories
mkdir app app\api app\api\v1 app\api\v1\endpoints
mkdir app\core app\models app\schemas app\repositories
mkdir app\services app\ai app\ai\providers app\ai\prompts
mkdir app\middleware app\utils
mkdir alembic alembic\versions
mkdir tests docker
```

## 📝 Step 2: Create requirements.txt

```txt
# FastAPI and Dependencies
fastapi==0.115.0
uvicorn[standard]==0.32.0
python-multipart==0.0.12
pydantic==2.10.0
pydantic-settings==2.6.0
email-validator==2.2.0

# Database
sqlalchemy==2.0.36
alembic==1.14.0
psycopg2-binary==2.9.10
asyncpg==0.30.0

# Authentication & Security
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.1
bcrypt==4.2.1

# AI & ML
openai==1.57.0
langchain==0.3.7
langchain-openai==0.2.9
tiktoken==0.8.0
pgvector==0.3.6

# Redis & Celery
redis==5.2.0
celery==5.4.0

# AWS S3
boto3==1.35.72
botocore==1.35.72

# Monitoring & Logging
prometheus-client==0.21.0
python-json-logger==3.2.1

# Testing
pytest==8.3.4
pytest-asyncio==0.24.0
pytest-cov==6.0.0
httpx==0.27.2

# Utilities
python-dateutil==2.9.0
pytz==2024.2
```

## 🔧 Step 3: Environment Setup

Create `.env` file:

```env
# Application
APP_NAME=SelectIQ
APP_VERSION=1.0.0
API_V1_PREFIX=/api/v1
DEBUG=True
ENVIRONMENT=development

# Database
DATABASE_URL=postgresql+asyncpg://selectiq:selectiq123@localhost:5432/selectiq
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=10

# Redis
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_ORG_ID=your-org-id

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=selectiq-uploads

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# CORS
CORS_ORIGINS=["http://localhost:4200","http://localhost:3000"]

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60

# Monitoring
PROMETHEUS_PORT=9090
```

## 🚀 Step 4: Core Files

### app/main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from prometheus_client import make_asgi_app

from app.core.config import settings
from app.api.v1.router import api_router
from app.middleware.rate_limit import RateLimitMiddleware
from app.middleware.audit import AuditMiddleware

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Custom Middleware
app.add_middleware(RateLimitMiddleware)
app.add_middleware(AuditMiddleware)

# Prometheus metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

# API Routes
app.include_router(api_router, prefix=settings.API_V1_PREFIX)

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": settings.APP_VERSION
    }

@app.get("/")
async def root():
    return {
        "message": "SelectIQ API",
        "version": settings.APP_VERSION,
        "docs": "/docs"
    }
```

### app/core/config.py

```python
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # App
    APP_NAME: str = "SelectIQ"
    APP_VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = False
    ENVIRONMENT: str = "production"
    
    # Database
    DATABASE_URL: str
    DATABASE_POOL_SIZE: int = 20
    DATABASE_MAX_OVERFLOW: int = 10
    
    # Redis
    REDIS_URL: str
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # OpenAI
    OPENAI_API_KEY: str
    OPENAI_ORG_ID: str = ""
    
    # AWS
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_REGION: str = "us-east-1"
    S3_BUCKET_NAME: str
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:4200"]
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

### app/core/database.py

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings

# Create async engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_size=settings.DATABASE_POOL_SIZE,
    max_overflow=settings.DATABASE_MAX_OVERFLOW,
    pool_pre_ping=True
)

# Create session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

# Base class for models
Base = declarative_base()

# Dependency for getting DB session
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
```

### app/core/security.py

```python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None
```

## 🗄️ Step 5: Database Models

### app/models/user.py

```python
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class UserRole(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(Enum(UserRole), default=UserRole.USER)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

Continue in next message due to length...
