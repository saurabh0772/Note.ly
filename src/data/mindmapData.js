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
    }
  ],
  root: {
    id: 'root',
    title: 'Node.js, Express & MongoDB Stack Architecture',
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
      'Relationships, Transactions & Best Practices'
    ]
  },
  sections: [
    // Category 1: Async Fundamentals
    {
      id: 'sec-1',
      category: 'async',
      number: '1',
      title: 'Callbacks & Callback Hell',
      color: 'red',
      borderColor: 'border-red-300',
      bgColor: 'bg-red-50/70',
      textColor: 'text-red-700',
      headerBg: 'bg-pink-100/50',
      description: 'A callback is a function passed as an argument to another function, executed after an operation completes.',
      badge: 'Node style:\nfunction(err, data) {}',
      cards: [
        {
          id: '1-A',
          letter: 'A',
          title: 'What is a Callback?',
          bullets: [
            'Function passed as an argument.',
            'Executed after async operation completes (success or error).'
          ]
        },
        {
          id: '1-B',
          letter: 'B',
          title: 'Example (Simple Callback)',
          code: `const fs = require('fs');\nfs.readFile('hello.txt', 'utf8', function(err, data) {\n  if (err) return console.error(err);\n  console.log(data);\n});`,
          flow: {
            title: 'Flow',
            steps: [
              'readFile() starts',
              'File read completes',
              'Callback is executed'
            ]
          }
        },
        {
          id: '1-C',
          letter: 'C',
          title: 'Callback Hell (Pyramid of Doom)',
          subtitle: 'Multiple nested callbacks → code becomes hard to read, maintain and handle errors.',
          code: `fs.readFile('a.txt', 'utf8', (err, dataA) => {\n  if(err) return console.error(err);\n  fs.readFile('b.txt', 'utf8', (err, dataB) => {\n    if(err) return console.error(err);\n    fs.readFile('c.txt', 'utf8', (err, dataC) => {\n      if(err) return console.error(err);\n      console.log(dataC);\n    });\n  });\n});`,
          problems: {
            title: 'Problems',
            bullets: [
              'Deep nesting (hard to read)',
              'Error handling is messy',
              'Not scalable',
              'Hard to maintain and debug'
            ]
          }
        },
        {
          id: '1-D',
          letter: 'D',
          title: 'Characteristics',
          bullets: [
            'Callbacks follow Node style (err, data)',
            'Non-blocking',
            'Inversion of Control',
            'Single execution (unless called multiple times)'
          ]
        },
        {
          id: '1-E',
          letter: 'E',
          title: 'Use Cases',
          bullets: [
            'Simple async operations',
            'Working with older Node.js APIs',
            'Custom async flows'
          ]
        },
        {
          id: '1-F',
          letter: 'F',
          title: 'Advantages / Disadvantages',
          advantages: [
            'Simple concept',
            'Widely supported',
            'No extra syntax'
          ],
          disadvantages: [
            'Callback hell',
            'Poor error handling',
            'Hard to manage flow'
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      category: 'async',
      number: '2',
      title: 'Promises & Async/Await',
      color: 'blue',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50/70',
      textColor: 'text-blue-700',
      headerBg: 'bg-blue-100/50',
      description: 'Promises are better way to handle async code. Async/Await is syntactic sugar over Promises.',
      cards: [
        {
          id: '2-A',
          letter: 'A',
          title: 'What is a Promise?',
          bullets: [
            'Object representing eventual completion (or failure) of an async operation.',
            'Has 3 states: Pending, Fulfilled, Rejected.'
          ]
        },
        {
          id: '2-B',
          letter: 'B',
          title: 'Promise Syntax',
          code: `const promise = new Promise((resolve, reject) => {\n  // async operation\n  if (/* success */) resolve(data);\n  else reject(error);\n});`,
          states: {
            title: 'States',
            bullets: [
              'Pending (initial)',
              'Fulfilled (resolve)',
              'Rejected (reject)'
            ]
          }
        },
        {
          id: '2-C',
          letter: 'C',
          title: 'Consuming Promises',
          code: `promise\n  .then(data => console.log(data))   // success\n  .catch(err => console.log(err))    // error\n  .finally(() => console.log('Done')); // always`
        },
        {
          id: '2-D',
          letter: 'D',
          title: 'Example (fs.promises)',
          code: `const fs = require('fs').promises;\nfs.readFile('hello.txt', 'utf8')\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`
        },
        {
          id: '2-E',
          letter: 'E',
          title: 'Async/Await',
          code: `async function read() {\n  try {\n    const data = await fs.readFile('hello.txt', 'utf8');\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n}\nread();`,
          keyPoints: {
            title: 'Key Points',
            bullets: [
              'async makes function return a Promise.',
              'await pauses execution until Promise settles.',
              'Must use await inside async function.'
            ]
          }
        },
        {
          id: '2-F',
          letter: 'F',
          title: 'Error Handling',
          bulletsWithSyntax: [
            { label: 'With Promises', detail: '.catch()' },
            { label: 'With Async/Await', detail: 'try...catch' }
          ]
        },
        {
          id: '2-G',
          letter: 'G',
          title: 'Advantages / Disadvantages',
          advantages: [
            'Cleaner code',
            'Better error handling',
            'Easier to read & maintain',
            'Avoids callback hell'
          ],
          disadvantages: [
            'Slightly more to learn',
            'Async/Await (syntactic sugar) still based on Promises'
          ]
        },
        {
          id: '2-H',
          letter: 'H',
          title: 'Use Cases',
          bullets: [
            'Modern Node.js apps',
            'I/O operations (fs, http, db)',
            'APIs (REST calls)',
            'Complex async flows'
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      category: 'async',
      number: '3',
      title: 'Event Emitter',
      color: 'green',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-emerald-50/70',
      textColor: 'text-emerald-700',
      headerBg: 'bg-emerald-100/50',
      description: 'A core Node.js module that helps in building Event-driven applications.',
      badge: "const EventEmitter =\nrequire('events');",
      cards: [
        {
          id: '3-A',
          letter: 'A',
          title: 'What is Event Emitter?',
          bullets: [
            'Allows objects to emit named events.',
            'Other objects can listen and react to those events.'
          ]
        },
        {
          id: '3-B',
          letter: 'B',
          title: 'Basic Example',
          code: `const EventEmitter = require('events');\nconst emitter = new EventEmitter();\n\n// Listen\nemitter.on('greet', (name) => {\n  console.log('Hello ' + name);\n});\n\n// Emit\nemitter.emit('greet', 'Saurabh'); // Hello Saurabh`
        },
        {
          id: '3-C',
          letter: 'C',
          title: 'Core Methods',
          methods: [
            { name: 'emitter.on(event, listener)', desc: 'Register listener (multiple allowed)' },
            { name: 'emitter.once(event, listener)', desc: 'Register listener (fires only once)' },
            { name: 'emitter.emit(event, ...args)', desc: 'Trigger event & pass arguments' },
            { name: 'emitter.off(event, listener)', desc: 'Remove specific listener (alias of removeListener)' },
            { name: 'emitter.removeAllListeners(event)', desc: 'Remove all listeners' },
            { name: 'emitter.listenerCount(event)', desc: 'Get number of listeners' },
            { name: 'emitter.eventNames()', desc: 'Get all event names' }
          ]
        },
        {
          id: '3-D',
          letter: 'D',
          title: 'Built-in Events (on EventEmitter instance)',
          methods: [
            { name: "'newListener' (event, listener)", desc: 'When a new listener is added' },
            { name: "'removeListener' (event, listener)", desc: 'When a listener is removed' },
            { name: "'error' (err)", desc: 'If emitted and not handled → crashes app' }
          ]
        },
        {
          id: '3-E',
          letter: 'E',
          title: 'Example (Practical)',
          code: `const EventEmitter = require('events');\nconst emitter = new EventEmitter();\n\nemitter.on('start', () => console.log('Start 1'));\nemitter.on('start', () => console.log('Start 2'));\n\n// once listener\nemitter.once('start', () => console.log('Only once'));\n\nemitter.emit('start');\nemitter.emit('start');\n\n/* Output:\nStart 1\nStart 2\nOnly once\nStart 1\nStart 2\n*/`
        },
        {
          id: '3-F',
          letter: 'F',
          title: 'Use Cases',
          bullets: [
            'Building event-driven architecture',
            'Real-time applications (chat, notifications)',
            'Streams (under the hood)',
            'Handling custom events'
          ]
        },
        {
          id: '3-G',
          letter: 'G',
          title: 'Advantages / Disadvantages',
          advantages: [
            'Lightweight',
            'Built-in module',
            'Great for event-driven apps',
            'Highly flexible'
          ],
          disadvantages: [
            'Can become messy if too many events/listeners',
            'Need to manage memory leaks (remove unused listeners)'
          ]
        },
        {
          id: '3-H',
          letter: 'H',
          title: 'Note',
          note: 'EventEmitter is the base for many Node.js core modules:\nhttp, fs, net, stream, process, etc.'
        }
      ]
    },

    // Category 2: Core Modules
    {
      id: 'sec-4',
      category: 'modules',
      number: '4',
      title: 'Path Module',
      color: 'green',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-emerald-50/70',
      textColor: 'text-emerald-700',
      headerBg: 'bg-emerald-100/50',
      description: 'Work with file and directory paths. Provides utilities to normalize and resolve paths across platforms.',
      badge: "const path = require('path');",
      cards: [
        {
          id: '4-A',
          letter: 'A',
          title: 'What it does',
          bullets: [
            'Provides utilities to work with file and directory paths in a cross-platform way.'
          ]
        },
        {
          id: '4-B',
          letter: 'B',
          title: 'Why use it?',
          bullets: [
            'Handling paths manually is error-prone (Windows vs Linux).',
            'Path module normalizes and resolves paths automatically.'
          ]
        },
        {
          id: '4-C',
          letter: 'C',
          title: 'Important Properties',
          methods: [
            { name: 'path.sep', desc: "Platform-specific path separator ('\\' in Win, '/' in Linux/Mac)" },
            { name: 'path.delimiter', desc: "Delimiter for PATH environment variable (';' in Win, ':' in Linux/Mac)" },
            { name: 'path.extname(p)', desc: 'Returns extension of the file' },
            { name: 'path.basename(p)', desc: 'Returns last portion of path' },
            { name: 'path.dirname(p)', desc: 'Returns directory name of path' },
            { name: 'path.parse(p)', desc: 'Returns an object with root, dir, base, ext, name' },
            { name: 'path.format(obj)', desc: 'Converts an object to path string' }
          ]
        },
        {
          id: '4-D',
          letter: 'D',
          title: 'Common Methods',
          methods: [
            { name: 'path.join([...paths])', desc: 'Joins all given path segments using the platform separator' },
            { name: 'path.resolve([...paths])', desc: 'Resolves to an absolute path' },
            { name: 'path.normalize(p)', desc: 'Normalize the path (remove redundant .. and .)' },
            { name: 'path.isAbsolute(p)', desc: 'Checks if the path is absolute' },
            { name: 'path.relative(from, to)', desc: "Returns the relative path from 'from' to 'to'" },
            { name: 'path.parse(p)', desc: 'Returns object { root, dir, base, ext, name }' }
          ]
        },
        {
          id: '4-E',
          letter: 'E',
          title: 'Examples',
          code: `const path = require('path');\n\nconsole.log(path.sep); // '\\' (Windows)\n\nconsole.log(path.join('folder', 'sub', 'file.txt'));\n// folder\\sub\\file.txt (win)\n\nconsole.log(path.resolve('folder', 'sub', '..', 'abc.txt'));\n// absolute path\n\nconsole.log(path.extname('index.html')); // .html\nconsole.log(path.basename('/a/b/c.txt')); // c.txt\nconsole.log(path.dirname('/a/b/c.txt')); // /a/b\n\nconsole.log(path.parse('/a/b/c.txt'));\n// { root: '/', dir: '/a/b', base: 'c.txt', ext: '.txt', name: 'c' }`
        },
        {
          id: '4-F',
          letter: 'F',
          title: 'Use Cases',
          bullets: [
            'Building file paths',
            'Getting file extension',
            'Validating paths',
            'Cross-platform compatibility'
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      category: 'modules',
      number: '5',
      title: 'File System (fs) Module',
      color: 'blue',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50/70',
      textColor: 'text-blue-700',
      headerBg: 'bg-blue-100/50',
      description: 'Interact with the file system (read, write, delete, create directories, etc.).',
      badge: "const fs = require('fs');",
      cards: [
        {
          id: '5-A',
          letter: 'A',
          title: 'What it does',
          bullets: [
            'Allows you to create, read, update, delete files and folders on the file system.'
          ]
        },
        {
          id: '5-B',
          letter: 'B',
          title: 'Types of APIs',
          bulletsWithSyntax: [
            { label: '1. Synchronous (blocking)', detail: 'e.g. fs.readFileSync()' },
            { label: '2. Asynchronous (non-blocking)', detail: 'e.g. fs.readFile() with callback / promises' }
          ]
        },
        {
          id: '5-C',
          letter: 'C',
          title: 'Common Methods',
          methods: [
            { name: 'fs.readFile(path, enc, cb)', desc: 'Read file (async)' },
            { name: 'fs.readFileSync(path, enc)', desc: 'Read file (sync)' },
            { name: 'fs.writeFile(path, data, cb)', desc: 'Write to file (overwrites if exists)' },
            { name: 'fs.writeFileSync(path, data)', desc: 'Write to file synchronously' },
            { name: 'fs.appendFile(path, data, cb)', desc: 'Append data to file' },
            { name: 'fs.unlink(path, cb)', desc: 'Delete file' },
            { name: 'fs.mkdir(path, cb)', desc: 'Create directory' },
            { name: 'fs.rmdir(path, cb)', desc: 'Remove directory (empty)' },
            { name: 'fs.readdir(path, cb)', desc: 'Read contents of directory' },
            { name: 'fs.stat(path, cb)', desc: 'Get file/folder information' }
          ],
          note: '• Always handle errors.\n• Prefer async (non-blocking) in production apps.\n• Use promises version (fs.promises) or async/await for cleaner code.'
        },
        {
          id: '5-D',
          letter: 'D',
          title: 'Examples (Async)',
          code: `const fs = require('fs');\n\n// Read file\nfs.readFile('hello.txt', 'utf8', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\n\n// Write file\nfs.writeFile('hello.txt', 'hello Node.js!', (err) => {\n  if (err) throw err;\n  console.log('File written!');\n});\n\n// Append\nfs.appendFile('hello.txt', '\\nThis is appended.', () => {\n  console.log('Appended!');\n});`
        },
        {
          id: '5-E',
          letter: 'E',
          title: 'Examples (Sync)',
          code: `const fs = require('fs');\n\nconst data = fs.readFileSync('hello.txt', 'utf8');\nconsole.log(data);\n\nfs.writeFileSync('a.txt', 'Sync write');\nfs.mkdirSync('myFolder');`
        },
        {
          id: '5-F',
          letter: 'F',
          title: 'Use Cases',
          bullets: [
            'Reading config files',
            'Writing logs',
            'Uploading files',
            'Managing folders / files',
            'Working with JSON, CSV, etc.'
          ]
        }
      ]
    },
    {
      id: 'sec-6',
      category: 'modules',
      number: '6',
      title: 'HTTP Module',
      color: 'purple',
      borderColor: 'border-purple-300',
      bgColor: 'bg-purple-50/70',
      textColor: 'text-purple-700',
      headerBg: 'bg-purple-100/50',
      description: 'Create HTTP web servers and make HTTP client requests in Node.js.',
      badge: "const http = require('http');",
      cards: [
        {
          id: '6-A',
          letter: 'A',
          title: 'What it does',
          bullets: [
            'Helps to create web servers and handle HTTP requests and responses.'
          ]
        },
        {
          id: '6-B',
          letter: 'B',
          title: 'Create an HTTP Server',
          code: `const http = require('http');\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello from Node.js Server');\n});\nserver.listen(3000, () => console.log('Server running on port 3000'));`
        },
        {
          id: '6-C',
          letter: 'C',
          title: 'Request (req) Object',
          methods: [
            { name: 'req.url', desc: 'URL of the request' },
            { name: 'req.method', desc: 'GET, POST, PUT, DELETE, etc.' },
            { name: 'req.headers', desc: 'Headers sent by client' },
            { name: "req.on('data')", desc: 'For reading request body' }
          ]
        },
        {
          id: '6-D',
          letter: 'D',
          title: 'Response (res) Object',
          methods: [
            { name: 'res.writeHead(statusCode, headers)', desc: 'Set status & headers' },
            { name: 'res.write(data)', desc: 'Write data in chunks' },
            { name: 'res.end(data)', desc: 'End response' }
          ]
        },
        {
          id: '6-E',
          letter: 'E',
          title: 'Making HTTP Requests (Client)',
          code: `const http = require('http');\nconst options = {\n  hostname: 'localhost',\n  port: 3000,\n  path: '/',\n  method: 'GET'\n};\n\nconst req = http.request(options, (res) => {\n  let data = '';\n  res.on('data', chunk => data += chunk);\n  res.on('end', () => console.log(data));\n});\n\nreq.on('error', err => console.error(err));\nreq.end();`
        },
        {
          id: '6-F',
          letter: 'F',
          title: 'Use Cases',
          bullets: [
            'Build custom web servers',
            'REST APIs',
            'Proxies',
            'Handling low-level HTTP',
            'Learning how web works under the hood'
          ],
          note: '• For real projects, use Express.js (built on top of http).\n• http module is great for learning and small applications.'
        }
      ]
    },

    // Category 3: Express.js Web Framework
    {
      id: 'sec-7',
      category: 'express',
      number: '7',
      title: 'What is Express.js & Setup',
      color: 'green',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-emerald-50/70',
      textColor: 'text-emerald-700',
      headerBg: 'bg-emerald-100/50',
      description: 'Fast, unopinionated, minimalist web framework for Node.js built on top of HTTP module.',
      badge: 'npm install express',
      cards: [
        {
          id: '7-A',
          letter: 'A',
          title: '1. What is Express.js?',
          bullets: [
            'Web framework for Node.js.',
            'Built on top of the core HTTP module.',
            'Simplifies routing, middleware, and handling HTTP requests/responses.',
            'Minimal and flexible with a large middleware ecosystem.'
          ]
        },
        {
          id: '7-B',
          letter: 'B',
          title: '2. Installation & Basic Server',
          code: `// Install\n// npm init -y\n// npm install express\n\nconst express = require('express');\nconst app = express();\nconst PORT = 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello from Express!');\n});\n\napp.listen(PORT, () => {\n  console.log(\`Server running on http://localhost:\${PORT}\`);\n});`,
          note: 'express() returns an application object (app).'
        }
      ]
    },
    {
      id: 'sec-8',
      category: 'express',
      number: '8',
      title: 'Express Request & Response Objects',
      color: 'purple',
      borderColor: 'border-purple-300',
      bgColor: 'bg-purple-50/70',
      textColor: 'text-purple-700',
      headerBg: 'bg-purple-100/50',
      description: 'Comprehensive API reference for Express Request (req) and Response (res) objects.',
      badge: "app.get('/user/:id', (req, res) => ...)",
      cards: [
        {
          id: '8-A',
          letter: 'A',
          title: 'Request (req) Properties',
          methods: [
            { name: 'req.params', desc: 'Route parameters (e.g. /user/:id)' },
            { name: 'req.query', desc: 'Query parameters (e.g. ?search=express)' },
            { name: 'req.body', desc: 'Parsed request body payload' },
            { name: 'req.headers', desc: 'Request HTTP headers' },
            { name: 'req.cookies', desc: 'Cookies sent by client' },
            { name: 'req.method', desc: 'HTTP method (GET, POST, etc.)' },
            { name: 'req.path', desc: 'Request URL path' },
            { name: 'req.ip', desc: 'Client IP address' }
          ]
        },
        {
          id: '8-B',
          letter: 'B',
          title: 'Response (res) Methods',
          methods: [
            { name: 'res.send()', desc: 'Send text/HTML response' },
            { name: 'res.json()', desc: 'Send JSON response' },
            { name: 'res.status()', desc: 'Set HTTP status code (200, 404, 500)' },
            { name: 'res.end()', desc: 'End response without data' },
            { name: 'res.sendFile()', desc: 'Send file attachment / stream' },
            { name: 'res.redirect()', desc: 'Redirect request to URL' },
            { name: 'res.cookie()', desc: 'Set cookie' },
            { name: 'res.clearCookie()', desc: 'Clear cookie' },
            { name: 'res.set()', desc: 'Set response header' }
          ]
        },
        {
          id: '8-C',
          letter: 'C',
          title: 'Example Usage',
          code: `app.get('/user/:id', (req, res) => {\n  const id = req.params.id;\n  res.json({ id });\n});`
        }
      ]
    },
    {
      id: 'sec-9',
      category: 'express',
      number: '9',
      title: 'Routing & Routers in Express',
      color: 'orange',
      borderColor: 'border-amber-300',
      bgColor: 'bg-amber-50/70',
      textColor: 'text-amber-800',
      headerBg: 'bg-amber-100/50',
      description: 'Define routes, handle HTTP methods, parameters, and break routes into modular router files.',
      badge: 'const router = express.Router();',
      cards: [
        {
          id: '9-A',
          letter: 'A',
          title: 'HTTP Methods',
          methods: [
            { name: 'app.get(path, handler)', desc: 'Handle GET requests' },
            { name: 'app.post(path, handler)', desc: 'Handle POST requests' },
            { name: 'app.put(path, handler)', desc: 'Handle PUT requests' },
            { name: 'app.patch(path, handler)', desc: 'Handle PATCH requests' },
            { name: 'app.delete(path, handler)', desc: 'Handle DELETE requests' },
            { name: 'app.all(path, handler)', desc: 'Handle all HTTP methods' },
            { name: 'app.use(path, handler)', desc: 'Mount middleware or router' }
          ]
        },
        {
          id: '9-B',
          letter: 'B',
          title: 'Route & Query Parameters Example',
          code: `// Route Parameters\napp.get('/user/:id', (req, res) => {\n  res.send('User ID: ' + req.params.id);\n});\n\n// Query Parameters\napp.get('/search', (req, res) => {\n  const q = req.query.q; // /search?q=express\n  res.send('Search: ' + q);\n});\n\n// Route Handler Example\napp.post('/login', (req, res) => {\n  res.json({ message: 'Logged in' });\n});`
        },
        {
          id: '9-C',
          letter: 'C',
          title: 'Routers (Modular Routes)',
          subtitle: 'Break routes into separate files for clean architecture.',
          code: `// userRoutes.js\nconst express = require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => res.send('Users'));\nrouter.post('/', (req, res) => res.send('Create User'));\nmodule.exports = router;\n\n// app.js\nconst userRoutes = require('./routes/userRoutes');\napp.use('/users', userRoutes);`,
          advantages: [
            'Organized',
            'Scalable',
            'Maintainable',
            'Reusable'
          ]
        }
      ]
    },
    {
      id: 'sec-10',
      category: 'express',
      number: '10',
      title: 'Middleware & Built-in Middleware',
      color: 'blue',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50/70',
      textColor: 'text-blue-700',
      headerBg: 'bg-blue-100/50',
      description: 'Functions that have access to req, res, and next() in the request-response cycle.',
      badge: 'app.use((req, res, next) => next())',
      cards: [
        {
          id: '10-A',
          letter: 'A',
          title: 'Middleware Fundamentals & Flow',
          bullets: [
            'Functions that have access to req, res, and next() in request-response cycle.',
            'Must call next() to pass control to the next middleware.'
          ],
          flow: {
            title: 'Middleware Flow',
            steps: [
              'Request',
              'Middleware 1 → Middleware 2',
              'Route Handler',
              'Response'
            ]
          }
        },
        {
          id: '10-B',
          letter: 'B',
          title: 'Types of Middleware',
          bullets: [
            'Application-level middleware (app.use)',
            'Router-level middleware (router.use)',
            'Built-in middleware (express.json, express.static)',
            'Third-party middleware (morgan, cors, helmet)',
            'Error-handling middleware (4 arguments)'
          ]
        },
        {
          id: '10-C',
          letter: 'C',
          title: 'Application & Router Level Middleware Code',
          code: `// Application-level\napp.use((req, res, next) => {\n  console.log('Request Time:', Date.now());\n  next(); // pass to next middleware\n});\n\n// Router-level\nconst router = express.Router();\nrouter.use((req, res, next) => {\n  console.log('Router middleware');\n  next();\n});`
        },
        {
          id: '10-D',
          letter: 'D',
          title: 'Built-in Middleware',
          methods: [
            { name: 'express.json()', desc: 'Parses incoming JSON payloads (app.use(express.json());)' },
            { name: 'express.urlencoded()', desc: 'Parses URL-encoded data ({ extended: true })' },
            { name: 'express.static()', desc: "Serves static files CSS/JS/images ('public')" },
            { name: 'express.text()', desc: 'Parses incoming text' },
            { name: 'express.raw()', desc: 'Parses incoming raw body' }
          ]
        },
        {
          id: '10-E',
          letter: 'E',
          title: 'Third-party Middleware (Popular)',
          methods: [
            { name: 'morgan', desc: 'Logging requests' },
            { name: 'cors', desc: 'Enable CORS' },
            { name: 'helmet', desc: 'Security headers' },
            { name: 'cookie-parser', desc: 'Parse cookies' },
            { name: 'body-parser', desc: '(Deprecated) use express.json()' },
            { name: 'compression', desc: 'Compress response' },
            { name: 'express-rate-limit', desc: 'Rate limiting' }
          ],
          code: `const morgan = require('morgan');\nconst cors = require('cors');\n\napp.use(morgan('dev'));\napp.use(cors());`
        }
      ]
    },
    {
      id: 'sec-11',
      category: 'express',
      number: '11',
      title: 'Error Handling in Express',
      color: 'red',
      borderColor: 'border-red-300',
      bgColor: 'bg-red-50/70',
      textColor: 'text-red-700',
      headerBg: 'bg-pink-100/50',
      description: 'Default error handling, custom error middleware, and async error handling in Express.',
      badge: 'app.use((err, req, res, next) => ...)',
      cards: [
        {
          id: '11-A',
          letter: 'A',
          title: 'Default & Custom Error Handling',
          bullets: [
            'Default: Express handles errors and sends stack trace in development.',
            'Custom: Define error middleware at the end of middleware stack.'
          ],
          code: `// Custom Error-handling Middleware\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({\n    message: err.message || 'Internal Server Error'\n  });\n});`
        },
        {
          id: '11-B',
          letter: 'B',
          title: 'Async Error Handling',
          bullets: [
            'Use try-catch blocks or use wrapper helper (express-async-handler).'
          ],
          code: `const asyncHandler = require('express-async-handler');\n\napp.get('/data', asyncHandler(async (req, res) => {\n  const data = await asyncTask();\n  res.json(data);\n}));`,
          note: 'Error-handling middleware MUST have 4 arguments:\n(err, req, res, next)'
        }
      ]
    },
    {
      id: 'sec-12',
      category: 'express',
      number: '12',
      title: 'Templates, Lifecycle & Best Practices',
      color: 'teal',
      borderColor: 'border-teal-300',
      bgColor: 'bg-teal-50/70',
      textColor: 'text-teal-700',
      headerBg: 'bg-teal-100/50',
      description: 'View engines, request lifecycle, application settings, and production best practices.',
      badge: "app.set('view engine', 'ejs');",
      cards: [
        {
          id: '12-A',
          letter: 'A',
          title: 'Templates / View Engine',
          subtitle: 'Render dynamic HTML pages.',
          bullets: [
            'Popular Engines: EJS, Pug (Jade), Handlebars, Mustache'
          ],
          code: `app.set('view engine', 'ejs');\napp.set('views', './views');\n\napp.get('/', (req, res) => {\n  res.render('index', {\n    title: 'Express App',\n    name: 'Saurabh'\n  });\n});`
        },
        {
          id: '12-B',
          letter: 'B',
          title: 'Other Important Features',
          methods: [
            { name: 'app.listen()', desc: "Start server (app.listen(3000, () => console.log('Server running')));" },
            { name: 'app.set() / app.get()', desc: "Set or get application settings (app.set('port', 3000));" },
            { name: 'req.app', desc: "Access the app instance (const port = req.app.get('port'));" },
            { name: 'res.locals', desc: "Pass local variables to templates (res.locals.siteName = 'My Site');" }
          ]
        },
        {
          id: '12-C',
          letter: 'C',
          title: 'Best Practices Checklist',
          advantages: [
            'Keep routes modular (use routers)',
            'Use middleware wisely',
            'Handle errors properly',
            'Use environment variables (dotenv)',
            'Validate input',
            'Use helmet for security',
            'Log requests in production',
            'Keep your code clean & maintainable'
          ]
        },
        {
          id: '12-D',
          letter: 'D',
          title: 'Express Request Lifecycle',
          flow: {
            title: 'Request Lifecycle',
            steps: [
              'Incoming Request',
              'Middleware(s) (app.use) → next()',
              'Router Match',
              'Route Handler (req, res)',
              'Response Sent → End'
            ]
          }
        },
        {
          id: '12-E',
          letter: 'E',
          title: 'Project Structure Example',
          code: `my-app/\n├── routes/\n│   └── userRoutes.js\n├── controllers/\n│   └── userController.js\n├── middlewares/\n│   └── auth.js\n├── views/\n│   └── index.ejs\n├── public/\n│   ├── css/\n│   └── js/\n├── app.js\n└── package.json`
        }
      ]
    },

    // Category 4: MongoDB & Mongoose
    {
      id: 'sec-13',
      category: 'mongodb',
      number: '13',
      title: 'MongoDB Basics & Data Model',
      color: 'green',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-emerald-50/70',
      textColor: 'text-emerald-700',
      headerBg: 'bg-emerald-100/50',
      description: 'MongoDB is a NoSQL, document-oriented database storing data in flexible, JSON-like documents (BSON).',
      badge: 'ObjectId("662d...")',
      cards: [
        {
          id: '13-A',
          letter: 'A',
          title: 'What is MongoDB & Key Concepts',
          bullets: [
            'Database → Container for collections',
            'Collection → Group of documents',
            'Document → JSON-like data',
            'Field → Key-value pair in a document',
            '_id → Unique identifier for each document (ObjectId by default)'
          ],
          advantages: [
            'Schema-less (flexible)',
            'High performance',
            'Scalable',
            'Replication & High availability',
            'Rich query language',
            'Indexing',
            'Aggregation framework'
          ]
        },
        {
          id: '13-B',
          letter: 'B',
          title: 'MongoDB Data Model & BSON Data Types',
          subtitle: 'Example Document (BSON)',
          code: `{\n  "_id": ObjectId("662d..."),\n  "name": "Saurabh",\n  "email": "saurabh@example.com",\n  "age": 21,\n  "skills": ["Node.js", "MongoDB"],\n  "address": { "city": "Delhi", "pin": 11001 },\n  "createdAt": ISODate("2024-05-20T10:00:00Z")\n}`,
          bullets: [
            'String, Number, Boolean',
            'Array, Object, Null',
            'Date, ObjectId, Binary, etc.'
          ]
        }
      ]
    },
    {
      id: 'sec-14',
      category: 'mongodb',
      number: '14',
      title: 'MongoDB CRUD & Query Operators',
      color: 'orange',
      borderColor: 'border-amber-300',
      bgColor: 'bg-amber-50/70',
      textColor: 'text-amber-800',
      headerBg: 'bg-amber-100/50',
      description: 'Native MongoDB shell CRUD methods and flexible query operator syntax.',
      badge: 'db.users.find({ age: { $gte: 18 } })',
      cards: [
        {
          id: '14-A',
          letter: 'A',
          title: 'MongoDB CRUD Operations',
          code: `// Create\ndb.users.insertOne({ name: "John", age: 20 });\ndb.users.insertMany([{ name: "A" }, { name: "B" }]);\n\n// Read\ndb.users.find();\ndb.users.find({ age: { $gt: 18 } });\ndb.users.findOne({ email: "a@b.com" });\n\n// Update\ndb.users.updateOne({ _id: id }, { $set: { age: 21 } });\ndb.users.updateMany({ age: { $lt: 18 } }, { $set: { status: "minor" } });\n\n// Delete\ndb.users.deleteOne({ _id: id });\ndb.users.deleteMany({ age: { $lt: 18 } });`
        },
        {
          id: '14-B',
          letter: 'B',
          title: 'Query Operators Syntax',
          methods: [
            { name: 'Comparison', desc: '$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin' },
            { name: 'Logical', desc: '$and, $or, $not, $nor' },
            { name: 'Element', desc: '$exists, $type' },
            { name: 'Array', desc: '$all, $elemMatch, $size' },
            { name: 'Evaluation', desc: '$regex, $text' }
          ],
          code: `db.users.find({\n  $and: [\n    { age: { $gte: 18 } },\n    { skills: { $in: ["Node.js", "MongoDB"] } },\n    { name: { $regex: /^S/ } }\n  ]\n});`
        }
      ]
    },
    {
      id: 'sec-15',
      category: 'mongodb',
      number: '15',
      title: 'MongoDB Advanced & Aggregation',
      color: 'purple',
      borderColor: 'border-purple-300',
      bgColor: 'bg-purple-50/70',
      textColor: 'text-purple-700',
      headerBg: 'bg-purple-100/50',
      description: 'Indexing, Aggregation Pipelines ($match, $group, $sort), Projection, and query helpers.',
      badge: 'db.users.aggregate([...])',
      cards: [
        {
          id: '15-A',
          letter: 'A',
          title: 'Indexing & Projections',
          code: `// Create Indexes\ndb.users.createIndex({ email: 1 });\ndb.users.createIndex({ name: "text", skills: "text" });\n\n// Projection\ndb.users.find({}, { name: 1, email: 1, _id: 0 });`
        },
        {
          id: '15-B',
          letter: 'B',
          title: 'Aggregation Pipeline',
          flow: {
            title: 'Pipeline Flow',
            steps: [
              '$match: { age: { $gte: 18 } }',
              '$group: { _id: "$city", count: { $sum: 1 } }',
              '$sort: { count: -1 }'
            ]
          },
          code: `db.users.aggregate([\n  { $match: { age: { $gte: 18 } } },\n  { $group: { _id: "$city", count: { $sum: 1 } } },\n  { $sort: { count: -1 } }\n]);`
        },
        {
          id: '15-C',
          letter: 'C',
          title: 'Modifiers & Counting',
          methods: [
            { name: 'Sort, Limit, Skip', desc: 'db.users.find().sort({ age: -1 }).skip(10).limit(5)' },
            { name: 'Count', desc: 'db.users.countDocuments({ age: { $gt: 18 } })' },
            { name: 'Distinct', desc: 'db.users.distinct("skills")' }
          ]
        }
      ]
    },
    {
      id: 'sec-16',
      category: 'mongodb',
      number: '16',
      title: 'Mongoose Overview, Schema & Model',
      color: 'red',
      borderColor: 'border-red-300',
      bgColor: 'bg-red-50/70',
      textColor: 'text-red-700',
      headerBg: 'bg-pink-100/50',
      description: 'Mongoose is an Object Data Modeling (ODM) library for MongoDB in Node.js.',
      badge: "const User = mongoose.model('User', userSchema);",
      cards: [
        {
          id: '16-A',
          letter: 'A',
          title: 'What is Mongoose ODM?',
          bullets: [
            'Object Data Modeling (ODM) library for MongoDB in Node.js.',
            'Provides schema validation, middleware (hooks), and easy data modeling.'
          ],
          advantages: [
            'Schema-based solution',
            'Model abstraction',
            'Middleware (pre/post hooks)',
            'Validation',
            'Relationships (populate)',
            'Easy queries',
            'Built-in promise support'
          ]
        },
        {
          id: '16-B',
          letter: 'B',
          title: 'Installation & Connection',
          code: `// npm install mongoose\nconst mongoose = require('mongoose');\n\nmongoose.connect('mongodb://127.0.0.1:27017/mydb', {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n})\n.then(() => console.log('MongoDB Connected'))\n.catch(err => console.log(err));`
        },
        {
          id: '16-C',
          letter: 'C',
          title: 'Schema & Model Definition',
          code: `const userSchema = new mongoose.Schema({\n  name: { type: String, required: true, trim: true },\n  email: { type: String, unique: true },\n  age: { type: Number, min: 0 },\n  skills: [String],\n  createdAt: { type: Date, default: Date.now }\n});\n\nconst User = mongoose.model('User', userSchema);`,
          bullets: [
            'Schema Types: String, Number, Boolean, Date, Array, Object, Mixed, Buffer, ObjectId, Decimal128'
          ]
        }
      ]
    },
    {
      id: 'sec-17',
      category: 'mongodb',
      number: '17',
      title: 'Mongoose Ops, Validation & Hooks',
      color: 'blue',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50/70',
      textColor: 'text-blue-700',
      headerBg: 'bg-blue-100/50',
      description: 'Mongoose CRUD operations, built-in & custom validators, pre/post middleware hooks, and virtuals.',
      badge: 'userSchema.pre("save", function(next)...)',
      cards: [
        {
          id: '17-A',
          letter: 'A',
          title: 'Mongoose CRUD Operations',
          code: `// Create\nconst user = new User({ name: "Harry", email: "harry@x.com" });\nawait user.save();\n\n// Read\nawait User.find();\nawait User.find({ age: { $gte: 18 } }).select("name email");\nawait User.findById(id);\n\n// Update\nawait User.updateOne({ _id: id }, { $set: { age: 22 } });\nawait User.findByIdAndUpdate(id, { $set: { age: 22 } }, { new: true });\n\n// Delete\nawait User.deleteOne({ _id: id });\nawait User.findByIdAndDelete(id);`
        },
        {
          id: '17-B',
          letter: 'B',
          title: 'Validation (Built-in & Custom)',
          bullets: [
            'Built-in Validation: required, unique, minlength, maxlength, min, max, enum, match'
          ],
          code: `const userSchema = new mongoose.Schema({\n  age: {\n    type: Number,\n    validate: {\n      validator: function(v) { return v % 2 === 0; },\n      message: props => \`\${props.value} is not even!\` \n    }\n  }\n});`
        },
        {
          id: '17-C',
          letter: 'C',
          title: 'Middleware (Hooks)',
          bullets: [
            'Pre Hooks: pre("save"), pre("find")',
            'Post Hooks: post("save"), post("find")'
          ],
          code: `userSchema.pre('save', function(next) {\n  console.log('Before saving user');\n  next();\n});\n\nuserSchema.post('save', function(doc) {\n  console.log('After saving user:', doc.name);\n});`
        },
        {
          id: '17-D',
          letter: 'D',
          title: 'Virtuals, Methods & Statics',
          code: `// Virtual field (not stored in DB)\nuserSchema.virtual('fullName').get(function() {\n  return this.firstName + ' ' + this.lastName;\n});\n\n// Instance Method\nuserSchema.methods.greet = function() {\n  return \`Hello \${this.name}\`;\n};\n\n// Static Method\nuserSchema.statics.findByEmail = function(email) {\n  return this.findOne({ email });\n};`
        }
      ]
    },
    {
      id: 'sec-18',
      category: 'mongodb',
      number: '18',
      title: 'Relationships, Transactions & Best Practices',
      color: 'teal',
      borderColor: 'border-teal-300',
      bgColor: 'bg-teal-50/70',
      textColor: 'text-teal-700',
      headerBg: 'bg-teal-100/50',
      description: 'Populate relationships, ACID transactions, performance optimizations (.lean()), and folder structure.',
      badge: 'Post.find().populate("author")',
      cards: [
        {
          id: '18-A',
          letter: 'A',
          title: 'Relationships & Populate',
          code: `// Reference Schema\nconst postSchema = new mongoose.Schema({\n  title: String,\n  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }\n});\n\n// Populate Query\nconst posts = await Post.find().populate('author', 'name email');\n// Replaces author ObjectId with actual user object`
        },
        {
          id: '18-B',
          letter: 'B',
          title: 'Indexing & Transactions (MongoDB 4.0+)',
          code: `// Indexing in Mongoose\nuserSchema.index({ email: 1 });\nuserSchema.index({ name: 'text', skills: 'text' });\n\n// Transactions\nconst session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await User.create([{ name: 'A' }], { session });\n  await Account.updateOne({ _id: id }, { $inc: { balance: -100 } }, { session });\n  await session.commitTransaction();\n} catch (err) {\n  await session.abortTransaction();\n} finally {\n  session.endSession();\n}`
        },
        {
          id: '18-C',
          letter: 'C',
          title: 'Best Practices Checklist',
          advantages: [
            'Handle errors (try/catch)',
            'Use async/await',
            'Validate data',
            'Use indexes for fields you query often',
            'Use .lean() for read-only queries (faster)',
            'Keep schema modular',
            'Use environment variables for connection string',
            'Close connection gracefully',
            'Avoid unbounded data (use pagination)'
          ]
        },
        {
          id: '18-D',
          letter: 'D',
          title: 'Folder Structure & Quick Comparison',
          code: `my-app/\n├── config/\n│   └── db.js            # DB connection\n├── models/\n│   ├── user.model.js\n│   └── post.model.js\n├── controllers/\n├── routes/\n├── middleware/\n├── app.js\n└── .env`,
          disadvantages: [
            'MongoDB (Database) → NoSQL database, stores documents in BSON, query language, runs as server.',
            'Mongoose (ODM) → Works on top of MongoDB, schema & validation, middleware, models & relationships.'
          ]
        }
      ]
    }
  ]
};
