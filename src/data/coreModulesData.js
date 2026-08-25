export const coreModulesSections = [
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

      description:
        'The Path module provides utilities for working with file and directory paths. It helps build, normalize, resolve, parse and manipulate paths in a platform-independent way, so your application can work correctly on Windows, Linux and macOS.',

      badge:
        "const path = require('path');\\n\\n// ES Modules:\\nimport path from 'path';",

      cards: [
        {
          id: '4-A',
          letter: 'A',
          title: 'What it does',

          bullets: [
            'The path module is a built-in Node.js module for working with file and directory paths.',
            'It does not access or modify files; it only helps you construct and manipulate path strings.',
            'It provides platform-independent utilities for Windows, Linux and macOS.',
            'It handles differences such as Windows using backslashes (\\\\) while Linux/macOS normally use forward slashes (/).',
            'It can join path segments, resolve absolute paths, extract filenames and extensions, normalize paths and calculate relative paths.',
            'It is commonly used together with the fs module when working with files and directories.'
          ]
        },

        {
          id: '4-B',
          letter: 'B',
          title: 'Why use it?',

          bullets: [
            'Manually creating paths using string concatenation is error-prone.',
            'Windows and Unix-based systems use different path separators.',
            'path.join() safely combines path segments using the correct platform separator.',
            'path.resolve() helps create absolute paths from relative path segments.',
            'path.normalize() removes unnecessary . and .. segments from a path.',
            'Methods such as basename(), dirname() and extname() make it easy to extract information from paths.',
            'Using the path module makes Node.js applications more portable across operating systems.'
          ]
        },

        {
          id: '4-C',
          letter: 'C',
          title: 'Important Properties',

          methods: [
            {
              name: 'path.sep',
              desc: "Returns the platform-specific path separator. '\\\\' on Windows and '/' on Linux/macOS."
            },
            {
              name: 'path.delimiter',
              desc: "Returns the platform-specific delimiter used in environment variables such as PATH. ';' on Windows and ':' on Linux/macOS."
            },
            {
              name: 'path.extname(p)',
              desc: 'Returns the extension of the path. Example: path.extname("index.html") → ".html".'
            },
            {
              name: 'path.basename(p)',
              desc: 'Returns the last portion of a path, usually the filename. Example: "/users/saurabh/app.js" → "app.js".'
            },
            {
              name: 'path.dirname(p)',
              desc: 'Returns the directory portion of a path. Example: "/users/saurabh/app.js" → "/users/saurabh".'
            },
            {
              name: 'path.parse(p)',
              desc: 'Breaks a path into root, dir, base, ext and name properties.'
            },
            {
              name: 'path.format(obj)',
              desc: 'Creates a path string from an object containing properties such as root, dir, base, name and ext.'
            }
          ]
        },

        {
          id: '4-D',
          letter: 'D',
          title: 'Common Methods',

          methods: [
            {
              name: 'path.join(...paths)',
              desc: 'Combines multiple path segments and normalizes the resulting path using the platform separator.'
            },
            {
              name: 'path.resolve(...paths)',
              desc: 'Resolves path segments from right to left and returns an absolute path. If no absolute path is found, the current working directory is used.'
            },
            {
              name: 'path.normalize(p)',
              desc: 'Normalizes a path by resolving redundant separators and removing unnecessary . and .. segments.'
            },
            {
              name: 'path.isAbsolute(p)',
              desc: 'Returns true if the supplied path is an absolute path; otherwise returns false.'
            },
            {
              name: 'path.relative(from, to)',
              desc: 'Calculates the relative path needed to navigate from one location to another.'
            },
            {
              name: 'path.parse(p)',
              desc: 'Returns an object containing root, dir, base, ext and name information.'
            },
            {
              name: 'path.basename(p, suffix)',
              desc: 'Returns the last part of the path and can optionally remove a specified suffix.'
            },
            {
              name: 'path.dirname(p)',
              desc: 'Returns the directory portion of a path.'
            },
            {
              name: 'path.extname(p)',
              desc: 'Returns the extension portion of a path, including the leading dot.'
            }
          ]
        },

        {
          id: '4-E',
          letter: 'E',
          title: 'Examples',

          code: `const path = require('path');

// Platform-specific separator
console.log(path.sep);
// Windows: \\\\
// Linux/macOS: /


// Join path segments
console.log(
  path.join('folder', 'sub', 'file.txt')
);

// Example output on Linux/macOS:
// folder/sub/file.txt

// Example output on Windows:
// folder\\\\sub\\\\file.txt


// Resolve to an absolute path
console.log(
  path.resolve('folder', 'sub', '..', 'abc.txt')
);

// The "sub" directory is removed because of ".."
// Result is an absolute path such as:
// /current/working/directory/folder/abc.txt


// Get extension
console.log(
  path.extname('index.html')
);
// .html


// Get filename
console.log(
  path.basename('/a/b/c.txt')
);
// c.txt


// Get directory
console.log(
  path.dirname('/a/b/c.txt')
);
// /a/b


// Parse path
console.log(
  path.parse('/a/b/c.txt')
);

// {
//   root: '/',
//   dir: '/a/b',
//   base: 'c.txt',
//   ext: '.txt',
//   name: 'c'
// }`,

          bullets: [
            'path.join() is mainly used when you want to construct a path from multiple pieces.',
            'path.resolve() is used when you need an absolute path.',
            'path.basename() is useful when you only need the filename.',
            'path.dirname() is useful when you need the parent directory.',
            'path.extname() is useful when checking a file extension.',
            'path.parse() is useful when you need multiple pieces of information about a path.'
          ]
        },

        {
          id: '4-F',
          letter: 'F',
          title: 'Use Cases',

          bullets: [
            'Building file and directory paths dynamically.',
            'Creating paths for fs.readFile(), fs.writeFile() and other file-system operations.',
            'Getting file extensions such as .js, .json, .jpg or .pdf.',
            'Extracting filenames from complete paths.',
            'Finding the directory containing a particular file.',
            'Creating absolute paths using path.resolve().',
            'Creating relative paths between directories.',
            'Making applications work correctly across Windows, Linux and macOS.',
            'Handling uploaded files and constructing safe storage paths.',
            'Working with __dirname and __filename in CommonJS applications.'
          ],

          note:
            'Important: The path module only manipulates path strings. It does not create, read, write or delete files. For actual file-system operations, use the fs module.'
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

      description:
        'The File System (fs) module provides Node.js APIs for interacting with files and directories. You can use it to read, write, append, rename, delete and inspect files, create directories and manage file-system data.',

      badge:
        "const fs = require('fs');\\n\\n// Promise API:\\nconst fs = require('fs').promises;",

      cards: [
        {
          id: '5-A',
          letter: 'A',
          title: 'What it does',

          bullets: [
            'The fs module is a built-in Node.js module for interacting with the file system.',
            'It can create, read, update and delete files and directories.',
            'It can retrieve information about files using methods such as fs.stat().',
            'It supports synchronous and asynchronous APIs.',
            'Asynchronous APIs are generally preferred for server applications because they do not block the Node.js event loop while waiting for I/O.',
            'The Promise-based fs API can be used with async/await for cleaner asynchronous code.',
            'File operations can fail because of reasons such as missing files, incorrect permissions or invalid paths, so errors should always be handled.'
          ]
        },

        {
          id: '5-B',
          letter: 'B',
          title: 'Types of APIs',

          bulletsWithSyntax: [
            {
              label: '1. Synchronous (blocking)',
              detail: 'Example: fs.readFileSync(). The function blocks execution until the file operation finishes.'
            },
            {
              label: '2. Asynchronous (callback-based)',
              detail: 'Example: fs.readFile(). The operation runs asynchronously and the callback executes when it completes.'
            },
            {
              label: '3. Promise-based',
              detail: 'Example: fs.promises.readFile(). Returns a Promise and works naturally with async/await.'
            }
          ],

          note:
            'For most server-side application code, prefer asynchronous or Promise-based APIs. Synchronous APIs can be useful during application startup, CLI scripts or small one-time operations, but using them repeatedly during request handling can block the event loop.'
        },

        {
          id: '5-C',
          letter: 'C',
          title: 'Common Methods',

          methods: [
            {
              name: 'fs.readFile(path, enc, cb)',
              desc: 'Reads the complete contents of a file asynchronously and provides the result to the callback.'
            },
            {
              name: 'fs.readFileSync(path, enc)',
              desc: 'Reads a file synchronously and blocks execution until the operation completes.'
            },
            {
              name: 'fs.writeFile(path, data, cb)',
              desc: 'Writes data to a file asynchronously. If the file already exists, its contents are replaced.'
            },
            {
              name: 'fs.writeFileSync(path, data)',
              desc: 'Writes data synchronously and blocks execution until the operation completes.'
            },
            {
              name: 'fs.appendFile(path, data, cb)',
              desc: 'Adds data to the end of a file without replacing its existing contents.'
            },
            {
              name: 'fs.unlink(path, cb)',
              desc: 'Deletes a file asynchronously.'
            },
            {
              name: 'fs.mkdir(path, options, cb)',
              desc: 'Creates a directory. The recursive option can be used to create parent directories when required.'
            },
            {
              name: 'fs.readdir(path, cb)',
              desc: 'Reads the contents of a directory and returns the names of files and subdirectories.'
            },
            {
              name: 'fs.stat(path, cb)',
              desc: 'Returns information about a file or directory, such as size, timestamps and whether the path represents a file or directory.'
            },
            {
              name: 'fs.rename(oldPath, newPath, cb)',
              desc: 'Renames or moves a file or directory.'
            },
            {
              name: 'fs.rm(path, options, cb)',
              desc: 'Removes files or directories. It is the modern replacement for many uses of the older fs.rmdir() API.'
            }
          ],

          note:
            '• Always handle errors from file-system operations.\\n• Prefer asynchronous APIs in server applications.\\n• Use fs.promises with async/await when you want cleaner asynchronous code.\\n• Use path.join() or path.resolve() instead of manually concatenating file paths.\\n• fs.rmdir() is deprecated in modern Node.js; use fs.rm() for removing directories.'
        },

        {
          id: '5-D',
          letter: 'D',
          title: 'Examples (Async)',

          code: `const fs = require('fs');

// Read file
fs.readFile('hello.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error(err);
  }

  console.log(data);
});


// Write file
fs.writeFile(
  'hello.txt',
  'Hello Node.js!',
  (err) => {
    if (err) {
      return console.error(err);
    }

    console.log('File written!');
  }
);


// Append data
fs.appendFile(
  'hello.txt',
  '\\nThis is appended.',
  (err) => {
    if (err) {
      return console.error(err);
    }

    console.log('Appended!');
  }
);`,

          bullets: [
            'The asynchronous APIs do not make the main JavaScript execution wait for the file operation to finish.',
            'The callback receives an error as its first argument.',
            'Always check err before using the returned data.',
            'Using return after handling an error prevents the success code from executing.',
            'For modern code, these callback APIs can also be replaced with fs.promises and async/await.'
          ]
        },

        {
          id: '5-E',
          letter: 'E',
          title: 'Examples (Sync)',

          code: `const fs = require('fs');

// Read file synchronously
const data = fs.readFileSync(
  'hello.txt',
  'utf8'
);

console.log(data);


// Write file synchronously
fs.writeFileSync(
  'a.txt',
  'Sync write'
);


// Create directory synchronously
fs.mkdirSync(
  'myFolder',
  { recursive: true }
);`,

          bullets: [
            'Synchronous methods return the result directly instead of using a callback.',
            'The next line does not execute until the file-system operation finishes.',
            'This simplicity makes synchronous APIs convenient for small scripts and startup configuration.',
            'The main disadvantage is blocking: while the operation is running, the JavaScript thread cannot continue processing other work.',
            'Avoid frequent synchronous file operations inside HTTP request handlers or other performance-sensitive server code.'
          ]
        },

        {
          id: '5-F',
          letter: 'F',
          title: 'Use Cases',

          bullets: [
            'Reading configuration files during application startup.',
            'Reading and writing JSON files.',
            'Creating application logs and log files.',
            'Managing uploaded files.',
            'Creating and managing directories.',
            'Generating reports and temporary files.',
            'Working with CSV, TXT, JSON and other file formats.',
            'Building CLI tools that read and modify files.',
            'Serving static files in low-level Node.js applications.',
            'Implementing file-processing workflows on the server.'
          ],

          note:
            'In real applications, combine fs with the path module. For example, path.join(__dirname, "uploads", filename) can be used to construct a platform-independent path before passing it to an fs method.'
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

      description:
        'The HTTP module is a built-in Node.js module used to create HTTP servers and make HTTP requests. It provides low-level control over requests and responses and is the foundation underneath many higher-level Node.js web frameworks such as Express.',

      badge:
        "const http = require('http');\\n\\nconst server = http.createServer();",

      cards: [
        {
          id: '6-A',
          letter: 'A',
          title: 'What it does',

          bullets: [
            'The http module provides Node.js APIs for creating HTTP servers and making HTTP client requests.',
            'It allows a server to receive HTTP requests from clients such as browsers, mobile apps and other APIs.',
            'The server can inspect the request method, URL, headers and body.',
            'The server can send an HTTP response containing a status code, headers and response data.',
            'Node.js handles HTTP using an event-driven, non-blocking architecture.',
            'The http module provides low-level control over HTTP compared with frameworks such as Express.',
            'Understanding http helps you understand what frameworks such as Express are doing internally.'
          ]
        },

        {
          id: '6-B',
          letter: 'B',
          title: 'Create an HTTP Server',

          code: `const http = require('http');

const server = http.createServer((req, res) => {
  // Set status code and response headers
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  // Send response and finish it
  res.end('Hello from Node.js Server');
});

server.listen(3000, () => {
  console.log(
    'Server running on port 3000'
  );
});`,

          bullets: [
            'http.createServer() creates an HTTP server.',
            'The callback receives two important objects: req and res.',
            'req represents the incoming client request.',
            'res represents the response that the server sends back.',
            'res.writeHead() can set the HTTP status code and response headers.',
            'res.end() sends the final response and closes the response stream.',
            'server.listen() starts listening for incoming connections on the specified port.'
          ]
        },

        {
          id: '6-C',
          letter: 'C',
          title: 'Request (req) Object',

          methods: [
            {
              name: 'req.url',
              desc: 'Contains the URL/path requested by the client, including the query string if present.'
            },
            {
              name: 'req.method',
              desc: 'Contains the HTTP method such as GET, POST, PUT, PATCH or DELETE.'
            },
            {
              name: 'req.headers',
              desc: 'Contains HTTP headers sent by the client, such as content-type, authorization and user-agent.'
            },
            {
              name: 'req.on("data", callback)',
              desc: 'Receives chunks of the incoming request body. Useful when reading POST, PUT or PATCH request data.'
            },
            {
              name: 'req.on("end", callback)',
              desc: 'Runs when the complete request body has been received.'
            },
            {
              name: 'req.socket',
              desc: 'Provides access to the underlying network socket and connection information.'
            }
          ],

          note:
            'Request bodies arrive as a stream of chunks. For JSON requests, you usually collect the chunks, combine them and then use JSON.parse() after the end event.'
        },

        {
          id: '6-D',
          letter: 'D',
          title: 'Response (res) Object',

          methods: [
            {
              name: 'res.writeHead(statusCode, headers)',
              desc: 'Sets the HTTP status code and response headers before sending the response.'
            },
            {
              name: 'res.statusCode',
              desc: 'Sets or reads the HTTP status code that will be sent to the client.'
            },
            {
              name: 'res.setHeader(name, value)',
              desc: 'Sets an individual response header.'
            },
            {
              name: 'res.write(data)',
              desc: 'Writes part of the response body. Multiple write() calls can send data in chunks.'
            },
            {
              name: 'res.end(data)',
              desc: 'Finishes the response. Optional data can be sent before ending it.'
            },
            {
              name: 'res.getHeader(name)',
              desc: 'Returns the value of a response header that has been set.'
            }
          ],

          note:
            'A response should eventually be ended using res.end(). Forgetting to end a response can leave the client waiting indefinitely.'
        },

        {
          id: '6-E',
          letter: 'E',
          title: 'Making HTTP Requests (Client)',

          code: `const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

const req = http.request(
  options,
  (res) => {

    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Response:', data);
    });
  }
);

req.on('error', (err) => {
  console.error('Request failed:', err);
});

// Finish the request
req.end();`,

          bullets: [
            'http.request() creates an outgoing HTTP request from the Node.js application.',
            'The options object defines the target host, port, path and HTTP method.',
            'The callback receives the server response.',
            'The response body is received in chunks through the data event.',
            'The end event indicates that the complete response has been received.',
            'The request error event handles network or connection errors.',
            'For requests that contain a body, such as POST or PUT, data can be written using req.write() before req.end().'
          ]
        },

        {
          id: '6-F',
          letter: 'F',
          title: 'Use Cases',

          bullets: [
            'Building custom HTTP web servers.',
            'Understanding how HTTP requests and responses work.',
            'Building simple REST APIs without external frameworks.',
            'Creating low-level HTTP clients.',
            'Building proxies and request-forwarding services.',
            'Handling HTTP requests directly when fine-grained control is required.',
            'Learning how Express.js and other Node.js web frameworks work internally.',
            'Working with HTTP headers, status codes, request bodies and response streams.'
          ],

          note:
            'For most production REST APIs, Express.js or another framework is usually more convenient because it provides routing, middleware and request/response utilities. The built-in http module is still important because it gives you a clear understanding of what happens underneath those frameworks.'
        }
      ]
    },
];
