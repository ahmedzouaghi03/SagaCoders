# 🎓 Forum ENET'COM - FEEE 11.0

<div align="center">

![Forum ENET'COM](https://img.shields.io/badge/Forum-ENET'COM-3751FF?style=for-the-badge&logo=graduation-cap)
![Version](https://img.shields.io/badge/Edition-11.0-FF6B35?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)

**A comprehensive digital platform connecting students, companies, and administration for the annual ENET'COM Career Forum**

[Live Demo](#) • [Documentation](#) • [Report Bug](#)

</div>

---

## 📋 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Technical Implementation & Innovation](#-technical-implementation--innovation)
- [Features](#-features)
- [Interface & User Experience](#-interface--user-experience)
- [Getting Started](#-getting-started)
- [Future Scope](#-future-scope)

---

## 🎯 The Problem

The annual **Forum Entreprise Étudiant ENET'COM (FEEE)** faces significant challenges in connecting students with industry partners:

- **Fragmented Communication**: Students, companies, and administrators rely on disconnected channels (emails, social media, physical meetings) to share internship opportunities
- **Manual Application Process**: Traditional paper-based or email applications create bottlenecks and tracking difficulties
- **Limited Visibility**: Students struggle to discover all available internship opportunities; companies can't efficiently reach qualified candidates
- **Administrative Overhead**: Forum organizers spend excessive time coordinating between parties instead of enhancing the event experience
- **No Historical Data**: Previous editions' information and success stories are not easily accessible for planning and inspiration

---

## 💡 Our Solution

**Forum ENET'COM Platform** is a centralized digital ecosystem that revolutionizes how the career forum operates by providing:

### Three-Tier Dashboard Architecture

1. **Student Dashboard** - Browse internships, track applications, upload documents, and manage profiles
2. **Company Dashboard** - Publish internship offers, review candidates, and manage applications with accept/reject workflows  
3. **Administration Dashboard** - Supervise all activities, approve company registrations, moderate internship listings, and generate analytics

### Key Differentiators

- **Real-time Application Tracking**: Students receive instant updates on their application status
- **Smart Filtering System**: Advanced search and filter capabilities for internships by field, work mode, and location
- **Event Management**: Support for multiple forum editions with dedicated galleries and statistics
- **Professional Branding**: Modern, responsive design that elevates the ENET'COM brand

---

## 🛠 Technical Implementation & Innovation

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     MONOREPO (Turborepo)                       │
├─────────────────────────────────────────────────────────────────┤
│  apps/                                                          │
│  ├── web/          → Next.js 15 Frontend (App Router)          │
│  └── backend/      → Fastify API Server                        │
├─────────────────────────────────────────────────────────────────┤
│  packages/                                                      │
│  ├── db/           → Prisma ORM + PostgreSQL Schema            │
│  └── utils/        → Shared utilities (auth, email, validation)│
└─────────────────────────────────────────────────────────────────┘
```

### Core Technologies

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 (App Router) | Server/Client components, file-based routing |
| **Styling** | Tailwind CSS 4.0 | Utility-first responsive design |
| **Animations** | Framer Motion | Smooth, performant UI animations |
| **State** | Zustand | Lightweight global state management |
| **Database** | PostgreSQL + Prisma | Type-safe database access with migrations |
| **File Upload** | UploadThing | Secure CV/document uploads |
| **Email** | Resend | Transactional emails (password reset, notifications) |
| **Validation** | Zod | Runtime type validation with TypeScript inference |
| **Authentication** | Custom JWT + bcrypt | Secure password hashing and session management |
| **Build System** | Turborepo + pnpm | Optimized monorepo builds with caching |

### Why Next.js as a Full-Stack Solution?

Given the projected scale of the Forum ENET'COM platform—with a maximum of **10,000 concurrent users** during peak forum events—we made a deliberate architectural decision to leverage **Next.js as our unified full-stack framework**. Next.js 15's Server Components and Server Actions provide robust backend capabilities (database queries, authentication, file handling) without the operational complexity of a separate API server. This approach offers several strategic advantages:

- **Cost Efficiency**: Eliminates the need to provision, deploy, and maintain a dedicated backend infrastructure
- **Simplified Deployment**: Single deployment target (Vercel, Docker, or Node.js server) reduces DevOps overhead
- **Performance at Scale**: Next.js with SSR and edge caching comfortably handles our user load with sub-second response times
- **Developer Velocity**: Unified codebase means faster iteration without context-switching between frontend and backend repositories

Rather than over-engineering with microservices or complex distributed systems, we embraced the principle of **"right-sizing" our architecture** to match actual requirements—delivering a production-ready platform that scales efficiently while minimizing both development time and hosting costs.

### Database Schema Design

Our schema implements a robust **role-based access control (RBAC)** system:

```prisma
enum UserRole {
  STUDENT   // Can browse and apply to internships
  COMPANY   // Can post internships and review applications
  ADMIN     // Full platform control
}

// Polymorphic user relationships
User → Student (1:1) → StudentFiles[], Applications[]
User → Company (1:1) → Internships[]
User → Admin (1:1)

// Event-driven internship management
Event → Internships[] → Applications[]
```

### Innovation Highlights

1. **Server Actions**: Leveraging Next.js 15 Server Actions for type-safe, zero-boilerplate API calls
   ```typescript
   "use server";
   export async function createApplication(data: CreateApplicationData) {
     // Direct database access without REST endpoints
   }
   ```

2. **Shared Package Architecture**: Utility functions (`hash`, `token`, `email`, `zod`) are shared across apps via workspace packages

3. **Type-Safe Database Access**: Prisma generates TypeScript types from schema, ensuring compile-time safety

4. **Progressive Enhancement**: Client-side interactivity enhances server-rendered content

---

## ✨ Features

### 👨‍🎓 Student Portal
- ✅ Browse and search internship listings with advanced filters
- ✅ Apply to internships with CV and motivation letter upload
- ✅ Track application status (Pending → Accepted/Rejected)
- ✅ View recently browsed internships
- ✅ Profile management with document uploads
- ✅ Password reset via email

### 🏢 Company Portal
- ✅ Create and manage internship postings
- ✅ Review incoming applications
- ✅ Accept/Reject candidates with one click
- ✅ Dashboard statistics (views, applications, acceptance rate)
- ✅ Company profile customization

### 🔧 Admin Panel
- ✅ Approve/Reject company registrations
- ✅ Moderate internship listings before publication
- ✅ Manage forum events (multiple editions)
- ✅ View platform-wide analytics
- ✅ Student and company management

### 🌐 Public Pages
- ✅ Landing page showcasing forum concept and objectives
- ✅ Previous editions gallery with year filtering
- ✅ About page with mission, values, and timeline
- ✅ Contact form with email integration
- ✅ Responsive design for all devices

---

## 🎨 Interface & User Experience

Our design philosophy prioritizes **clarity, professionalism, and accessibility** while maintaining the ENET'COM brand identity.

### Design System

- **Primary Color**: `#3751FF` (Trust, Technology)
- **Accent Color**: `#FF6B35` (Energy, Action)
- **Typography**: Clean, readable hierarchy
- **Components**: Consistent card-based layouts with subtle shadows and borders

### Landing Page
The hero section immediately communicates the forum's value proposition with animated statistics and clear CTAs.

![Landing Page Hero Section](./md_files_assets/Landing-Page.PNG)

### Student Dashboard
A clean, organized interface showing application status, recent internships, and quick access to opportunities.

![Student Dashboard](./md_files_assets/Student-Dashboard.PNG)

### Internship Browsing
Powerful filtering system with responsive grid layout displaying company logos, work modes, and key details at a glance.

![Internship Browsing Interface](./md_files_assets/Internship-Browsing.PNG)

### Company Dashboard
Comprehensive view of posted internships, incoming applications, and actionable quick stats.

![Company Dashboard](./md_files_assets/Company-Dashboard.PNG)

### Gallery Page
Interactive photo gallery with year selection, lightbox viewing, and pagination for previous forum editions.

![Gallery with Lightbox](./md_files_assets/Gallery-Page.PNG)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **pnpm** 9.x (package manager)
- **PostgreSQL** database

### Installation

```bash
# Clone the repository
git clone https://github.com/SagaCoders/forum-enetcom.git
cd forum-enetcom

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your database URL, Resend API key, etc.

# Run database migrations
pnpm --filter @monkeyprint/db db:migrate

# Start development servers
pnpm dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/forum_enetcom"
RESEND_API_KEY="re_xxxxxxxxxxxxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
UPLOADTHING_SECRET="sk_xxxxxxxxxxxxx"
```

### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Web App | `http://localhost:3000` | Main frontend application |
|

## 🔮 Future Scope

### Phase 2 Enhancements
- [ ] **Real-time Notifications**: WebSocket-based instant updates for application status changes
- [ ] **AI-Powered Matching**: Hybrid search powerd by Qdrant to suggest internships based on student profile and CVs
- [ ] **Analytics Dashboard**: Detailed metrics for admins (conversion rates, popular fields, etc.)

### Phase 3 Vision
- [ ] **Mobile App**: flutter companion app for on-the-go access
- [ ] **Multi-language Support**: Arabic, English and french i18n based localization
- [ ] **Alumni Network**: Connect graduated students with current attendees

---

## 👥 Team

**Binky_and_the_brains_x2** - Passionate developers building solutions for the ENET'COM community

---

## 📄 License

This project is developed for the CodersSaga Hackathon 2026.

---

<div align="center">

**Built with ❤️ for Forum ENET'COM 11.0**

*Connecting Talent with Opportunity*

</div>