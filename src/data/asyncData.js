export const asyncSections = [
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

    description:
      'A callback is a function passed as an argument to another function and executed later, usually after an asynchronous operation completes. Callbacks were one of the earliest and most common ways to handle asynchronous operations in Node.js.',

    badge:
      'Node style:\\nfunction(err, data) {}\\n\\nerr → error information\\ndata → successful result',

    cards: [
      {
        id: '1-A',
        letter: 'A',
        title: 'What is a Callback?',
        bullets: [
          'A callback is a function passed as an argument to another function.',
          'The receiving function decides when to execute the callback.',
          'In asynchronous programming, the callback usually runs after an operation finishes.',
          'The callback can handle either the successful result or an error.',
          'Callbacks allow Node.js to start an operation without blocking the rest of the program.',
          'In Node.js, many older APIs use the error-first callback pattern: function(err, data).'
        ]
      },

      {
        id: '1-B',
        letter: 'B',
        title: 'Example (Simple Callback)',

        code: `const fs = require('fs');

fs.readFile('hello.txt', 'utf8', function(err, data) {
  // Handle error
  if (err) return console.error(err);

  // Handle successful result
  console.log(data);
});`,

        flow: {
          title: 'Flow',
          steps: [
            'readFile() starts the file-reading operation.',
            'Node.js continues executing other code instead of blocking.',
            'The file is read asynchronously.',
            'When the operation finishes, Node.js calls the callback.',
            'If an error occurred → err contains the error.',
            'If successful → data contains the file contents.'
          ]
        }
      },

      {
        id: '1-C',
        letter: 'C',
        title: 'Callback Hell (Pyramid of Doom)',

        subtitle:
          'Callback Hell occurs when multiple asynchronous operations depend on each other and callbacks become deeply nested. The code gradually moves to the right, making it difficult to read, maintain, debug and handle errors.',

        code: `fs.readFile('a.txt', 'utf8', (err, dataA) => {
  if (err) return console.error(err);

  fs.readFile('b.txt', 'utf8', (err, dataB) => {
    if (err) return console.error(err);

    fs.readFile('c.txt', 'utf8', (err, dataC) => {
      if (err) return console.error(err);

      console.log(dataC);
    });
  });
});`,

        problems: {
          title: 'Problems',
          bullets: [
            'Deep nesting makes the code difficult to read.',
            'As the number of dependent operations increases, indentation increases.',
            'Error handling gets repeated inside every callback.',
            'Changing one operation can require modifying several nested callbacks.',
            'The flow of execution becomes difficult to understand.',
            'Testing and debugging deeply nested callbacks becomes harder.',
            'Large callback chains are difficult to scale and maintain.'
          ]
        }
      },

      {
        id: '1-D',
        letter: 'D',
        title: 'Characteristics',
        bullets: [
          'Callbacks are functions that are executed later by another function or API.',
          'Node.js commonly follows the error-first callback pattern: (err, data).',
          'The first parameter normally represents an error.',
          'The second or later parameters normally contain successful results.',
          'Callbacks are commonly used with non-blocking Node.js APIs.',
          'Callbacks introduce Inversion of Control because another function decides when the callback executes.',
          'A callback is not automatically guaranteed to execute only once; the API determines how and when it is called.',
          'Older Node.js APIs such as fs.readFile(), fs.writeFile() and many networking APIs commonly use callbacks.'
        ]
      },

      {
        id: '1-E',
        letter: 'E',
        title: 'Use Cases',
        bullets: [
          'Handling asynchronous file-system operations in older Node.js APIs.',
          'Working with legacy Node.js libraries that expose callback-based APIs.',
          'Executing a function after an asynchronous operation completes.',
          'Handling simple asynchronous operations with limited dependencies.',
          'Creating custom asynchronous workflows when a callback-based API is already being used.',
          'Understanding callbacks is important because Promises and async/await were introduced to make asynchronous control flow easier to manage.'
        ]
      },

      {
        id: '1-F',
        letter: 'F',
        title: 'Advantages / Disadvantages',

        advantages: [
          'Simple concept: a function is passed and called later.',
          'Widely supported, especially in older Node.js APIs and libraries.',
          'Works naturally with Node.js non-blocking I/O.',
          'Does not require Promise-specific syntax.',
          'Useful for small asynchronous operations where only one or two callbacks are required.'
        ],

        disadvantages: [
          'Callback Hell can occur when many operations depend on each other.',
          'Repeated error handling can make code verbose.',
          'Deep nesting reduces readability.',
          'Control flow becomes harder to understand as the application grows.',
          'Inversion of Control means the caller gives control over when the callback executes.',
          'Debugging and testing complex callback chains can become difficult.',
          'Promises and async/await generally provide cleaner alternatives for complex asynchronous workflows.'
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

    description:
      'A Promise is an object that represents the eventual result of an asynchronous operation. Promises provide a cleaner way to handle success and failure, while async/await provides a more readable syntax for working with Promises.',

    cards: [
      {
        id: '2-A',
        letter: 'A',
        title: 'What is a Promise?',
        bullets: [
          'A Promise is an object representing the eventual completion or failure of an asynchronous operation.',
          'Instead of passing a callback directly, an asynchronous function can return a Promise.',
          'The Promise can eventually become fulfilled with a result or rejected with an error.',
          'A Promise has three states: Pending, Fulfilled and Rejected.',
          'Once a Promise is fulfilled or rejected, it is settled and its state cannot change again.',
          'Promises make asynchronous control flow easier to compose than deeply nested callbacks.',
          'Promises are the foundation on which async/await works.'
        ]
      },

      {
        id: '2-B',
        letter: 'B',
        title: 'Promise Syntax',

        code: `const promise = new Promise((resolve, reject) => {
  // Perform asynchronous operation

  if (/* success */) {
    resolve(data);
  } else {
    reject(error);
  }
});`,

        states: {
          title: 'States',
          bullets: [
            'Pending (initial state) → operation is still in progress.',
            'Fulfilled (resolve) → operation completed successfully.',
            'Rejected (reject) → operation failed.',
            'Fulfilled and Rejected are both settled states.',
            'A settled Promise cannot move back to Pending or change to another settled state.'
          ]
        }
      },

      {
        id: '2-C',
        letter: 'C',
        title: 'Consuming Promises',

        code: `promise
  .then(data => console.log(data))     // success
  .catch(err => console.error(err))    // error
  .finally(() => console.log('Done')); // always`,

        bullets: [
          'then() runs when the Promise is fulfilled.',
          'catch() handles rejection or errors in the Promise chain.',
          'finally() runs after the Promise settles, whether it succeeds or fails.',
          'then() and catch() return Promises, so Promise methods can be chained.',
          'Promise chaining helps avoid deeply nested callback structures.'
        ]
      },

      {
        id: '2-D',
        letter: 'D',
        title: 'Example (fs.promises)',

        code: `const fs = require('fs').promises;

fs.readFile('hello.txt', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });`,

        bullets: [
          'fs.promises provides Promise-based versions of many file-system operations.',
          'readFile() returns a Promise instead of requiring a callback.',
          'If the file is read successfully, the Promise is fulfilled with the file contents.',
          'If the operation fails, the Promise is rejected and catch() handles the error.',
          'This approach produces a flatter and easier-to-read asynchronous flow than nested callbacks.'
        ]
      },

      {
        id: '2-E',
        letter: 'E',
        title: 'Async/Await',

        code: `async function read() {
  try {
    const data = await fs.readFile('hello.txt', 'utf8');

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

read();`,

        keyPoints: {
          title: 'Key Points',
          bullets: [
            'async makes a function return a Promise.',
            'await waits for a Promise to settle before continuing that async function.',
            'await can normally be used inside an async function.',
            'await does not block the entire Node.js process; it pauses the execution of the current async function.',
            'If the awaited Promise is fulfilled, await gives you its resolved value.',
            'If the awaited Promise is rejected, await throws the rejection, which can be handled using try...catch.',
            'async/await is built on top of Promises; it does not replace the Promise mechanism.'
          ]
        }
      },

      {
        id: '2-F',
        letter: 'F',
        title: 'Error Handling',

        bulletsWithSyntax: [
          {
            label: 'With Promises',
            detail: '.catch() → handles Promise rejection'
          },
          {
            label: 'With Async/Await',
            detail: 'try...catch → handles errors thrown while awaiting'
          },
          {
            label: 'With synchronous code inside async function',
            detail: 'try...catch can also handle synchronous exceptions'
          }
        ]
      },

      {
        id: '2-G',
        letter: 'G',
        title: 'Advantages / Disadvantages',

        advantages: [
          'Cleaner and more readable asynchronous code.',
          'Better error handling compared with deeply nested callbacks.',
          'Promise chaining makes multiple asynchronous operations easier to compose.',
          'async/await makes asynchronous code look similar to synchronous code.',
          'Easier to read, debug and maintain.',
          'Helps avoid callback hell.',
          'Works well with modern Node.js APIs and libraries.'
        ],

        disadvantages: [
          'Requires understanding Promises before async/await becomes easy to understand.',
          'async/await does not remove asynchronous behavior; it only provides cleaner syntax for working with Promises.',
          'Using await sequentially when operations are independent can make code slower than necessary.',
          'Promise chains can still become complicated if poorly structured.',
          'Developers must understand when to use Promise.all() for independent operations.'
        ]
      },

      {
        id: '2-H',
        letter: 'H',
        title: 'Use Cases',
        bullets: [
          'Modern Node.js applications.',
          'File-system operations using fs.promises.',
          'Database operations with Promise-based libraries.',
          'Calling REST APIs and other asynchronous network operations.',
          'Authentication and authorization workflows involving asynchronous database/API calls.',
          'Executing multiple asynchronous operations in a controlled sequence.',
          'Running independent asynchronous operations concurrently using Promise.all().',
          'Complex asynchronous workflows where callback nesting would become difficult to maintain.'
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

    description:
      'EventEmitter is a Node.js class used to implement event-driven programming. An object can emit named events, while one or more listeners can subscribe to those events and execute functions when the events occur.',

    badge:
      "const EventEmitter =\\nrequire('events');\\n\\nconst emitter = new EventEmitter();",

    cards: [
      {
        id: '3-A',
        letter: 'A',
        title: 'What is Event Emitter?',
        bullets: [
          'EventEmitter is a class provided by Node.js through the built-in events module.',
          'It allows an object to emit named events.',
          'Other parts of the application can register listener functions for those events.',
          'When an event is emitted, all registered listeners for that event are executed.',
          'EventEmitter follows an event-driven programming model.',
          'Multiple listeners can listen to the same event.',
          'EventEmitter is synchronous by default: listeners are called synchronously in the order they were registered.'
        ]
      },

      {
        id: '3-B',
        letter: 'B',
        title: 'Basic Example',

        code: `const EventEmitter = require('events');

const emitter = new EventEmitter();

// Listen for the event
emitter.on('greet', (name) => {
  console.log('Hello ' + name);
});

// Emit the event
emitter.emit('greet', 'Saurabh');

// Output:
// Hello Saurabh`,

        bullets: [
          'require("events") imports the built-in Node.js events module.',
          'new EventEmitter() creates an EventEmitter instance.',
          'on() registers a listener for a specific event.',
          'emit() triggers the event and passes arguments to the listeners.',
          'When greet is emitted, the registered listener receives "Saurabh" as the name argument.'
        ]
      },

      {
        id: '3-C',
        letter: 'C',
        title: 'Core Methods',

        methods: [
          {
            name: 'emitter.on(event, listener)',
            desc: 'Registers a listener for an event. The listener can be executed every time the event is emitted, and multiple listeners can be registered for the same event.'
          },
          {
            name: 'emitter.once(event, listener)',
            desc: 'Registers a listener that executes only the first time the specified event is emitted. After execution, the listener is automatically removed.'
          },
          {
            name: 'emitter.emit(event, ...args)',
            desc: 'Triggers an event and passes optional arguments to all listeners registered for that event. Returns true if the event had listeners.'
          },
          {
            name: 'emitter.off(event, listener)',
            desc: 'Removes a specific listener that was previously registered. It is an alias for removeListener().'
          },
          {
            name: 'emitter.removeAllListeners(event)',
            desc: 'Removes all listeners registered for the specified event. If no event is provided, listeners for all events can be removed.'
          },
          {
            name: 'emitter.listenerCount(event)',
            desc: 'Returns the number of listeners currently registered for the specified event.'
          },
          {
            name: 'emitter.eventNames()',
            desc: 'Returns an array containing the event names for which the emitter currently has registered listeners.'
          }
        ]
      },

      {
        id: '3-D',
        letter: 'D',
        title: 'Built-in Events (on EventEmitter instance)',

        methods: [
          {
            name: "'newListener' (event, listener)",
            desc: 'A special event emitted when a new listener is about to be added. It can be used to observe listener registration.'
          },
          {
            name: "'removeListener' (event, listener)",
            desc: 'A special event emitted after a listener is removed from an EventEmitter.'
          },
          {
            name: "'error' (err)",
            desc: 'Special error event used for handling errors. If an EventEmitter emits an error event and no error listener is registered, Node.js throws the error and the process can terminate.'
          }
        ]
      },

      {
        id: '3-E',
        letter: 'E',
        title: 'Example (Practical)',

        code: `const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('start', () => {
  console.log('Start 1');
});

emitter.on('start', () => {
  console.log('Start 2');
});

// This listener executes only once
emitter.once('start', () => {
  console.log('Only once');
});

// First emission
emitter.emit('start');

// Second emission
emitter.emit('start');

/*
Output:

Start 1
Start 2
Only once

Start 1
Start 2
*/`,

        bullets: [
          'Two listeners are registered using on(), so both execute every time start is emitted.',
          'The once() listener executes only during the first start event.',
          'The first emit() triggers all three listeners.',
          'The second emit() triggers only the two on() listeners.',
          'This demonstrates the difference between on() and once().',
          'EventEmitter is useful when multiple parts of an application need to react to the same event.'
        ]
      },

      {
        id: '3-F',
        letter: 'F',
        title: 'Use Cases',
        bullets: [
          'Building event-driven application architecture.',
          'Creating custom application events such as userRegistered, orderPlaced or paymentCompleted.',
          'Real-time applications such as chat systems and notification systems.',
          'Handling events inside server-side applications.',
          'Working with Node.js streams, which use EventEmitter concepts.',
          'Monitoring application events such as connections, requests or errors.',
          'Creating loosely coupled components where one component emits an event and other components react to it.',
          'Understanding how many Node.js core APIs communicate through events.'
        ]
      },

      {
        id: '3-G',
        letter: 'G',
        title: 'Advantages / Disadvantages',

        advantages: [
          'Lightweight and built directly into Node.js.',
          'No external package is required.',
          'Excellent fit for event-driven architectures.',
          'Allows multiple listeners to react to the same event.',
          'Helps reduce direct dependency between components.',
          'Highly flexible and useful for custom application events.'
        ],

        disadvantages: [
          'Large applications can become difficult to understand if too many events are created.',
          'Event names must be managed carefully to avoid confusion.',
          'Debugging event-driven flows can be harder because execution is triggered indirectly.',
          'Forgetting to remove unnecessary listeners can contribute to memory-leak problems.',
          'Too many listeners on a single event can make the application difficult to maintain.',
          'EventEmitter is not a replacement for every asynchronous pattern; Promises are often better for representing a single asynchronous result.'
        ]
      },

      {
        id: '3-H',
        letter: 'H',
        title: 'Note',

        note:
          'EventEmitter is a fundamental part of Node.js event-driven architecture. Many Node.js core APIs and modules use EventEmitter or event-based patterns, including http, net, streams and process. Understanding EventEmitter is important for understanding how Node.js handles events, connections, streams and other event-driven operations.'
      }
    ]
  },
];
