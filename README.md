# 🖥️ Dashboard Admin Panel

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000?logo=vercel)](https://dashboard-iota-ruby.vercel.app/login)  
[![GitHub Repo](https://img.shields.io/badge/GitHub-Dashboard-181717?logo=github)](https://github.com/MostafaGaber135/Dashboard)

A modern, Firebase-powered Admin Dashboard built with **Next.js**, **Redux Toolkit**, **TailwindCSS + Flowbite UI**, and **ApexCharts** to manage products, users, and track analytics through dynamic charts.

---

## 📽️ Demo Video
A walkthrough video showcasing the dashboard features is included in the repository:  
📹 [Watch the video here](https://drive.google.com/file/d/19bDb_UiXOCMRT0H0Hbnqt7MgkB_N-y94/view?usp=sharing)

---

## 🚀 Features

- 🔐 **Secure Authentication** using Firebase Auth
- 📦 **Product Management**: View, search, sort, paginate, and add products
- 👥 **User Management**: Display user data
- 📊 **Analytics Dashboard**: Interactive charts powered by ApexCharts
- 🎨 **Clean Modern UI** with Flowbite and TailwindCSS
- 🔁 **Real-time Firebase Integration** for Products & Users
- 🌐 **Deployed on Vercel** for fast, global access

---

## 📸 UI Previews

| Login | Overview | User Table | Product Table |
|-------|----------|------------|---------------|
| ![Login](https://dashboard-iota-ruby.vercel.app/images/login-page.png) | ![Overview](https://dashboard-iota-ruby.vercel.app/images/overview-page.png) | ![Product Table](https://dashboard-iota-ruby.vercel.app/images/product-table.png) | ![User Table](https://dashboard-iota-ruby.vercel.app/images/user-table.png) |

---

## 📁 Project Structure

```
├── .flowbite-react/
├── .next/
├── .vscode/
├── features/
├── node_modules/
├── public/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── providers.tsx
│       ├── login/
│       │   ├── page.tsx
│       │   ├── layout.tsx
│       │   ├── providers.tsx
│       ├── dashboard/
│       │   ├── layout.tsx
│       │   ├── overview/
│       │   │   └── page.tsx
│       │   ├── products/
│       │   │   └── page.tsx
│       │   └── users/
│       │       ├── layout.tsx
│       │       └── page.tsx
│       └── _components/
│           ├── AddProductForm.tsx
│           ├── Charts.tsx
│           ├── Loader.tsx
│           ├── overview.tsx
│           ├── Pagination.tsx
│           ├── ProductsTable.tsx
│           ├── UsersTable.tsx
│           └── loader.css
├── store/
│   └── index.ts
├── utils/
│   └── firebase.ts
├── styles/
│   └── globals.css
├── .env
├── .gitignore
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js (App Router)** | React framework & routing |
| **Firebase** | Authentication & Firestore DB |
| **Redux Toolkit** | State management |
| **TailwindCSS + Flowbite** | Styling and UI components |
| **ApexCharts** | Data visualization |
| **Vercel** | Hosting and deployment |

---

## ▶️ Try it Live

1. Visit: [https://dashboard-iota-ruby.vercel.app/login](https://dashboard-iota-ruby.vercel.app/login)
2. Sign in with Firebase-authenticated credentials
3. Explore the dashboard sections: Products, Users, Overview

---

## 🧑‍💻 Getting Started Locally

```bash
git clone https://github.com/MostafaGaber135/Dashboard.git
cd Dashboard
npm install
```

### Setup Firebase:

1. Create a Firebase project
2. Enable **Email/Password Authentication**
3. Enable **Firestore Database**
4. Add your credentials in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Then run:

```bash
npm run dev
```
---

## 🙌 Acknowledgment

Developed by [Mostafa Gaber](https://github.com/MostafaGaber135) 
