# Note.ly — Interactive Developer Documentation Suite

<p align="center">
  <img src="public/favicon.svg" alt="Note.ly Logo" width="100" height="100" />
</p>

<h3 align="center">
  <b>Note.ly</b>
</h3>

<p align="center">
  A high-fidelity, interactive 3-tier visual documentation platform that turns complex backend architecture infographics into clean, responsive developer mindmaps with live code snippets, copy buttons, flow diagrams, and protected analytics.
</p>

---

## 🌟 Key Features

- **3-Tier Navigation Architecture**:
  - **Stage 1 (Home Landing Page)**: Displays Category Cards only (`Async Fundamentals`, `Core Modules`, `Express.js Framework`, `MongoDB & Mongoose`, `Authentication & Authorization`).
  - **Stage 2 (Category View)**: Displays the grid of mindmap topic cards belonging to the selected category with a `← Back to Categories` button.
  - **Stage 3 (Topic Detail View)**: Displays the multi-column block grid layout with code blocks, API tables, flow diagrams, and pros/cons tables.
- **URL Hash Routing & Browser History**:
  - Full support for browser back/forward buttons and mousepad/touchpad swipe-back gestures (`#/`, `#/category/:id`, `#/topic/:id`, `#/admin`).
  - Direct deep linking and bookmarking for all 24 topics.
- **Global & Local Search**:
  - Real-time search engine with keyword highlighting across all 24 topics, code blocks, signatures, and methods.
- **1-Click Copy-to-Clipboard**:
  - Custom tokenized syntax highlighting for JavaScript code blocks with one-click copy buttons.
- **Private Admin Analytics Dashboard**:
  - Protected admin portal for owner analytics with JWT authentication, visitor tracking, search analytics, and activity charts.
- **Zero Horizontal Overflow**:
  - Built with responsive Tailwind CSS containers (`max-w-7xl`, `overflow-x: hidden`), ensuring zero horizontal scroll across desktop, tablet, and mobile screens.

---

## 📚 Mindmap Inventory (24 Topics across 5 Categories)

### Category 01: Async Fundamentals ⚡
1. **Callbacks & Callback Hell** — Fundamentals, Pyramid of Doom, Problems, Characteristics, Pros/Cons.
2. **Promises & Async/Await** — Promise syntax, States (Pending/Fulfilled/Rejected), Consuming (`.then()`), Async/Await, Error handling.
3. **Event Emitter** — Core methods (`.on()`, `.emit()`, `.once()`), Built-in events, Practical examples, Use cases, Notes.

### Category 02: Core Modules 🛠️
4. **Path Module** — `path.sep`, `path.delimiter`, `path.join()`, `path.resolve()`, `path.parse()`, Examples, Use cases.
5. **File System (fs) Module** — Sync vs Async APIs, `fs.readFile()`, `fs.writeFile()`, Async/Sync code examples, Best practices.
6. **HTTP Module** — Web servers, `http.createServer()`, Request (`req`) & Response (`res`) objects, Client requests, Express note.

### Category 03: Express.js Web Framework 🚀
7. **What is Express.js & Setup** — Express.js overview, `npm install express`, basic server setup, `express()` app object.
8. **Express Request & Response Objects** — `req.params`, `req.query`, `req.body`, `req.headers`, `res.send()`, `res.json()`, `res.status()`, `res.redirect()`.
9. **Routing & Routers in Express** — HTTP Methods (`get`, `post`, `put`, `delete`, `all`, `use`), Route vs Query parameters, Modular `express.Router()`.
10. **Express Middleware & Built-in Middleware** — Middleware definition, Request-Response cycle flow diagram, Application/Router-level middleware, Built-in (`express.json()`, `express.static()`), Popular 3rd-party middleware (`morgan`, `cors`, `helmet`).
11. **Error Handling in Express** — Default error handling, Custom 4-argument error middleware `(err, req, res, next)`, Async error handling (`express-async-handler`).
12. **Templates, Lifecycle & Best Practices** — View engines (`EJS`, `Pug`), `app.set/get`, `res.locals`, `req.app`, Express Request Lifecycle diagram, Best practices checklist, Directory tree.

