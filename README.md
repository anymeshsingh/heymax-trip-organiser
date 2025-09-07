# Trip Organiser - Turbo Monorepo

A modern trip organiser application built with Turbo monorepo architecture, featuring native mobile apps (iOS/Android) and web application with shared components and state management.

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- pnpm (package manager)
- iOS Simulator (for iOS development)

### Setup
```bash
# Clone the repository
git clone https://github.com/anymeshsingh/heymax-trip-organiser.git
cd trip-organiser

# Install dependencies
pnpm i
```

## 🏃‍♂️ Running the Applications

### Development Mode

```bash
# Run all applications in development
turbo dev
```

## 🏗️ Architecture

This project uses a **Turbo monorepo** structure with shared packages and multiple applications:

```
trip-organiser/
├── apps/
│   ├── native/          # Expo React Native app (iOS/Android)
│   └── web/             # Next.js web application
├── packages/
│   ├── ui/              # Shared UI components
│   ├── api-handler/     # API utilities and React Query setup
│   └── model/           # Shared TypeScript types and schemas
└── turbo.json           # Turbo configuration
```

## 🚀 Features

- **Cross-platform**: Native iOS/Android app and responsive web application
- **Shared Components**: Reusable UI components across platforms
- **Form Management**: TanStack Form for robust form handling
- **State Management**: TanStack React Query for server state
- **Type Safety**: Full TypeScript implementation
- **Modern Styling**: 
  - React Native StyleSheets for mobile
  - Tailwind CSS for web
  - Class Variance Authority for component variants

## 📱 Applications

### Native App (Expo)
- **Framework**: Expo SDK 53
- **Navigation**: Expo Router
- **Styling**: React Native StyleSheets
- **Platforms**: iOS, Android

### Web App (Next.js)
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Responsive Design**: Mobile-first approach

## 📦 Shared Packages

### `@repo/ui`
Shared UI components library with platform-specific implementations:
- **PrimaryButton**: Cross-platform button component

### `@repo/api-handler`
API utilities and React Query configuration:
- **React Query Setup**: Pre-configured query client
- **API Endpoints**: Mock data handlers
- **Type-safe Queries**: TypeScript integration

### `@repo/model`
Shared TypeScript types and Zod schemas:
- **Trip Models**: Trip, destination, and user types
- **Form Schemas**: Validation schemas for forms
- **API Types**: Request/response type definitions

## 📚 Key Technologies

- **Turbo**: Monorepo build system
- **TypeScript**: Type-safe development
- **TanStack Form**: Form state management
- **TanStack React Query**: Server state management
- **Expo Router**: File-based routing for native
- **Next.js App Router**: Modern React patterns
- **Zod**: Runtime type validation
- **Class Variance Authority**: Component variant management
