# BookNook — Your Digital Bookstore

A full-featured digital bookstore built with React, Convex, and Tailwind CSS. Browse, buy, rate, and review books in a beautiful, modern interface.

## Features

- **Browse & Search** — Search books by title, author, or genre with full-text search
- **Rate & Review** — Rate books (1-5 stars) and leave comments
- **Purchase Books** — Buy books with a simulated checkout system
- **Favorites** — Build your personal favorites list
- **Purchase History** — View all your past purchases
- **Notifications** — Get notified when you make a purchase
- **Admin Dashboard** — Manage books (add, edit, delete) with an admin panel
- **Authentication** — Email/password sign up and sign in

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Convex (serverless database + functions)
- **Auth:** @convex-dev/auth with password provider
- **Routing:** React Router v7
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js 18+)
- A [Convex](https://convex.dev) account

### Setup

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd book-store
   ```

2. Install dependencies:
   ```sh
   bun install
   ```

3. Initialize Convex (first time only):
   ```sh
   bun convex dev
   ```

4. Seed sample books (first time only):
   ```sh
   bun convex run seed:seed
   ```

5. Start the development server:
   ```sh
   bun run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start the Vite dev server |
| `bun run build` | Build for production |
| `bun run check` | Run TypeScript type checking |
| `bun convex dev` | Start Convex dev process |
| `bun convex run seed:seed` | Seed sample book data |

## Project Structure

```
├── convex/                 # Convex backend functions
│   ├── _generated/         # Auto-generated types & API
│   ├── auth.ts             # Auth configuration
│   ├── http.ts             # HTTP router
│   ├── schema.ts           # Database schema
│   ├── users.ts            # User queries/mutations
│   ├── books.ts            # Book queries/mutations
│   ├── ratings.ts          # Rating queries/mutations
│   ├── comments.ts         # Comment queries/mutations
│   ├── purchases.ts        # Purchase queries/mutations
│   ├── notifications.ts    # Notification queries/mutations
│   └── seed.ts             # Sample data seeder
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ui/             # shadcn/ui components
│   ├── pages/              # Page components
│   │   ├── Landing.tsx
│   │   ├── Auth.tsx
│   │   ├── Books.tsx
│   │   ├── BookDetail.tsx
│   │   ├── Profile.tsx
│   │   ├── Favorites.tsx
│   │   ├── Purchases.tsx
│   │   ├── Admin.tsx
│   │   └── Notifications.tsx
│   ├── App.tsx             # Router setup
│   └── main.tsx            # App entry point
└── package.json
```

## License

KNU
