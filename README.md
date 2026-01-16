# PostHub

A modern, production-ready blogging application built with **Next.js 16**, **React 19**, and **TypeScript**. Create, edit, and manage posts with a responsive, accessible interface and comprehensive testing coverage.

**[Live Demo](https://posthub777.vercel.app)**

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Performance](#performance)
- [Architecture](#architecture)
- [Accessibility](#accessibility)

---

## Overview

PostHub is a complete blogging platform demonstrating modern web development best practices including:

- Optimistic UI updates with automatic rollback
- Intelligent caching with React Query (stale-while-revalidate)
- Mobile-first responsive design (320px+)
- Full accessibility compliance (WCAG AA)
- Comprehensive unit and E2E testing
- Production-ready performance optimization

---

## Features

### Core Features

- **Create & Manage Posts** - Create, read, update, and delete posts with a clean interface
- **Authentication** - Secure auth system with context-based user state management
- **Responsive Design** - Mobile-first approach that works seamlessly on all devices (320px+)
- **Real-time Updates** - Optimistic updates with automatic rollback on errors
- **Smart Caching** - React Query for efficient data management and intelligent cache invalidation

### User Experience

- **Loading States** - Beautiful skeleton loaders for all async operations
- **Empty States** - Helpful messaging and CTAs when no data is available
- **Error Handling** - Clear error messages with retry capabilities and error boundaries
- **Accessibility** - ARIA labels, keyboard navigation, and semantic HTML
- **Dark Theme** - Modern dark UI with gradient accents
- **Mobile Optimized** - Touch-friendly buttons, responsive typography, and navigation

### Performance

- **Code Splitting** - Automatic route-based code splitting via Next.js
- **Image Optimization** - Built-in image optimization (AVIF, WebP support)
- **Client-Side Caching** - React Query with configurable stale time and cache strategies
- **Optimized Bundles** - Tree-shaking and minification in production
- **Performance Monitoring Ready** - Structured for Web Vitals tracking

---

## Architecture & Design Decisions

### Frontend Architecture

```
app/
├── layout.tsx              # Root layout with providers and error boundary
├── page.tsx                # Home page with hero section
├── posts/
│   ├── page.tsx            # Posts list with search-like functionality
│   └── [id]/
│       └── page.tsx        # Post detail view
├── create/page.tsx         # Create post form
├── edit/[id]/page.tsx      # Edit post form
├── login/page.tsx          # Authentication page
└── profile/page.tsx        # User profile

shared/
├── lib/
│   ├── posts-api.ts        # API client with error handling
│   ├── post-mutations.ts   # React Query mutations with optimistic updates
│   ├── auth-context.tsx    # Authentication context provider
│   └── posts.ts            # Type definitions
└── ui/
    ├── skeleton/           # Loading skeleton components
    ├── query-state/        # Error, loading, and retry UI
    ├── error-boundary/     # React error boundary wrapper
    └── post-form/          # Reusable form component
```

### Key Architectural Decisions

#### 1. **Data Fetching & Caching**

- **React Query** for server state management
- **Stale-while-revalidate**: Data considered fresh for 1 minute, then refetch in background
- **Cache invalidation**: Automatic on mutations (create/update/delete)
- **Optimistic updates**: Immediate UI feedback with automatic rollback on failure

```typescript
// Example: useDeletePost mutation
onMutate: (postId) => {
  // Optimistically remove from cache
  queryClient.setQueryData(
    ["posts"],
    previous.filter((p) => p.id !== postId)
  );
  // Return context for rollback
  return { previousPosts };
};
onError: (_, __, context) => {
  // Rollback if mutation fails
  queryClient.setQueryData(["posts"], context?.previousPosts);
};
```

#### 2. **Authentication Flow**

- Context-based state management (no Redux needed)
- Auth guard on layout prevents rendering until auth status determined
- Protected routes redirect to login when unauthorized
- User state persisted in React context

#### 3. **Component Structure**

- **Server Components** by default (RootLayout)
- **Client Components** only where needed (forms, real-time updates)
- **UI Components** are composable and reusable


#### 4. **Error Handling**

- Error boundary at root level catches unexpected errors
- Query state component shows loading/error/retry UI
- API errors include status codes and messages
- Toast notifications for mutation feedback

---

## Performance Optimization Strategies

### 1. **Load Time Optimization**

```javascript
// Next.js automatic code splitting by route
// Each page loaded only when needed
// Route: /posts → Only posts page code downloaded
// Route: /create → Only create form code downloaded
```

### 2. **Rendering Strategy**

- **Static Generation**: Home page pre-rendered at build time
- **Dynamic Rendering**: Posts pages use React Query (client-side caching)
- **Revalidation**: ISR not used (client-driven updates preferred for blog)

---

## Caching & Data Management

### Query Key Strategy

```typescript
["posts"][("posts", id)][("posts", id, "edit")]; // List of all posts // Specific post detail // Edit cache (optional)
```

### Invalidation & Refetching

```typescript
// On create post
queryClient.invalidateQueries({ queryKey: ["posts"] });

// On update post
queryClient.setQueryData(["posts"], updateOptimistically);
queryClient.invalidateQueries({ queryKey: ["posts", postId] });

// On delete post
queryClient.setQueryData(["posts"], filterOptimistically);
```

### Optimistic Updates

```typescript
// Before server response, update UI
onMutate: async (newData) => {
  await queryClient.cancelQueries()
  const previous = queryClient.getQueryData()
  queryClient.setQueryData(previous + newData)
  return { previous }
},
onError: (_, __, context) => {
  queryClient.setQueryData(context.previous)
}
```

---

## Accessibility

### Features Implemented

- ✅ **ARIA Labels** on buttons and interactive elements
- ✅ **Semantic HTML** (nav, article, button, form, etc.)
- ✅ **Keyboard Navigation** - Tab through all interactive elements
- ✅ **Focus Management** - Visible focus rings on interactive elements
- ✅ **Form Validation** - Error messages linked with `aria-describedby`
- ✅ **Status Indicators** - Loading states use `role="status"`
- ✅ **Color Contrast** - WCAG AA compliant (light on dark)
- ✅ **Mobile Accessible** - Touch targets ≥48px
- ✅ **Screen Reader Ready** - Live regions for alerts and loading states

---

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run unit tests
npm run test:watch   # Watch mode for tests
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # E2E tests with UI
npm run test:all     # Run all tests
```
---

## Testing

The project includes comprehensive test coverage with **unit tests**, **component tests**, and **end-to-end tests**.

### Unit & Component Tests (Jest)

```bash
# Run all unit and component tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm test -- --coverage
```

**Test Files:**

- [app/posts/page.test.tsx](app/posts/page.test.tsx) - Posts list page tests
- [app/create/page.test.tsx](app/create/page.test.tsx) - Create form tests

**Test Configuration**: [jest.config.ts](jest.config.ts)

- **Environment**: jsdom (browser-like)
- **Setup**: [jest.setup.ts](jest.setup.ts) - MSW server, matchers
- **Coverage**: Unit tests for mutations, hooks, utilities

### End-to-End Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run specific test
npm run test:e2e -- posts.spec.ts
```

**Test Files:**

- [e2e/posts.spec.ts](e2e/posts.spec.ts) - Critical user flows

**Test Configuration**: [playwright.config.ts](playwright.config.ts)

- **Browsers**: Chromium, Firefox, WebKit
- **Base URL**: http://localhost:3000
- **Auto Server**: Starts dev server before tests
- **Parallel Execution**: All browsers in parallel

### What's Tested

✅ **Mutations**

- Create post with optimistic updates
- Edit post with rollback on error
- Delete post with confirmation
- Error handling and retry

✅ **Queries**

- Fetch posts list
- Cache invalidation
- Stale-while-revalidate behavior
- Error states

✅ **User Flows (E2E)**

- View posts list
- Create new post
- Edit existing post
- Delete post
- Navigate between pages
- Authentication flow

✅ **Accessibility**

- ARIA labels present
- Keyboard navigation
- Focus management
- Form validation

### Mocking Setup

**MSW (Mock Service Worker)**: [test/mocks/](test/mocks/)

- [handlers.ts](test/mocks/handlers.ts) - Mock API handlers
- [server.ts](test/mocks/server.ts) - MSW server configuration

```typescript
// Example: Testing a mutation
test("creates post optimistically", async () => {
  render(<CreatePostPage />);
  const titleInput = screen.getByLabelText(/title/i);
  const submitBtn = screen.getByRole("button", { name: /create/i });

  fireEvent.change(titleInput, { target: { value: "New Post" } });
  fireEvent.click(submitBtn);

  // Optimistic update appears instantly
  await waitFor(() => {
    expect(screen.getByText("New Post")).toBeInTheDocument();
  });
});
```

### Running All Tests

```bash
npm run test:all    # Unit + E2E tests
```

## Future Improvements

- [ ] Add categories/tags filtering
- [ ] Search functionality
- [ ] User comments system
- [ ] Like/reaction system
- [ ] Rich text editor (Markdown support)
- [ ] Image upload in posts
- [ ] Analytics dashboard
- [ ] Social sharing buttons
- [ ] Email notifications
- [ ] API rate limiting