### Category 04: MongoDB & Mongoose 🍃
13. **MongoDB Basics & Data Model** — Database, Collection, Document, Field, `_id`, NoSQL features, BSON document example & data types.
14. **MongoDB CRUD & Query Operators** — Native shell methods (`insertOne`, `find`, `updateOne`, `deleteOne`), Comparison (`$gte`, `$in`), Logical (`$and`, `$or`), Element, Array, Regex operators.
15. **MongoDB Advanced & Aggregation** — Indexing (`createIndex`), Aggregation Pipeline (`$match`, `$group`, `$sort`), Projection, Sort, Limit, Skip, Count, Distinct.
16. **Mongoose Overview, Schema & Model** — Mongoose ODM features, `mongoose.connect()`, `new mongoose.Schema()`, `mongoose.model()`, Schema Data Types.
17. **Mongoose Ops, Validation & Hooks** — `user.save()`, `findByIdAndUpdate()`, Built-in & Custom Validators, Pre/Post Hooks Middleware, Virtuals, Static & Instance methods.
18. **Relationships, Transactions & Best Practices** — Relationships & `.populate()`, Indexing in Mongoose, Transactions (`startSession`), `.lean()`, Best practices checklist, Folder structure, Database vs ODM comparison.

### Category 05: Authentication & Authorization 🔐
19. **Authentication & Authorization Fundamentals** — Authentication vs Authorization, Password hashing with bcrypt, HTTP status codes (401 vs 403), Basic auth flow, Important security rules.
20. **Session-Based Authentication & Cookies** — Server sessions, Unique session IDs, Cookie security flags (`httpOnly`, `secure`, `sameSite`), `express-session`, Logout & session destruction.
21. **Token-Based Authentication & JWT** — JSON Web Token structure (Header.Payload.Signature), `jwt.sign()`, `jwt.verify()`, Bearer authorization headers, Express JWT middleware.
22. **Access Tokens, Refresh Tokens & Token Rotation** — Short-lived access tokens vs long-lived refresh tokens, Token refresh flow, Refresh Token Rotation, Revocation strategies.
23. **Authorization, Roles, Permissions & RBAC** — Role-Based Access Control (RBAC), Permission-based authorization, Resource ownership checks, 401 vs 403 decision matrix.
24. **Complete Authentication & Authorization System** — Complete Register & Login flows, Protected route architecture, Security attacks (Brute Force, XSS, CSRF, Token Theft), Mental model.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend / API**: Express 5, Node.js (Vercel Serverless Function entry point in `api/index.js`)
- **Database & ODM**: MongoDB, Mongoose ODM
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, Cookie Parser
- **Icons & Charts**: Lucide React, Recharts
- **Typography**: Inter & Fira Code (Google Fonts)

---

## 🚀 Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd Notes
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/notely
JWT_SECRET=your_super_secret_jwt_key
ADMIN_EMAIL=admin@notely.com
ADMIN_PASSWORD=adminpassword123
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```text
Notes/
├── api/
│   └── index.js                      # Vercel Serverless Function entry point
├── server/
│   ├── index.js                      # Express Server & MongoDB Connection
│   ├── models/                       # Mongoose Schemas (Admin, AnalyticsEvent)
│   ├── routes/                       # Express Route Handlers (adminAuth, admin, events)
│   └── middleware/                   # JWT Auth & Validation Middleware
├── src/
│   ├── components/
│   │   ├── Logo.jsx                  # Note.ly Brand Logo Component
│   │   ├── CategorySelectionPage.jsx # Stage 1 Landing Page (5 Categories)
│   │   ├── TopicSelectionPage.jsx    # Stage 2 Category Topic Grid
│   │   ├── TopicDetailPage.jsx       # Stage 3 Topic Detail View
│   │   ├── BlockCard.jsx             # Card renderer for code, tables & flows
│   │   ├── CodeBlock.jsx             # Tokenized Syntax Highlighter & Copy Button
│   │   └── admin/                    # Admin Dashboard Components & Analytics Tabs
│   ├── context/
│   │   └── AdminAuthContext.jsx      # Admin Auth Context Controller
│   ├── data/
│   │   ├── asyncData.js              # Category 01 Data
│   │   ├── coreModulesData.js        # Category 02 Data
│   │   ├── expressData.js            # Category 03 Data
│   │   ├── mongodbData.js            # Category 04 Data
│   │   ├── authenticationAuthorizationData.js # Category 05 Data
│   │   └── mindmapData.js            # Central Data Aggregator (24 Topics)
│   ├── utils/
│   │   └── analytics.js              # Client Event Tracker Utility
│   ├── App.jsx                       # Main Hash Router & View Controller
│   ├── main.jsx                      # React Entry Point
│   └── index.css                     # Tailwind CSS & Global Styles
├── vercel.json                       # Vercel Serverless Rewrites & Routing
├── package.json
└── README.md
```

---

<p align="center">
  Designed & Built with ❤️ for Developers • <b>Note.ly</b>
</p>

