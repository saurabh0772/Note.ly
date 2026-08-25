# Note.ly — Interactive Developer Documentation Suite

<p align="center">
  <img src="public/favicon.svg" alt="Note.ly Logo" width="100" height="100" />
</p>

<h3 align="center">
  <b>Note.ly</b>
</h3>

<p align="center">
  A high-fidelity, interactive 3-tier visual documentation platform that turns complex backend architecture infographics into clean, responsive developer mindmaps with live code snippets, copy buttons, and flow diagrams.
</p>

---

## 🌟 Key Features

- **3-Tier Navigation Architecture**:
  - **Stage 1 (Home Landing Page)**: Displays Category Cards only (`Async Fundamentals`, `Core Modules`, `Express.js Framework`, `MongoDB & Mongoose`).
  - **Stage 2 (Category View)**: Displays the grid of mindmap topic cards belonging to the selected category with a `← Back to Categories` button.
  - **Stage 3 (Topic Detail View)**: Displays the multi-column block grid layout with code blocks, API tables, flow diagrams, and pros/cons tables.
- **URL Hash Routing & Browser History**:
  - Full support for browser back/forward buttons and mousepad/touchpad swipe-back gestures (`#/`, `#/category/:id`, `#/topic/:id`).
  - Direct deep linking and bookmarking for all 18 topics.
- **Global & Local Search**:
  - Real-time search engine with keyword highlighting across all 18 topics, code blocks, and methods.
- **1-Click Copy-to-Clipboard**:
  - Custom tokenized syntax highlighting for JavaScript code blocks with one-click copy buttons.
- **Zero Horizontal Overflow**:
  - Built with responsive Tailwind CSS containers (`max-w-7xl`, `overflow-x: hidden`), ensuring zero horizontal scroll across desktop, tablet, and mobile screens.

---

## 📚 Mindmap Inventory (18 Topics across 4 Categories)

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

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Typography**: Inter & Fira Code (Google Fonts)

---

## 🚀 Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd Notes
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📂 Project Structure

```text
Notes/
├── public/
│   └── favicon.svg               # Note.ly SVG Favicon Mark
├── src/
│   ├── components/
│   │   ├── Logo.jsx              # Reusable Note.ly Brand Logo Component
│   │   ├── CategorySelectionPage.jsx # Stage 1 Landing Page (4 Categories)
│   │   ├── TopicSelectionPage.jsx    # Stage 2 Category Topic Grid
│   │   ├── TopicDetailPage.jsx       # Stage 3 Topic Detail View
│   │   ├── BlockCard.jsx         # Card renderer for code, tables & flows
│   │   └── CodeBlock.jsx         # Tokenized Syntax Highlighter & Copy Button
│   ├── data/
│   │   └── mindmapData.js        # Data source for all 18 topics
│   ├── App.jsx                   # Main Router & State Controller
│   ├── main.jsx                  # React Entry Point
│   └── index.css                 # Tailwind CSS & Global Styles
├── index.html                    # HTML Shell & Fonts
├── package.json
├── tailwind.config.js
└── README.md
```

---

<p align="center">
  Designed & Built with ❤️ for Developers • <b>Note.ly</b>
</p>
