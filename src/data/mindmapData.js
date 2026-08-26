import { asyncSections } from './asyncData.js';
import { coreModulesSections } from './coreModulesData.js';
import { expressSections } from './expressData.js';
import { mongodbSections } from './mongodbData.js';
import { authSections } from './authenticationAuthorizationData.js';

export { asyncSections, coreModulesSections, expressSections, mongodbSections, authSections };

export const mindmapData = {
  categories: [
    {
      id: 'async',
      number: '01',
      title: 'Async Fundamentals',
      subtitle: 'Event Loop & Asynchronous Control Flow',
      description: 'Master Callbacks, Callback Hell, Promise chains, Async/Await patterns, and Event Emitter architecture.',
      color: 'red',
      topicCount: 3,
      tags: ['Callbacks', 'Promises', 'Async/Await', 'EventEmitter']
    },
    {
      id: 'modules',
      number: '02',
      title: 'Core Modules',
      subtitle: 'Built-in Node.js Operating Utilities',
      description: 'Explore Path manipulation, File System (fs) sync/async operations, and HTTP server construction.',
      color: 'green',
      topicCount: 3,
      tags: ['path.join()', 'fs.readFile()', 'http.createServer()']
    },
    {
      id: 'express',
      number: '03',
      title: 'Express.js Framework',
      subtitle: 'Fast & Minimalist Web Framework for Node.js',
      description: 'Routing, middleware pipelines, req/res objects, error handlers, request lifecycle, and best practices.',
      color: 'orange',
      topicCount: 6,
      tags: ['app.use()', 'express.Router()', 'req/res', 'Middleware']
    },
    {
      id: 'mongodb',
      number: '04',
      title: 'MongoDB & Mongoose',
      subtitle: 'NoSQL Document Database & ODM Modeling',
      description: 'Document modeling, BSON data types, CRUD operators, aggregation pipelines, schemas, hooks, and populate.',
      color: 'teal',
      topicCount: 6,
      tags: ['MongoDB BSON', 'Mongoose Schema', 'Populate', 'Transactions']
    },
    {
      id: 'auth',
      number: '05',
      title: 'Authentication & Authorization',
      subtitle: 'Identity Verification, JWTs, Sessions & RBAC',
      description: 'Master Authentication vs Authorization, Session cookies, JWT access & refresh tokens, token rotation, RBAC, and production security flows.',
      color: 'purple',
      topicCount: 6,
      tags: ['JWT', 'Sessions', 'Cookies', 'RBAC', 'Access & Refresh Tokens', 'Password Hashing']
    }
  ],
  root: {
    id: 'root',
    title: 'Node.js, Express, MongoDB & Auth Architecture',
    topics: [
      'Callbacks & Callback Hell',
      'Promises & Async/Await',
      'Event Emitter',
      'Path Module',
      'File System (fs) Module',
      'HTTP Module',
      'Express.js Fundamentals',
      'Express Request & Response Objects',
      'Routing & Routers in Express',
      'Express Middleware & Built-in Middleware',
      'Error Handling in Express',
      'Templates, Lifecycle & Best Practices',
      'MongoDB Basics & Data Model',
      'MongoDB CRUD & Query Operators',
      'MongoDB Advanced Queries & Aggregation',
      'Mongoose Overview, Schema & Model',
      'Mongoose Operations, Validation & Hooks',
      'Relationships, Transactions & Best Practices',
      'Authentication & Authorization Fundamentals',
      'Session-Based Authentication & Cookies',
      'Token-Based Authentication & JWT',
      'Access Tokens, Refresh Tokens & Token Rotation',
      'Authorization, Roles, Permissions & RBAC',
      'Complete Authentication & Authorization System'
    ]
  },
  sections: [
    ...asyncSections,
    ...coreModulesSections,
    ...expressSections,
    ...mongodbSections,
    ...authSections
  ]
};
