# Avdhoot Nakod Portfolio Website

## Overview

This is a modern, single-page portfolio website for Avdhoot Ramkrishna Nakod, a Data Scientist and Machine Learning Engineer based in Pune, Maharashtra, India. The site features a premium dark aesthetic with scroll-driven animations, showcasing professional experience, skills, projects, and contact information in an engaging, award-winning design style.

The application is built as a full-stack TypeScript project with a React frontend and Express backend, designed to be lightweight, performant, and visually sophisticated.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using functional components and hooks exclusively.

**Routing**: Wouter for lightweight client-side routing. Single-page application with a primary Portfolio route and a NotFound fallback.

**UI Component Library**: Shadcn/ui (New York style variant) built on Radix UI primitives. All UI components are locally managed in `client/src/components/ui/` providing a comprehensive set of accessible, customizable components including forms, dialogs, cards, buttons, badges, and more.

**Styling Approach**: 
- Tailwind CSS for utility-first styling with custom configuration
- Dark mode as default theme (class-based dark mode strategy)
- Custom color palette with CSS variables for theming flexibility
- Typography using Poppins and Inter fonts via Google Fonts CDN

**Animation Strategy**:
- GSAP (GreenSock Animation Platform) with ScrollTrigger plugin for scroll-driven animations
- Lenis smooth scroll library for buttery scrolling experience
- Animations managed via CDN links in the HTML head

**State Management**: 
- React Query (TanStack Query) for server state and data fetching
- React Hook Form with Zod validation for form state management
- Local component state using React hooks (useState, useEffect, useRef)

**Design Philosophy**: Premium, Awwwards-style portfolio with scroll-driven interactions, clean typography, and sophisticated visual hierarchy. Split-layout hero section with glass-morphic elements and floating background animations.

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js

**Development vs Production**:
- Development mode (`server/index-dev.ts`): Integrates Vite dev server as middleware for HMR and fast refresh
- Production mode (`server/index-prod.ts`): Serves pre-built static files from `dist/public`

**API Structure**: RESTful API with routes prefixed with `/api` (registered in `server/routes.ts`). Currently minimal backend logic as this is primarily a static portfolio site.

**Build Process**:
- Frontend: Vite bundler compiling React/TypeScript to optimized static assets
- Backend: esbuild bundling server code to ESM format
- Single build command produces both client and server bundles

**Storage Layer**: In-memory storage implementation (`MemStorage` class) with interface-based design allowing easy swap to persistent storage. Currently includes user CRUD operations as a foundation.

### Data Storage Solutions

**Current Implementation**: In-memory storage using Map data structures (no persistence).

**Database Configuration**: Drizzle ORM configured for PostgreSQL with schema defined in `shared/schema.ts`. Database setup present but not actively used in current portfolio implementation.

**Schema Design**: Simple users table with UUID primary keys, username/password fields. Prepared for future authentication features.

**Migration Strategy**: Drizzle Kit configured for schema migrations to `./migrations` directory.

**Rationale**: Portfolio site doesn't require persistent data storage currently, but architecture supports adding database-backed features (contact form submissions, analytics, CMS) without major refactoring.

### Authentication and Authorization

**Current State**: No active authentication system implemented. Basic user schema exists as foundation.

**Session Management**: connect-pg-simple package included for PostgreSQL-backed session storage when authentication is implemented.

**Future Considerations**: Architecture prepared for adding authentication layer using existing user schema and session middleware.

### External Dependencies

**UI Component System**: 
- Radix UI primitives (@radix-ui/*) - 20+ component packages for accessible UI primitives
- Shadcn/ui configuration for consistent component styling and behavior

**Animation Libraries**:
- GSAP 3.12.5 (via CDN) - Professional-grade animation library
- ScrollTrigger plugin - Scroll-based animation triggers
- Lenis 1.0.42 (via CDN) - Smooth scroll library

**Styling and Theming**:
- Tailwind CSS - Utility-first CSS framework
- PostCSS with Autoprefixer - CSS processing
- class-variance-authority - Type-safe variant management for components
- clsx & tailwind-merge - Conditional className utilities

**Form Management**:
- React Hook Form - Performant form state management
- Zod - TypeScript-first schema validation
- @hookform/resolvers - Validation resolver integration

**Data Fetching**:
- TanStack React Query v5 - Server state management and caching

**Database (configured but optional)**:
- Drizzle ORM - TypeScript ORM for PostgreSQL
- @neondatabase/serverless - Serverless Postgres driver
- Drizzle Zod - Schema validation integration

**Development Tools**:
- Vite - Build tool and dev server
- TSX - TypeScript execution for development
- esbuild - Production bundler for server code
- Replit-specific plugins (cartographer, dev-banner, runtime-error-modal) for enhanced development experience

**Fonts**: Google Fonts (Poppins, Inter) loaded via CDN for clean, modern typography.

**Icons**: 
- Lucide React - Icon library
- React Icons (specifically SiKaggle for Kaggle social link)

**Design System Dependencies**:
- date-fns - Date formatting utilities
- embla-carousel-react - Carousel component foundation
- cmdk - Command menu component
- vaul - Drawer component library