export const expressSections = [
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

      description:
        'Express.js is a minimal and flexible web framework for Node.js. It is built around Node.js HTTP capabilities and provides convenient APIs for routing, middleware, request/response handling and building web applications and REST APIs.',

      badge:
        'npm init -y\\nnpm install express\\n\\nconst express = require("express");',

      cards: [
        {
          id: '7-A',
          letter: 'A',
          title: '1. What is Express.js?',

          bullets: [
            'Express.js is a lightweight and flexible web framework for Node.js.',
            'It provides a simpler API for building web servers and HTTP APIs than using the built-in http module directly.',
            'Express is built around Node.js HTTP request and response capabilities.',
            'It provides routing so different URLs and HTTP methods can be handled separately.',
            'It provides middleware support for tasks such as authentication, logging, validation, parsing request bodies and error handling.',
            'Express has a large ecosystem of third-party middleware.',
            'Express is intentionally unopinionated, meaning it does not force a specific project structure or architecture.',
            'It is commonly used to build REST APIs, backend services, server-rendered applications and web servers.'
          ],

          note:
            'Mental model: Node.js gives you the runtime and low-level HTTP capabilities, while Express gives you convenient abstractions such as routing and middleware to build applications faster.'
        },

        {
          id: '7-B',
          letter: 'B',
          title: '2. Installation & Basic Server',

          code: `// Create package.json
// npm init -y

// Install Express
// npm install express

const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(
    \`Server running on http://localhost:\${PORT}\`
  );
});`,

          note:
            'express() creates and returns an Express application object. The app object is used to configure middleware, define routes and start the HTTP server with app.listen().'
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

      description:
        'Express provides req and res objects to every route handler. The req object contains information about the incoming client request, while the res object provides methods for creating and sending the response.',

      badge:
        "app.get('/user/:id', (req, res) => {\\n  // req → incoming request\\n  // res → outgoing response\\n});",

      cards: [
        {
          id: '8-A',
          letter: 'A',
          title: 'Request (req) Properties',

          methods: [
            {
              name: 'req.params',
              desc: 'Contains named route parameters. Example: /user/:id → req.params.id.'
            },
            {
              name: 'req.query',
              desc: 'Contains query-string parameters. Example: /search?keyword=node → req.query.keyword.'
            },
            {
              name: 'req.body',
              desc: 'Contains the parsed request body. Requires appropriate body-parsing middleware such as express.json().'
            },
            {
              name: 'req.headers',
              desc: 'Contains HTTP headers sent by the client, such as authorization, content-type and user-agent.'
            },
            {
              name: 'req.cookies',
              desc: 'Contains cookies parsed from the request when cookie-parsing middleware such as cookie-parser is configured.'
            },
            {
              name: 'req.method',
              desc: 'Returns the HTTP method used by the request, such as GET, POST, PUT, PATCH or DELETE.'
            },
            {
              name: 'req.path',
              desc: 'Returns the path portion of the request URL, excluding the query string.'
            },
            {
              name: 'req.ip',
              desc: 'Returns the remote client IP address as determined by Express. Proxy configuration such as trust proxy affects this value.'
            },
            {
              name: 'req.protocol',
              desc: 'Returns the request protocol such as http or https.'
            },
            {
              name: 'req.originalUrl',
              desc: 'Contains the original request URL before Express router mounting changes the URL context.'
            }
          ],

          note:
            'Important distinction: params → route values, query → URL query values, body → data sent in the request body.'
        },

        {
          id: '8-B',
          letter: 'B',
          title: 'Response (res) Methods',

          methods: [
            {
              name: 'res.send(data)',
              desc: 'Sends a response body. Express automatically handles common data types such as strings, objects and buffers.'
            },
            {
              name: 'res.json(data)',
              desc: 'Sends a JSON response and sets the appropriate content type.'
            },
            {
              name: 'res.status(code)',
              desc: 'Sets the HTTP status code. It can be chained with other response methods, for example res.status(201).json(data).'
            },
            {
              name: 'res.end()',
              desc: 'Ends the response without necessarily sending additional response data. Useful for low-level response handling.'
            },
            {
              name: 'res.sendFile(path)',
              desc: 'Sends a file to the client. Express handles the appropriate response behavior for the file.'
            },
            {
              name: 'res.redirect(url)',
              desc: 'Sends an HTTP redirect response to another URL.'
            },
            {
              name: 'res.cookie(name, value, options)',
              desc: 'Sets a Set-Cookie header so the client can store a cookie.'
            },
            {
              name: 'res.clearCookie(name)',
              desc: 'Clears a cookie by sending an appropriate Set-Cookie header.'
            },
            {
              name: 'res.set(name, value)',
              desc: 'Sets an HTTP response header.'
            },
            {
              name: 'res.location(url)',
              desc: 'Sets the Location response header.'
            }
          ]
        },

        {
          id: '8-C',
          letter: 'C',
          title: 'Example Usage',

          code: `app.get('/user/:id', (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    success: true,
    id: id
  });
});

// Request:
// GET /user/123

// Response:
// {
//   "success": true,
//   "id": "123"
// }`,

          bullets: [
            'The :id part of the route is a route parameter.',
            'Express stores the value inside req.params.id.',
            'Route parameters are strings by default, so numeric values may need conversion.',
            'res.status() sets the HTTP status code.',
            'res.json() sends a JSON response.'
          ]
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

      description:
        'Routing determines how an Express application responds to a particular HTTP method and URL. Express Router allows related routes to be separated into modular files, making larger applications easier to organize and maintain.',

      badge:
        'const router = express.Router();\\n\\napp.use("/users", router);',

      cards: [
        {
          id: '9-A',
          letter: 'A',
          title: 'HTTP Methods',

          methods: [
            {
              name: 'app.get(path, handler)',
              desc: 'Handles GET requests, commonly used for retrieving resources.'
            },
            {
              name: 'app.post(path, handler)',
              desc: 'Handles POST requests, commonly used for creating resources or submitting data.'
            },
            {
              name: 'app.put(path, handler)',
              desc: 'Handles PUT requests, commonly used for replacing an existing resource.'
            },
            {
              name: 'app.patch(path, handler)',
              desc: 'Handles PATCH requests, commonly used for partially updating a resource.'
            },
            {
              name: 'app.delete(path, handler)',
              desc: 'Handles DELETE requests, commonly used for deleting a resource.'
            },
            {
              name: 'app.all(path, handler)',
              desc: 'Matches all HTTP methods for the specified path.'
            },
            {
              name: 'app.use(path, handler)',
              desc: 'Mounts middleware or a router at a specified path. It is not limited to one HTTP method.'
            }
          ],

          note:
            'In REST APIs, routes are commonly organized around resources. Example: GET /users → retrieve users, POST /users → create a user, GET /users/:id → retrieve one user.'
        },

        {
          id: '9-B',
          letter: 'B',
          title: 'Route & Query Parameters Example',

          code: `// Route Parameters
app.get('/user/:id', (req, res) => {
  const id = req.params.id;

  res.send('User ID: ' + id);
});

// Request:
// GET /user/123


// Query Parameters
app.get('/search', (req, res) => {
  const q = req.query.q;

  res.send('Search: ' + q);
});

// Request:
// GET /search?q=express


// POST Route
app.post('/login', (req, res) => {
  res.json({
    message: 'Logged in'
  });
});`,

          bullets: [
            'Route parameters identify a specific resource within the URL.',
            'Query parameters are generally used for filtering, searching, sorting, pagination or optional parameters.',
            'Request body is normally used when sending larger structured data such as JSON.',
            'The HTTP method and URL together determine which route handler should execute.',
            'Route definitions should be designed consistently, especially when building REST APIs.'
          ]
        },

        {
          id: '9-C',
          letter: 'C',
          title: 'Routers (Modular Routes)',

          subtitle:
            'Express Router allows related routes to be grouped into separate files instead of placing every route inside app.js.',

          code: `// routes/userRoutes.js

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users');
});

router.post('/', (req, res) => {
  res.send('Create User');
});

router.get('/:id', (req, res) => {
  res.send('Single User');
});

module.exports = router;


// app.js

const userRoutes =
  require('./routes/userRoutes');

app.use('/users', userRoutes);`,

          advantages: [
            'Organized route structure',
            'Scales better as the application grows',
            'Keeps related routes together',
            'Makes app.js easier to understand',
            'Allows route-level middleware',
            'Makes modules easier to test and maintain'
          ],

          note:
            'Because the router is mounted at /users, router.get("/") becomes GET /users and router.get("/:id") becomes GET /users/:id.'
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

      description:
        'Middleware functions run during the Express request-response lifecycle. They can inspect or modify req and res, execute logic, terminate the response or pass control to another middleware using next().',

      badge:
        'app.use((req, res, next) => {\\n  // middleware logic\\n  next();\\n});',

      cards: [
        {
          id: '10-A',
          letter: 'A',
          title: 'Middleware Fundamentals & Flow',

          bullets: [
            'Middleware is a function that runs between the incoming request and the final response.',
            'Middleware can access req, res and the next function.',
            'Middleware can modify the request or response objects.',
            'Middleware can execute logic such as logging, authentication, validation or parsing.',
            'Calling next() passes control to the next matching middleware or route handler.',
            'Middleware does not always have to call next(); it can terminate the request by sending a response.',
            'If middleware neither sends a response nor calls next(), the request can remain pending.',
            'Middleware executes according to the order in which it is registered.'
          ],

          flow: {
            title: 'Middleware Flow',
            steps: [
              'Incoming Request',
              'Middleware 1',
              'next()',
              'Middleware 2',
              'next()',
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
            'Application-level middleware → registered using app.use() or app.METHOD().',
            'Router-level middleware → registered on an Express Router using router.use() or router.METHOD().',
            'Built-in middleware → provided by Express itself, such as express.json() and express.static().',
            'Third-party middleware → installed from npm, such as cors, morgan and helmet.',
            'Error-handling middleware → special middleware with the signature (err, req, res, next).',
            'Route-level middleware → middleware attached to a specific route before the final handler.',
            'Multiple middleware functions can be chained for the same request.'
          ]
        },

        {
          id: '10-C',
          letter: 'C',
          title: 'Application, Router, Not Found & Error Middleware',

          code: `const express = require('express');

const app = express();
const router = express.Router();


// --------------------------------
// 1. Application-level middleware
// --------------------------------

app.use((req, res, next) => {
  console.log(
    'Request Time:',
    Date.now()
  );

  next();
});


// --------------------------------
// 2. Router-level middleware
// --------------------------------

router.use((req, res, next) => {
  console.log('Router middleware');

  next();
});


// --------------------------------
// 3. Route handler
// --------------------------------

router.get('/profile', (req, res) => {
  res.json({
    message: 'Profile'
  });
});


// Mount router
app.use('/users', router);


// --------------------------------
// 4. Not Found middleware
// --------------------------------

app.use((req, res, next) => {
  const error = new Error(
    \`Route not found: \${req.method} \${req.originalUrl}\`
  );

  error.statusCode = 404;

  next(error);
});


// --------------------------------
// 5. Error-handling middleware
// --------------------------------

app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode =
    err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message:
      err.message ||
      'Internal Server Error'
  });
});


app.listen(3000, () => {
  console.log(
    'Server running on port 3000'
  );
});`,

          bullets: [
            'Application-level middleware is registered with app.use() and can run for requests across the application.',
            'Router-level middleware is registered with router.use() and applies to routes handled by that router.',
            'The router must be mounted using app.use() before its routes become accessible.',
            'Middleware executes in the order in which it is registered.',
            'The route handler sends the response when a matching route is found.',
            'If no route sends a response, execution continues to the next middleware.',
            'A Not Found (404) middleware is normally placed after all valid routes.',
            'The Not Found middleware creates or forwards a 404 error when no route matches the request.',
            'Calling next(error) tells Express that an error has occurred and skips normal middleware.',
            'Error-handling middleware has exactly four parameters: (err, req, res, next).',
            'Error-handling middleware should normally be placed at the very end of the middleware stack.',
            'The error handler can use err.statusCode to return an appropriate HTTP status code.',
            'The error handler should return a consistent response format to API clients.',
            'In production, avoid exposing internal stack traces or sensitive implementation details to clients.'
          ],

          flow: {
            title: 'Complete Middleware Flow',
            steps: [
              'Incoming Request',
              'Application Middleware',
              'Router Middleware',
              'Route Handler',
              'Response',
              'If no route matches → 404 Not Found Middleware',
              'If an error occurs → Error-handling Middleware',
              'Final Error Response'
            ]
          },

          note:
            'Important order: normal middleware → routes → 404 Not Found middleware → Error-handling middleware. The 404 middleware should call next(error) rather than directly sending the response when you want all errors to be handled consistently by the centralized error handler.'
        },

        {
          id: '10-D',
          letter: 'D',
          title: 'Built-in Middleware',

          methods: [
            {
              name: 'express.json()',
              desc: 'Parses incoming requests with JSON payloads and places the parsed object in req.body.'
            },
            {
              name: 'express.urlencoded({ extended: true })',
              desc: 'Parses URL-encoded request bodies, commonly used with HTML forms.'
            },
            {
              name: 'express.static(root)',
              desc: 'Serves static files such as HTML, CSS, JavaScript, images and other assets.'
            },
            {
              name: 'express.text()',
              desc: 'Parses incoming requests containing plain text and places the result in req.body.'
            },
            {
              name: 'express.raw()',
              desc: 'Parses incoming request bodies as Buffer objects. Useful when the raw bytes are required, such as certain webhook integrations.'
            }
          ],

          note:
            'Important: express.json() must be registered before routes that need to access JSON request bodies through req.body.'
        },

        {
          id: '10-E',
          letter: 'E',
          title: 'Third-party Middleware (Popular)',

          methods: [
            {
              name: 'morgan',
              desc: 'HTTP request logger that records information such as method, URL, status and response time.'
            },
            {
              name: 'cors',
              desc: 'Configures Cross-Origin Resource Sharing rules so browsers can make requests between different origins when allowed.'
            },
            {
              name: 'helmet',
              desc: 'Adds and configures security-related HTTP headers to help protect Express applications.'
            },
            {
              name: 'cookie-parser',
              desc: 'Parses Cookie headers and exposes parsed cookies through req.cookies.'
            },
            {
              name: 'compression',
              desc: 'Compresses HTTP responses when the client supports compression, reducing response size.'
            },
            {
              name: 'express-rate-limit',
              desc: 'Limits the number of requests a client can make within a specified time window.'
            }
          ],

          code: `const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

app.use(morgan('dev'));

app.use(cors());

app.use(helmet());`,

          note:
            'Middleware should be added intentionally. The order and configuration of middleware can directly affect security, performance and application behavior.'
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

      description:
        'Express provides a middleware-based mechanism for handling errors. Centralized error-handling middleware allows an application to catch errors, log them and return consistent HTTP responses to clients.',

      badge:
        'app.use((err, req, res, next) => {\\n  // handle error\\n});',

      cards: [
        {
          id: '11-A',
          letter: 'A',
          title: 'Default & Custom Error Handling',

          bullets: [
            'Express has a built-in default error handler.',
            'Custom error-handling middleware can provide consistent API responses and centralized logging.',
            'Error-handling middleware is identified by four parameters: err, req, res and next.',
            'It should generally be registered after normal middleware and routes.',
            'The error object can contain information such as message, stack and status information.',
            'Production APIs should avoid exposing internal stack traces or sensitive implementation details to clients.',
            'Errors should be logged appropriately so developers can diagnose failures.'
          ],

          code: `// Custom Error-handling Middleware

app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode =
    err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      err.message ||
      'Internal Server Error'
  });
});`,

          note:
            'Error middleware should normally be placed after your routes. If an error is passed using next(err), Express skips normal middleware and searches for error-handling middleware.'
        },

        {
          id: '11-B',
          letter: 'B',
          title: 'Async Error Handling',

          bullets: [
            'Errors from asynchronous operations must reach Express error-handling middleware.',
            'With Express 5, rejected Promises returned from async route handlers are automatically forwarded to next().',
            'With older Express versions, developers commonly used try-catch or helper wrappers such as express-async-handler.',
            'try-catch is still useful when you need to handle an error locally before passing it onward.',
            'Centralized error middleware should be responsible for formatting the final API error response.'
          ],

          code: `// Express 5

app.get('/data', async (req, res) => {
  const data = await asyncTask();

  res.json(data);
});

// If asyncTask() rejects,
// Express forwards the error
// to the error-handling middleware.


// Explicit try-catch example

app.get('/data', async (req, res, next) => {
  try {
    const data = await asyncTask();

    res.json(data);
  } catch (err) {
    next(err);
  }
});`,

          note:
            'Error-handling middleware MUST have 4 parameters: (err, req, res, next). Even if next is not used inside the function, keep the four-argument signature so Express recognizes it as error middleware.'
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

      description:
        'Express supports server-side rendering through template engines, application configuration through settings and modular application architecture. Understanding the request lifecycle and following good practices makes Express applications easier to maintain, secure and scale.',

      badge:
        "app.set('view engine', 'ejs');\\n\\napp.get('/', (req, res) => {\\n  res.render('index');\\n});",

      cards: [
        {
          id: '12-A',
          letter: 'A',
          title: 'Templates / View Engine',

          subtitle:
            'A template engine allows the server to generate dynamic HTML using data before sending the page to the browser.',

          bullets: [
            'Popular template engines include EJS, Pug and Handlebars.',
            'A view engine allows templates to contain dynamic values and logic.',
            'res.render() renders a template and sends the generated HTML response.',
            'Template engines are commonly used for server-side rendered applications.',
            'For a pure REST API backend, you usually return JSON instead of rendering templates.'
          ],

          code: `app.set('view engine', 'ejs');

app.set(
  'views',
  './views'
);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Express App',
    name: 'Saurabh'
  });
});`
        },

        {
          id: '12-B',
          letter: 'B',
          title: 'Other Important Features',

          methods: [
            {
              name: 'app.listen(port, callback)',
              desc: 'Starts the HTTP server and listens for incoming connections on the specified port.'
            },
            {
              name: 'app.set(name, value)',
              desc: 'Stores an application setting. Example: app.set("port", 3000).'
            },
            {
              name: 'app.get(name)',
              desc: 'When used with one string argument representing a setting name, retrieves an application setting.'
            },
            {
              name: 'req.app',
              desc: 'Provides access to the Express application instance associated with the request.'
            },
            {
              name: 'res.locals',
              desc: 'Stores response-local variables that are available to templates rendered during that request.'
            },
            {
              name: 'app.locals',
              desc: 'Stores application-level variables that are available throughout the application and to templates.'
            }
          ],

          note:
            'Do not confuse app.get("/path", handler) with app.get("settingName"). The first defines a GET route, while the second retrieves an application setting.'
        },

        {
          id: '12-C',
          letter: 'C',
          title: 'Best Practices Checklist',

          advantages: [
            'Keep routes modular using Express Router.',
            'Separate routes, controllers, services and database logic as the application grows.',
            'Use middleware for reusable concerns such as authentication, validation and logging.',
            'Centralize error handling instead of repeating response logic everywhere.',
            'Validate and sanitize incoming user input.',
            'Use environment variables for secrets and configuration.',
            'Use security middleware such as Helmet where appropriate.',
            'Configure CORS deliberately instead of allowing every origin in production without a reason.',
            'Use rate limiting for sensitive or abuse-prone endpoints.',
            'Log important application events and errors.',
            'Use appropriate HTTP status codes.',
            'Keep controllers focused and avoid putting all business logic inside route handlers.',
            'Use async/await with proper error handling for asynchronous operations.',
            'Keep secrets such as database credentials and JWT secrets outside source code.'
          ]
        },

        {
          id: '12-D',
          letter: 'D',
          title: 'Express Request Lifecycle',

          flow: {
            title: 'Request Lifecycle',
            steps: [
              'Client sends HTTP Request',
              'Express receives the request',
              'Application-level middleware',
              'Body parsing / authentication / validation middleware',
              'Router matching',
              'Route-level middleware',
              'Controller / Route Handler',
              'Business Logic / Database Operation',
              'Response created',
              'HTTP Response sent to client'
            ]
          },

          bullets: [
            'Middleware executes according to registration and route matching order.',
            'A middleware can modify req or res before passing control onward.',
            'Authentication middleware can verify a user before the controller executes.',
            'Validation middleware can reject invalid input before business logic runs.',
            'The controller performs the operation and sends the response.',
            'If an error occurs, the request can be forwarded to error-handling middleware.',
            'The lifecycle is one of the most important concepts for understanding Express applications.'
          ]
        },

        {
          id: '12-E',
          letter: 'E',
          title: 'Project Structure Example',

          code: `my-app/
│
├── routes/
│   ├── userRoutes.js
│   └── authRoutes.js
│
├── controllers/
│   ├── userController.js
│   └── authController.js
│
├── services/
│   └── userService.js
│
├── middlewares/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validate.js
│
├── models/
│   └── User.js
│
├── config/
│   └── db.js
│
├── public/
│   ├── css/
│   └── js/
│
├── views/
│   └── index.ejs
│
├── app.js
├── server.js
├── .env
├── .gitignore
└── package.json`,

          bullets: [
            'routes → defines API endpoints and connects them to controllers.',
            'controllers → handles request/response logic.',
            'services → contains reusable business logic when the application becomes larger.',
            'middlewares → authentication, validation, logging and error handling.',
            'models → database models such as Mongoose schemas.',
            'config → database and application configuration.',
            'app.js → creates and configures the Express application.',
            'server.js → can be responsible for starting the HTTP server.',
            '.env → stores environment-specific configuration and secrets.'
          ]
        }
      ]
    },
];
