export const mongodbSections = [
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

      description:
        'MongoDB is a NoSQL, document-oriented database that stores data as flexible BSON documents. Instead of rows and tables, MongoDB organizes data into collections and documents, making it well suited for applications where data structures can evolve over time.',

      badge:
        'ObjectId("662d...")\\n\\nDatabase → Collection → Document → Field',

      cards: [
        {
          id: '13-A',
          letter: 'A',
          title: 'What is MongoDB & Key Concepts',

          bullets: [
            'MongoDB is a NoSQL database that stores data as documents instead of relational rows.',
            'MongoDB documents are stored internally as BSON (Binary JSON), which supports additional data types such as ObjectId, Date, Decimal128 and Binary.',
            'Database → A container that holds one or more collections.',
            'Collection → A group of related documents, similar conceptually to a table in SQL.',
            'Document → A BSON object containing fields and values, conceptually similar to a row in SQL.',
            'Field → A key-value pair inside a document.',
            '_id → The primary identifier for a document. MongoDB automatically creates an ObjectId _id when one is not supplied.',
            'Documents inside the same collection can have different fields, although applications should still maintain a sensible data structure.',
            'MongoDB supports nested documents and arrays, allowing related data to be represented naturally inside a document.',
            'MongoDB provides CRUD operations, indexing, aggregation, transactions and replication features.'
          ],

          advantages: [
            'Flexible document structure',
            'Natural representation of nested data',
            'Rich query language',
            'Powerful aggregation framework',
            'Indexes for faster queries',
            'Replication and high availability',
            'Horizontal scaling through sharding',
            'Good support for modern application development'
          ],

          note:
            'Important: MongoDB is flexible, not completely structureless. A good application should still maintain consistent document shapes and validate important data.'
        },

        {
          id: '13-B',
          letter: 'B',
          title: 'MongoDB Data Model & BSON Data Types',

          subtitle:
            'Example Document (BSON)',

          code: `{
  "_id": ObjectId("662d..."),
  "name": "Saurabh",
  "email": "saurabh@example.com",
  "age": 21,
  "isStudent": true,
  "skills": [
    "Node.js",
    "MongoDB"
  ],
  "address": {
    "city": "Delhi",
    "pin": 11001
  },
  "createdAt": ISODate("2024-05-20T10:00:00Z")
}`,

          bullets: [
            'String → Text values such as names, emails and titles.',
            'Int32 / Int64 / Double / Decimal128 → Numeric values with different precision and range characteristics.',
            'Boolean → true or false values.',
            'Array → Stores multiple values in a single field.',
            'Embedded Document → Stores an object inside another document.',
            'Null → Represents an explicitly empty value.',
            'Date → Stores date/time information.',
            'ObjectId → Common identifier type used for MongoDB document _id values.',
            'Binary → Stores binary data.',
            'Regular Expression → Supports regular expression values.',
            'Timestamp → A BSON-specific type used primarily for internal MongoDB purposes.'
          ],

          note:
            'MongoDB documents are BSON documents. JSON is commonly used when interacting with MongoDB tools and applications, but BSON is the actual binary storage format.'
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

      description:
        'MongoDB provides CRUD operations for creating, reading, updating and deleting documents. Query operators allow you to build flexible filters based on values, arrays, fields, logical conditions and expressions.',

      badge:
        'db.users.find({ age: { $gte: 18 } })',

      cards: [
        {
          id: '14-A',
          letter: 'A',
          title: 'MongoDB CRUD Operations',

          code: `// -------------------------
// CREATE
// -------------------------

db.users.insertOne({
  name: "John",
  age: 20
});

db.users.insertMany([
  { name: "A", age: 20 },
  { name: "B", age: 22 }
]);


// -------------------------
// READ
// -------------------------

// Find all documents
db.users.find();

// Find users older than 18
db.users.find({
  age: { $gt: 18 }
});

// Find one user
db.users.findOne({
  email: "a@b.com"
});


// -------------------------
// UPDATE
// -------------------------

db.users.updateOne(
  { _id: id },
  { $set: { age: 21 } }
);

db.users.updateMany(
  { age: { $lt: 18 } },
  { $set: { status: "minor" } }
);


// -------------------------
// DELETE
// -------------------------

db.users.deleteOne({
  _id: id
});

db.users.deleteMany({
  age: { $lt: 18 }
});`,

          bullets: [
            'Create → insertOne() creates one document and insertMany() creates multiple documents.',
            'Read → find() returns a cursor for matching documents, while findOne() returns one matching document or null.',
            'Update → updateOne() changes the first matching document and updateMany() changes all matching documents.',
            'Delete → deleteOne() removes one matching document and deleteMany() removes all matching documents.',
            'Update operators such as $set, $inc, $push and $unset determine how document fields are modified.',
            'Always use a carefully designed filter with update and delete operations.',
            'An empty deleteMany({}) filter can delete every document in a collection, so destructive operations should be handled carefully.'
          ],

          note:
            'CRUD = Create, Read, Update, Delete. These four operations form the foundation of database interaction.'
        },

        {
          id: '14-B',
          letter: 'B',
          title: 'Query Operators Syntax',

          methods: [
            {
              name: 'Comparison',
              desc: '$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin — compare field values.'
            },
            {
              name: 'Logical',
              desc: '$and, $or, $not, $nor — combine or negate query conditions.'
            },
            {
              name: 'Element',
              desc: '$exists, $type — check whether fields exist or match a BSON type.'
            },
            {
              name: 'Array',
              desc: '$all, $elemMatch, $size — query array contents and structure.'
            },
            {
              name: 'Evaluation',
              desc: '$regex, $text, $expr — perform regex, text-search and expression-based matching.'
            }
          ],

          code: `db.users.find({
  $and: [
    {
      age: { $gte: 18 }
    },

    {
      skills: {
        $in: [
          "Node.js",
          "MongoDB"
        ]
      }
    },

    {
      name: {
        $regex: /^S/
      }
    }
  ]
});`,

          bullets: [
            '$eq → equal to.',
            '$ne → not equal to.',
            '$gt → greater than.',
            '$gte → greater than or equal to.',
            '$lt → less than.',
            '$lte → less than or equal to.',
            '$in → matches any value from an array.',
            '$nin → does not match any value from an array.',
            '$exists → checks whether a field exists.',
            '$regex → performs pattern matching on string values.',
            '$elemMatch → matches array elements that satisfy multiple conditions.'
          ]
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

      description:
        'MongoDB provides advanced querying features such as indexes, projections, sorting, pagination and aggregation pipelines. These features are essential for building efficient applications and analyzing large amounts of data.',

      badge:
        'db.users.aggregate([\\n  ...stages\\n])',

      cards: [
        {
          id: '15-A',
          letter: 'A',
          title: 'Indexing & Projections',

          code: `// -------------------------
// CREATE INDEX
// -------------------------

db.users.createIndex({
  email: 1
});


// Compound index
db.users.createIndex({
  city: 1,
  age: -1
});


// Text index
db.users.createIndex({
  name: "text",
  skills: "text"
});


// -------------------------
// PROJECTION
// -------------------------

db.users.find(
  {},
  {
    name: 1,
    email: 1,
    _id: 0
  }
);`,

          bullets: [
            'An index is a data structure that helps MongoDB find documents faster without scanning the entire collection.',
            'Indexes improve read performance for supported queries but require additional storage.',
            'Indexes can also increase the cost of insert and update operations because index entries may need to be maintained.',
            'A value of 1 creates an ascending index and -1 creates a descending index.',
            'Compound indexes contain multiple fields and are useful when queries commonly filter or sort using those fields.',
            'Projection controls which fields are returned by a query.',
            'Returning only required fields can reduce the amount of data transferred and processed.',
            'Indexes should be created based on actual query patterns rather than indexing every field.'
          ],

          note:
            'Use explain("executionStats") to understand how MongoDB executes a query and whether an index is actually being used.'
        },

        {
          id: '15-B',
          letter: 'B',
          title: 'Aggregation Pipeline',

          flow: {
            title: 'Pipeline Flow',
            steps: [
              '$match → Filter documents early',
              '$group → Group documents and calculate values',
              '$sort → Sort the resulting documents',
              'Additional stages → Transform or reshape the result'
            ]
          },

          code: `db.users.aggregate([
  {
    $match: {
      age: { $gte: 18 }
    }
  },

  {
    $group: {
      _id: "$city",
      count: {
        $sum: 1
      }
    }
  },

  {
    $sort: {
      count: -1
    }
  }
]);`,

          bullets: [
            'An aggregation pipeline processes documents through a sequence of stages.',
            '$match filters documents and should often be placed early to reduce the number of documents processed later.',
            '$group groups documents and can calculate values such as count, sum, average, minimum and maximum.',
            '$sort orders the documents.',
            '$project reshapes documents and selects or computes fields.',
            '$unwind converts array elements into separate pipeline documents.',
            '$lookup performs a join-like operation with another collection.',
            '$limit restricts the number of output documents.',
            '$skip skips a specified number of documents.',
            'The output of one stage becomes the input of the next stage.'
          ]
        },

        {
          id: '15-C',
          letter: 'C',
          title: 'Modifiers & Counting',

          methods: [
            {
              name: 'Sort, Skip, Limit',
              desc: 'db.users.find().sort({ age: -1 }).skip(10).limit(5) → useful for sorting and pagination.'
            },
            {
              name: 'countDocuments()',
              desc: 'db.users.countDocuments({ age: { $gt: 18 } }) → counts documents matching a filter.'
            },
            {
              name: 'estimatedDocumentCount()',
              desc: 'Returns an estimated total document count for a collection without requiring a filter.'
            },
            {
              name: 'distinct()',
              desc: 'db.users.distinct("skills") → returns distinct values for a field.'
            }
          ],

          bullets: [
            'sort() controls the ordering of query results.',
            'skip() ignores a specified number of matching documents.',
            'limit() restricts how many documents are returned.',
            'skip() and limit() can be used for basic offset-based pagination.',
            'For large datasets, pagination strategies should be designed carefully because large skip values can become inefficient.',
            'countDocuments() should be used when you need an accurate count matching a filter.'
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

      description:
        'Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides schemas, models, validation, middleware, query helpers and convenient APIs for working with MongoDB documents.',

      badge:
        "const User = mongoose.model('User', userSchema);",

      cards: [
        {
          id: '16-A',
          letter: 'A',
          title: 'What is Mongoose ODM?',

          bullets: [
            'Mongoose is an ODM (Object Data Modeling) library used with MongoDB in Node.js.',
            'It allows developers to define application-level schemas for MongoDB documents.',
            'Schemas define expected field types, validation rules, defaults and other behavior.',
            'Models are created from schemas and provide methods for querying and modifying documents.',
            'Mongoose provides built-in validation and supports custom validators.',
            'Mongoose supports middleware hooks such as pre and post middleware.',
            'Mongoose supports relationships through references and populate().',
            'Mongoose queries return Promises and can be used with async/await.',
            'Mongoose adds structure and application-level rules on top of MongoDB\'s flexible document model.'
          ],

          advantages: [
            'Schema-based data modeling',
            'Built-in validation',
            'Model abstraction',
            'Middleware and hooks',
            'Population for references',
            'Custom methods and statics',
            'Convenient query APIs',
            'Promise and async/await support'
          ],

          note:
            'MongoDB itself is schema-flexible. Mongoose does not change MongoDB into a relational database; it provides application-level structure and behavior around MongoDB documents.'
        },

        {
          id: '16-B',
          letter: 'B',
          title: 'Installation & Connection',

          code: `// Install
// npm install mongoose

const mongoose = require('mongoose');

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log(
      'MongoDB Connected'
    );
  })
  .catch((err) => {
    console.error(
      'MongoDB connection error:',
      err
    );
  });`,

          bullets: [
            'mongoose.connect() establishes a connection to MongoDB.',
            'The MongoDB connection string should normally be stored in an environment variable instead of hardcoding credentials.',
            'The Promise returned by mongoose.connect() resolves when the connection succeeds and rejects when the connection fails.',
            'Modern Mongoose versions do not require the old useNewUrlParser and useUnifiedTopology options.',
            'A production application should handle connection failures and consider graceful shutdown behavior.'
          ],

          note:
            'Example environment variable: MONGO_URI=mongodb://127.0.0.1:27017/mydb'
        },

        {
          id: '16-C',
          letter: 'C',
          title: 'Schema & Model Definition',

          code: `const userSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    age: {
      type: Number,
      min: 0
    },

    skills: [
      String
    ],

    createdAt: {
      type: Date,
      default: Date.now
    }
  });


const User =
  mongoose.model(
    'User',
    userSchema
  );`,

          bullets: [
            'Schema → Defines the structure and behavior expected by the application for a document.',
            'Model → A compiled class created from a schema and used to interact with a MongoDB collection.',
            'String → Stores text.',
            'Number → Stores numeric values.',
            'Boolean → Stores true/false values.',
            'Date → Stores date/time values.',
            'Array → Stores lists of values.',
            'Object → Stores nested objects.',
            'ObjectId → Commonly used to reference another MongoDB document.',
            'Mixed → Allows flexible values but reduces Mongoose type enforcement.',
            'Buffer → Stores binary data.',
            'Decimal128 → Provides high-precision decimal values.'
          ],

          note:
            'Important: unique: true is not a normal Mongoose validator. It is used to create a unique index. Duplicate values can therefore result in a MongoDB duplicate-key error.'
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

      description:
        'Mongoose provides convenient CRUD operations, schema validation, custom validators, middleware hooks, virtual properties, instance methods and static methods for building structured MongoDB applications.',

      badge:
        'userSchema.pre("save", function(next) { ... })',

      cards: [
        {
          id: '17-A',
          letter: 'A',
          title: 'Mongoose CRUD Operations',

          code: `// -------------------------
// CREATE
// -------------------------

const user = new User({
  name: "Harry",
  email: "harry@x.com"
});

await user.save();


// -------------------------
// READ
// -------------------------

const users =
  await User.find();

const adults =
  await User.find({
    age: { $gte: 18 }
  }).select("name email");

const user =
  await User.findById(id);


// -------------------------
// UPDATE
// -------------------------

await User.updateOne(
  { _id: id },
  { $set: { age: 22 } }
);

const updatedUser =
  await User.findByIdAndUpdate(
    id,
    { $set: { age: 22 } },
    {
      new: true,
      runValidators: true
    }
  );


// -------------------------
// DELETE
// -------------------------

await User.deleteOne({
  _id: id
});

await User.findByIdAndDelete(id);`,

          bullets: [
            'new User() creates a Mongoose document instance in memory.',
            'save() validates and persists the document to MongoDB.',
            'find() returns multiple matching documents.',
            'findOne() returns one matching document or null.',
            'findById() searches by the _id field.',
            'updateOne() updates the first matching document.',
            'findByIdAndUpdate() finds a document by _id and updates it.',
            'findByIdAndDelete() finds a document by _id and deletes it.',
            'new: true makes findByIdAndUpdate() return the updated document instead of the old document.',
            'runValidators: true enables schema validators during findByIdAndUpdate().'
          ]
        },

        {
          id: '17-B',
          letter: 'B',
          title: 'Validation (Built-in & Custom)',

          bullets: [
            'Validation checks whether incoming data satisfies the rules defined by the schema.',
            'Common validators include required, minlength, maxlength, min, max, enum and match.',
            'Custom validators allow application-specific rules.',
            'Validation normally occurs before a document is saved.',
            'Validation errors are represented by a Mongoose ValidationError.',
            'unique: true should not be confused with validation; uniqueness is enforced through a MongoDB unique index.'
          ],

          code: `const userSchema =
  new mongoose.Schema({

    age: {
      type: Number,

      validate: {
        validator: function(value) {
          return value % 2 === 0;
        },

        message: props =>
          \`\${props.value} is not even!\`
      }
    }
  });


// Built-in validation

const productSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },

    age: {
      type: Number,
      min: 18,
      max: 100
    },

    role: {
      type: String,
      enum: [
        'user',
        'admin'
      ]
    }
  });`
        },

        {
          id: '17-C',
          letter: 'C',
          title: 'Middleware (Hooks)',

          bullets: [
            'Mongoose middleware allows logic to run before or after specific database operations.',
            'Pre middleware runs before the associated operation.',
            'Post middleware runs after the associated operation.',
            'save middleware is useful for transformations or operations that should happen before saving a document.',
            'Hooks are commonly used for tasks such as password hashing, logging and generating derived data.',
            'Query middleware and document middleware behave differently, so you must understand which context this refers to.',
            'Hooks must generally be defined before compiling the model with mongoose.model().'
          ],

          code: `// Pre-save middleware

userSchema.pre(
  'save',
  function(next) {

    console.log(
      'Before saving user'
    );

    next();
  }
);


// Post-save middleware

userSchema.post(
  'save',
  function(doc) {

    console.log(
      'After saving user:',
      doc.name
    );
  }
);`,

          note:
            'Important: In a pre-save hook, use function() rather than an arrow function when you need this to refer to the document.'
        },

        {
          id: '17-D',
          letter: 'D',
          title: 'Virtuals, Methods & Statics',

          code: `// -------------------------
// Virtual Field
// -------------------------

userSchema.virtual(
  'fullName'
).get(function() {

  return (
    this.firstName +
    ' ' +
    this.lastName
  );
});


// -------------------------
// Instance Method
// -------------------------

userSchema.methods.greet =
  function() {

    return \`Hello \${this.name}\`;
  };


// -------------------------
// Static Method
// -------------------------

userSchema.statics.findByEmail =
  function(email) {

    return this.findOne({
      email
    });
  };`,

          bullets: [
            'Virtuals are computed properties that are not stored directly in MongoDB.',
            'Instance methods are available on individual Mongoose document instances.',
            'Static methods are available on the Model itself.',
            'Use document methods when the operation relates to one document.',
            'Use static methods when the operation is more naturally performed through the model or collection.',
            'Virtuals are useful for derived values such as fullName, but they are not automatically stored in the database.'
          ]
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

      description:
        'Mongoose supports relationships through document references and populate(), while MongoDB supports multi-document transactions for operations that need atomicity. Proper indexing, pagination, validation and error handling are essential for production applications.',

      badge:
        "Post.find().populate('author')\\n\\nMongoDB Transaction → Atomic Operations",

      cards: [
        {
          id: '18-A',
          letter: 'A',
          title: 'Relationships & Populate',

          code: `// User Schema

const userSchema =
  new mongoose.Schema({
    name: String,
    email: String
  });


// Post Schema

const postSchema =
  new mongoose.Schema({

    title: String,

    author: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'User'
    }
  });


// Model

const Post =
  mongoose.model(
    'Post',
    postSchema
  );


// Populate

const posts =
  await Post.find()
    .populate(
      'author',
      'name email'
    );`,

          bullets: [
            'A reference stores the _id of another document instead of embedding the complete document.',
            'ref tells Mongoose which model the ObjectId refers to.',
            'populate() replaces the referenced ObjectId with the related document data.',
            'populate() is a Mongoose feature; MongoDB itself provides aggregation operators such as $lookup for joining data.',
            'You can populate only selected fields to avoid returning unnecessary data.',
            'References are useful when related data is large, frequently updated independently or shared by many documents.',
            'Embedding can be better when related data is small and usually accessed together with the parent document.'
          ],

          note:
            'Reference vs Embed is an important MongoDB design decision. Do not automatically use populate() for every relationship.'
        },

        {
          id: '18-B',
          letter: 'B',
          title: 'Indexing & Transactions',

          code: `// -------------------------
// Indexing in Mongoose
// -------------------------

userSchema.index({
  email: 1
});

userSchema.index({
  name: 'text',
  skills: 'text'
});


// -------------------------
// Transaction
// -------------------------

const session =
  await mongoose.startSession();

try {

  session.startTransaction();

  await User.create(
    [
      {
        name: 'A'
      }
    ],
    {
      session
    }
  );

  await Account.updateOne(
    { _id: id },
    {
      $inc: {
        balance: -100
      }
    },
    {
      session
    }
  );

  await session.commitTransaction();

} catch (err) {

  await session.abortTransaction();

  throw err;

} finally {

  await session.endSession();
}`,

          bullets: [
            'Indexes improve query performance when MongoDB can use them effectively.',
            'Indexes consume storage and add overhead to writes because index entries must be maintained.',
            'Transactions allow multiple database operations to be committed atomically.',
            'If a transaction fails and is aborted, changes made inside that transaction are rolled back.',
            'Transactions are useful when several related operations must either all succeed or all fail.',
            'MongoDB transactions require a deployment that supports transactions, such as a replica set or sharded cluster.',
            'Always keep transactions as short as practical.'
          ]
        },

        {
          id: '18-C',
          letter: 'C',
          title: 'Best Practices Checklist',

          advantages: [
            'Handle database errors using try/catch or centralized application error handling.',
            'Use async/await for asynchronous Mongoose operations.',
            'Validate incoming data before storing it.',
            'Use schema validation for database-level application rules.',
            'Create indexes based on real query patterns.',
            'Use .lean() for read-only queries when you do not need Mongoose document methods or virtual behavior.',
            'Use pagination when returning large datasets.',
            'Avoid unbounded arrays that can grow indefinitely inside documents.',
            'Keep schemas modular and organized.',
            'Store MongoDB connection strings in environment variables.',
            'Close database connections gracefully during application shutdown.',
            'Select only the fields required by the API using projection/select.',
            'Use populate() carefully because fetching large related datasets can become expensive.',
            'Use transactions only when atomic multi-document operations are actually required.',
            'Use explain() to investigate slow queries and understand index usage.'
          ],

          note:
            'Important: .lean() generally improves read performance by returning plain JavaScript objects instead of full Mongoose documents, but those objects do not have Mongoose document methods such as save().'
        },

        {
          id: '18-D',
          letter: 'D',
          title: 'Folder Structure & Quick Comparison',

          code: `my-app/
│
├── config/
│   └── db.js
│
├── models/
│   ├── user.model.js
│   └── post.model.js
│
├── controllers/
│   ├── user.controller.js
│   └── post.controller.js
│
├── routes/
│   ├── user.routes.js
│   └── post.routes.js
│
├── middleware/
│   ├── auth.js
│   ├── validate.js
│   └── errorHandler.js
│
├── services/
│   └── user.service.js
│
├── app.js
├── server.js
├── .env
└── package.json`,

          bullets: [
            'config → database and application configuration.',
            'models → Mongoose schemas and models.',
            'controllers → request/response handling logic.',
            'routes → API endpoint definitions.',
            'middleware → authentication, validation, error handling and other reusable request processing.',
            'services → business logic that can be separated from controllers as the project grows.',
            'app.js → creates and configures the Express application.',
            'server.js → starts the HTTP server and database/application startup process.',
            '.env → stores environment-specific configuration such as the MongoDB connection string.'
          ],

          disadvantages: [
            'MongoDB → The actual NoSQL database that stores BSON documents and provides queries, indexes, aggregation, transactions and other database features.',
            'Mongoose → Node.js ODM that sits on top of MongoDB and provides schemas, models, validation, middleware, populate and convenient query APIs.',
            'MongoDB does not require Mongoose; Node.js can communicate with MongoDB using the official MongoDB driver.',
            'Mongoose is useful when you want application-level structure, validation, models and middleware around MongoDB.'
          ],

          note:
            'Mental model: Express handles HTTP → Mongoose handles application-level data modeling → MongoDB stores and processes the actual data.'
        }
      ]
    }
];
