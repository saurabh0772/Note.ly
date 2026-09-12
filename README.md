# Note.ly — Interactive Developer Architecture & Knowledge Suite

<p align="center">
  <img src="public/favicon.svg" alt="Note.ly Logo" width="100" height="100" />
</p>

<h3 align="center">
  <b>Note.ly</b>
</h3>

<p align="center">
  A high-fidelity developer learning platform combining <b>High-Scale System Design PDF Notes</b> with <b>Interactive Architectural Mindmaps</b>, in-browser document readers, live code snippets, mental models, and real-time analytics.
</p>

---

## 🌟 Key Features

### 1. Modern Aesthetic Landing Page
- **Hero & Learning Companion**:
  - Centered badge: `✦ Your Learning Companion`.
  - Headline: `Welcome to Notely` with vibrant indigo gradient typography.
  - Subtitle: *"Turn your practice into lasting knowledge. Choose how you want to explore your notes and start learning."*
- **Dual 3D Action Cards**:
  - **PDF Notes Card**: Soft lavender card featuring a 3D document illustration with a red `PDF` badge and **"Open PDF Notes →"** button.
  - **MindMap Card**: Soft mint green card featuring a 3D multi-node mindmap graphic and **"Open MindMap →"** button.
- **Handwritten Doodle Annotations & Ambient Decor**:
  - Script annotations (*"Study Smarter Not Harder!"*, *"Visualize Connect Remember"*, *"Small Steps Big Progress ♡"*) with curved pointer arrows.
  - Potted houseplant with stacked pastel books (*"Same Notes"*, *"Better Understanding"*, *"Brighter You"*).
  - Takeaway coffee cup with cardboard sleeve (*"Good Ideas Take Time ..."*).
- **Feature Highlights Row**:
  - ⚡ **Structured Learning** / *Well organized notes*
  - 🎯 **Concept Clarity** / *Simple explanations*
  - 📊 **Better Retention** / *Visual learning*
  - 👥 **Build Confidence** / *Practice with purpose*

---

### 2. PDF Notes Explorer & In-Browser Reader
- **Dynamic Category Navigation**:
  - Discovers folders directly from `src/pdfContent/` (e.g. `High Level System Design`).
  - Displays folder names with dynamic document count badges.
  - Automatically picks up any new subfolders and files added to `src/pdfContent/`.
- **Exact PDF Filenames & Metadata**:
  - Displays exact filenames (e.g. `01-System Design - Monolith and Microservices.pdf`, `02-System Design - API Gateway and Load Balancers.pdf`).
  - Metadata badges for file size, page count, and red PDF icon.
- **In-Browser Responsive PDF Reader**:
  - Embedded viewer rendered directly inside the browser using native PDF streaming (`#view=FitH&toolbar=1`).
  - Controls toolbar: **Fullscreen Mode** toggle, **Open in New Tab** (`ExternalLink`), **Download PDF** (`Download`), and **Close (X)**.
- **Header Doodle & Signature Quote**:
  - Category banner with *"Read Learn Apply Grow"* handwritten doodle.
  - Signature quote bar: *"Good notes today, a better developer tomorrow. — Notely ♡"*.

---

### 3. Open MindMap Explorer
- **Unified Two-Column Sidebar Layout**:
  - Left sidebar with category navigation:
    - *Async Fundamentals* (3 Topics)
    - *Core Modules* (3 Topics)
    - *Express.js Framework* (6 Topics)
    - *MongoDB & Mongoose* (6 Topics)
    - *Authentication & Authorization* (6 Topics)
  - Sidebar bottom motivational card: *"Small steps lead to big progress. Keep learning! ♡"*.
- **Category Banner & Doodles**:
  - Category description, topic count pill, and concept tag chips.
  - Hand-drawn doodle annotation: *"Visualize Connect Remember"*.
- **Topic Cards & Interactive Canvas**:
  - Topic cards with block counts, descriptions, and **"Explore MindMap →"** buttons.
  - Seamless transition to the full interactive canvas (`TopicDetailPage`) with zoomable nodes, code blocks, and mental models.

---

### 4. Universal Top Navigation Bar
- **Branding**: Stylized blue open book logo, `Notely` title, and subtitle *"Learn · Build · Remember"*.
- **Navigation Links**:
  - `Home` (direct link to landing page)
  - `Topics` (direct link to MindMap explorer)
  - `About` (interactive modal with Notely overview)
  - `Contact` (interactive modal with contact information)
- **Quick Search Bar**: `Search notes... [⌘ K]` input.
- **Controls**: Circular theme toggle button and user avatar `S`.

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
- **Icons & Visuals**: Lucide React, Recharts
- **Typography**: Inter, Caveat (Handwritten Doodles), Fira Code (Google Fonts)

---

## 🚀 Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/saurabh0772/Note.ly.git
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
│   └── index.js                          # Vercel Serverless Function entry point
├── server/
│   ├── index.js                          # Express Server & MongoDB Connection
│   ├── models/                           # Mongoose Schemas (Admin, AnalyticsEvent)
│   ├── routes/                           # Express Route Handlers (adminAuth, admin, events)
│   └── middleware/                       # JWT Auth & Validation Middleware
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                    # Universal Top Navigation Bar with Search
│   │   ├── NotelyLandingHome.jsx         # Exact Landing Home Page with 3D Action Cards
│   │   ├── PdfNotesPage.jsx              # PDF Notes Explorer with In-Browser Reader
│   │   ├── MindMapExplorerPage.jsx       # MindMap Explorer with Matching Sidebar Layout
│   │   ├── TopicDetailPage.jsx           # Interactive MindMap Canvas View
│   │   ├── TopicSelectionPage.jsx        # Category Topic Grid
│   │   ├── CategorySelectionPage.jsx     # Legacy Category Explorer
│   │   ├── BlockCard.jsx                 # Node Block Card Renderer
│   │   ├── CodeBlock.jsx                 # Syntax Highlighter & Copy Button
│   │   ├── InfoModals.jsx                # About & Contact Interactive Modals
│   │   ├── Logo.jsx                      # Note.ly Logo
│   │   └── admin/                        # Admin Dashboard & Analytics Tabs
│   ├── data/
│   │   ├── pdfNotesData.js               # Dynamic PDF Content Scanner & Metadata
│   │   ├── mindmapData.js                # Mindmap Aggregator (24 Topics)
│   │   ├── asyncData.js                  # Category 01 Data
│   │   ├── coreModulesData.js            # Category 02 Data
│   │   ├── expressData.js                # Category 03 Data
│   │   ├── mongodbData.js                # Category 04 Data
│   │   └── authenticationAuthorizationData.js # Category 05 Data
│   ├── pdfContent/
│   │   └── High Level System Design/     # Real PDF Storage Directory
│   │       ├── 01-System Design - Monolith and Microservices.pdf
│   │       └── 02-System Design - API Gateway and Load Balancers.pdf
│   ├── utils/
│   │   └── analytics.js                  # Client Event Tracker Utility
│   ├── App.jsx                           # Hash Router & State Controller
│   ├── main.jsx                          # React Entry Point
│   └── index.css                         # Tailwind CSS & Global Styles
├── public/
│   ├── pdfContent/                       # Static Assets Mirror for Direct URL Access
│   └── favicon.svg
├── vercel.json                           # Vercel Serverless Rewrites & Routing
├── package.json
└── README.md
```

---

<p align="center">
  Designed & Built with ❤️ for Developers • <b>Note.ly</b>
</p>
