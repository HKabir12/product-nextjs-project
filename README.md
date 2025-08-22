This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

🚀 NextProductHub

NextProductHub is a simple product management application built with Next.js 15 (App Router) and NextAuth.js.
It demonstrates both public and protected routes with authentication, product listing, product details, and a secure dashboard for adding products.

🔹 Features

🌐 Landing Page (Public)

Includes Navbar, Hero, Product Highlights, and Footer

Navigation to Login and Products

🔑 Authentication

Login with NextAuth.js (Google or credentials)

Redirect to /products after login

📦 Products

/products: Public list of products

/products/[id]: Public product details page

🔒 Dashboard (Protected)

/dashboard/add-product: Add new products (only when logged in)

Redirects unauthenticated users to /login

✨ Optional Enhancements

Loading spinners during form submission

Toast notifications after successful product addition

Light/Dark theme toggle
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Live Demo
[NextProductHub Live Site](https://product-nextjs-rosy.vercel.app/)

---

## GitHub Repository
[NextProductHub Repository](https://github.com/HKabir12/product-nextjs-project)

---

## Setup & Installation

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Google OAuth Client ID & Secret (for Google login)

### Installation Steps
1. **Clone the repository**
```bash
git clone https://github.com/HKabir12/product-nextjs-project.git
cd product-nextjs-project

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
