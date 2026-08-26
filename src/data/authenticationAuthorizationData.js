export const authSections = [
    {
        id: 'sec-19',
        category: 'auth',
        number: '1',
        title: 'Authentication & Authorization Fundamentals',
        color: 'red',
        borderColor: 'border-red-300',
        bgColor: 'bg-red-50/70',
        textColor: 'text-red-700',
        headerBg: 'bg-pink-100/50',

        description:
            'Authentication and authorization are two different security concepts used to protect applications. Authentication verifies who the user is, while authorization determines what the authenticated user is allowed to access or perform.',

        badge:
            'Authentication → Who are you?\\nAuthorization → What can you access?',

        cards: [
            {
                id: '19-A',
                letter: 'A',
                title: 'What is Authentication?',

                bullets: [
                    'Authentication is the process of verifying the identity of a user or system.',
                    'It answers the question: "Who are you?"',
                    'A user commonly proves their identity using credentials such as email/password, OTP, OAuth, biometrics or another authentication mechanism.',
                    'After successful authentication, the server establishes some form of authenticated state or issues a credential/token.',
                    'Authentication normally happens before authorization.',
                    'Example: A user enters email and password, the server verifies them and identifies the user as Saurabh.'
                ]
            },

            {
                id: '19-B',
                letter: 'B',
                title: 'What is Authorization?',

                bullets: [
                    'Authorization determines what an authenticated user is allowed to do.',
                    'It answers the question: "What are you allowed to access or perform?"',
                    'Authorization usually happens after authentication.',
                    'Permissions can depend on the user role, ownership of a resource, subscription level or other application rules.',
                    'Example: A logged-in admin can delete users, while a normal user cannot.',
                    'Authorization should always be enforced on the server, not only in the frontend.'
                ]
            },

            {
                id: '19-C',
                letter: 'C',
                title: 'Authentication vs Authorization',

                methods: [
                    {
                        name: 'Authentication',
                        desc: 'Verifies the identity of the user.'
                    },
                    {
                        name: 'Authorization',
                        desc: 'Determines what the authenticated user is allowed to access or perform.'
                    },
                    {
                        name: 'Authentication Example',
                        desc: 'Checking whether email/password credentials are valid.'
                    },
                    {
                        name: 'Authorization Example',
                        desc: 'Checking whether the authenticated user has the admin role before deleting a user.'
                    },
                    {
                        name: 'Authentication Failure',
                        desc: 'Usually results in 401 Unauthorized.'
                    },
                    {
                        name: 'Authorization Failure',
                        desc: 'Usually results in 403 Forbidden.'
                    }
                ]
            },

            {
                id: '19-D',
                letter: 'D',
                title: 'Basic Authentication Flow',

                flow: {
                    title: 'Authentication Flow',
                    steps: [
                        'User enters credentials.',
                        'Client sends credentials securely to the server.',
                        'Server validates the input.',
                        'Server finds the user account.',
                        'Password is compared with the stored password hash.',
                        'If credentials are valid → authentication succeeds.',
                        'Server creates an authenticated session or issues a token.',
                        'Client uses that authentication state for future protected requests.'
                    ]
                }
            },

            {
                id: '19-E',
                letter: 'E',
                title: 'Passwords & Password Hashing',

                bullets: [
                    'Passwords should NEVER be stored as plain text in the database.',
                    'A password should be transformed into a secure one-way hash before storage.',
                    'During login, the submitted password is compared against the stored hash.',
                    'Modern password hashing algorithms include bcrypt, scrypt and Argon2.',
                    'Hashing is different from encryption: a password hash is designed to be one-way.',
                    'A unique salt helps prevent attackers from using precomputed rainbow tables.',
                    'Never store or log raw passwords.'
                ],

                code: `const bcrypt = require('bcrypt');

const password = 'mySecretPassword';

// Hash password before storing it
const hash = await bcrypt.hash(password, 12);

// Compare during login
const isMatch = await bcrypt.compare(
  password,
  hash
);

console.log(isMatch); // true`
            },

            {
                id: '19-F',
                letter: 'F',
                title: 'HTTP Status Codes for Authentication',

                methods: [
                    {
                        name: '200 OK',
                        desc: 'Request succeeded.'
                    },
                    {
                        name: '201 Created',
                        desc: 'A new resource was successfully created, commonly after registration.'
                    },
                    {
                        name: '400 Bad Request',
                        desc: 'Request data is invalid or malformed.'
                    },
                    {
                        name: '401 Unauthorized',
                        desc: 'Authentication is required or the supplied authentication credentials are invalid.'
                    },
                    {
                        name: '403 Forbidden',
                        desc: 'The user is authenticated but does not have permission to perform the requested action.'
                    },
                    {
                        name: '404 Not Found',
                        desc: 'Requested resource or route does not exist.'
                    }
                ]
            },

            {
                id: '19-G',
                letter: 'G',
                title: 'Important Security Rules',

                advantages: [
                    'Never store plain-text passwords.',
                    'Always use HTTPS in production.',
                    'Validate authentication input.',
                    'Use secure password hashing algorithms.',
                    'Keep authentication credentials and secrets out of source code.',
                    'Enforce authorization on the backend.',
                    'Use short-lived credentials where appropriate.',
                    'Handle authentication errors without exposing sensitive information.'
                ]
            }
        ]
    },

    {
        id: 'sec-20',
        category: 'auth',
        number: '2',
        title: 'Session-Based Authentication & Cookies',
        color: 'blue',
        borderColor: 'border-blue-300',
        bgColor: 'bg-blue-50/70',
        textColor: 'text-blue-700',
        headerBg: 'bg-blue-100/50',

        description:
            'Session-based authentication stores authentication state on the server. After login, the server creates a session and sends a session identifier to the browser, usually through a cookie. The browser automatically sends that cookie with future requests.',

        badge:
            'Login → Server creates session → Cookie stores session ID\\nRequest → Cookie → Server finds session → User identified',

        cards: [
            {
                id: '20-A',
                letter: 'A',
                title: 'What is a Session?',

                bullets: [
                    'A session represents an authenticated user state maintained by the server.',
                    'After successful login, the server creates a unique session ID.',
                    'The session data is stored server-side, commonly in Redis or another database/session store.',
                    'The browser usually receives only the session ID.',
                    'The session ID is commonly stored in an HTTP cookie.',
                    'On future requests, the server reads the session ID and retrieves the associated user/session data.'
                ]
            },

            {
                id: '20-B',
                letter: 'B',
                title: 'Session Authentication Flow',

                flow: {
                    title: 'Session Flow',
                    steps: [
                        'User submits email and password.',
                        'Server validates the credentials.',
                        'Server creates a session record.',
                        'Server generates a unique session ID.',
                        'Server sends the session ID using a cookie.',
                        'Browser stores the cookie.',
                        'Browser automatically sends the cookie with future requests.',
                        'Server reads the session ID.',
                        'Server finds the session and identifies the user.',
                        'Protected route continues if the session is valid.'
                    ]
                }
            },

            {
                id: '20-C',
                letter: 'C',
                title: 'Cookie Basics',

                bullets: [
                    'A cookie is small data stored by the browser and associated with a website.',
                    'Cookies can be automatically sent with matching HTTP requests.',
                    'Cookies are commonly used to store session IDs or authentication tokens.',
                    'Cookies can have security attributes that control how they are transmitted and accessed.',
                    'Cookies are different from sessions: the cookie is stored on the client, while session state is generally stored on the server.'
                ],

                code: `res.cookie('sessionId', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000
});`
            },

            {
                id: '20-D',
                letter: 'D',
                title: 'Important Cookie Security Flags',

                methods: [
                    {
                        name: 'httpOnly',
                        desc: 'Prevents JavaScript from reading the cookie through document.cookie. Helps reduce token/session theft through some XSS attacks.'
                    },
                    {
                        name: 'secure',
                        desc: 'Cookie is sent only over HTTPS connections. Use this in production.'
                    },
                    {
                        name: 'sameSite',
                        desc: 'Controls when cookies are sent in cross-site requests and helps reduce CSRF risk.'
                    },
                    {
                        name: 'maxAge / expires',
                        desc: 'Controls how long the cookie remains valid.'
                    },
                    {
                        name: 'domain',
                        desc: 'Controls which domain can receive the cookie.'
                    },
                    {
                        name: 'path',
                        desc: 'Controls which URL paths can receive the cookie.'
                    }
                ]
            },

            {
                id: '20-E',
                letter: 'E',
                title: 'Express Session Example',

                code: `const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  }
}));

app.post('/login', async (req, res) => {
  // Verify user credentials...

  req.session.userId = user._id;

  res.json({
    message: 'Login successful'
  });
});`,

                bullets: [
                    'express-session creates and manages server-side sessions.',
                    'req.session can be used to store authentication-related session data.',
                    'The browser receives a session cookie.',
                    'In production, use a proper external session store instead of relying on in-memory session storage.',
                    'Never put large amounts of user data directly into the session.'
                ]
            },

            {
                id: '20-F',
                letter: 'F',
                title: 'Session Logout',

                code: `app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: 'Logout failed'
      });
    }

    res.clearCookie('connect.sid');

    res.json({
      message: 'Logged out successfully'
    });
  });
});`,

                bullets: [
                    'Logout should invalidate the server-side session.',
                    'Destroying the session prevents the old session ID from authenticating future requests.',
                    'The authentication cookie should also be cleared from the browser.',
                    'Simply hiding the user interface is not sufficient for logout.'
                ]
            },

            {
                id: '20-G',
                letter: 'G',
                title: 'Advantages / Disadvantages',

                advantages: [
                    'Authentication state is controlled by the server.',
                    'Easy to invalidate a session immediately.',
                    'The client does not need to store the complete authentication state.',
                    'HttpOnly cookies can reduce exposure to JavaScript-based token theft.',
                    'Works naturally with traditional server-rendered applications.'
                ],

                disadvantages: [
                    'The server or shared session store must maintain session state.',
                    'Scaling across multiple servers requires shared session storage or sticky sessions.',
                    'Session storage adds infrastructure and database/Redis management.',
                    'Cross-origin frontend/backend configurations require careful cookie and CORS configuration.',
                    'CSRF protection may be required when authentication uses cookies.'
                ]
            }
        ]
    },

    {
        id: 'sec-21',
        category: 'auth',
        number: '3',
        title: 'Token-Based Authentication & JWT',
        color: 'green',
        borderColor: 'border-emerald-300',
        bgColor: 'bg-emerald-50/70',
        textColor: 'text-emerald-700',
        headerBg: 'bg-emerald-100/50',

        description:
            'Token-based authentication allows a server to issue a signed token after successful login. The client sends the token with protected requests, allowing the server to verify the token and identify the user without maintaining traditional server-side session state.',

        badge:
            'JWT = Header + Payload + Signature\\nAuthorization: Bearer <token>',

        cards: [
            {
                id: '21-A',
                letter: 'A',
                title: 'What is JWT?',

                bullets: [
                    'JWT stands for JSON Web Token.',
                    'A JWT is a compact, URL-safe token containing claims about a user or system.',
                    'JWTs are commonly used for stateless authentication.',
                    'The server signs the token so it can detect whether the token has been modified.',
                    'A JWT is encoded and signed; it is NOT automatically encrypted.',
                    'Sensitive information such as passwords or secrets should never be placed in the payload.'
                ]
            },

            {
                id: '21-B',
                letter: 'B',
                title: 'JWT Structure',

                code: `header.payload.signature

Example:

eyJhbGciOiJIUzI1NiJ9.
eyJzdWIiOiIxMjMiLCJyb2xlIjoidXNlciJ9.
signature`,

                methods: [
                    {
                        name: 'Header',
                        desc: 'Contains metadata such as the signing algorithm and token type.'
                    },
                    {
                        name: 'Payload',
                        desc: 'Contains claims such as user ID, role, issuer and expiration time.'
                    },
                    {
                        name: 'Signature',
                        desc: 'Created using the header, payload and secret/private key to verify token integrity.'
                    }
                ]
            },

            {
                id: '21-C',
                letter: 'C',
                title: 'Creating a JWT',

                code: `const jwt = require('jsonwebtoken');

const token = jwt.sign(
  {
    userId: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '15m'
  }
);

res.json({ token });`,

                bullets: [
                    'jwt.sign() creates a signed JWT.',
                    'The payload contains claims required by the application.',
                    'The secret or private key must be stored securely.',
                    'An expiration time should normally be configured.',
                    'Never hardcode JWT secrets in source code.',
                    'The JWT should not contain sensitive secrets such as passwords.'
                ]
            },

            {
                id: '21-D',
                letter: 'D',
                title: 'Verifying a JWT',

                code: `const jwt = require('jsonwebtoken');

try {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  console.log(decoded);
} catch (error) {
  // Invalid or expired token
}`,

                bullets: [
                    'jwt.verify() checks whether the token signature is valid.',
                    'It also validates registered claims such as expiration when present.',
                    'A modified, invalid or expired token should be rejected.',
                    'Never trust the decoded payload before verifying the token.',
                    'The server should determine authorization from verified claims and/or trusted database state.'
                ]
            },

            {
                id: '21-E',
                letter: 'E',
                title: 'Access Token with Bearer Authentication',

                code: `Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...`,

                flow: {
                    title: 'Access Token Flow',
                    steps: [
                        'User logs in with valid credentials.',
                        'Server verifies the credentials.',
                        'Server creates a short-lived access token.',
                        'Client stores the token according to the application security strategy.',
                        'Client sends the token with protected requests.',
                        'Server verifies the token.',
                        'Server identifies the user.',
                        'Authorization middleware checks permissions.',
                        'Protected controller executes.'
                    ]
                }
            },

            {
                id: '21-F',
                letter: 'F',
                title: 'JWT Middleware in Express',

                code: `const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authentication required'
    });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
}`,

                bullets: [
                    'Authentication middleware runs before protected routes.',
                    'The middleware extracts the token from the Authorization header.',
                    'The token is verified before req.user is populated.',
                    'Protected routes can use req.user after authentication succeeds.',
                    'Authentication middleware should not decide detailed permissions; authorization middleware can handle that separately.'
                ]
            },

            {
                id: '21-G',
                letter: 'G',
                title: 'Advantages / Disadvantages',

                advantages: [
                    'Can provide stateless authentication.',
                    'Useful for REST APIs and distributed applications.',
                    'The server does not necessarily need to store every active access token.',
                    'Works well across separate frontend and backend applications.',
                    'Token claims can carry useful identity information.'
                ],

                disadvantages: [
                    'A stolen token can be used until it expires or is otherwise invalidated.',
                    'Immediate token revocation is more complicated than destroying a server session.',
                    'JWT payloads are readable unless additional encryption is used.',
                    'Large JWT payloads increase request size.',
                    'Poor token storage decisions can increase XSS or token-theft risk.',
                    'JWT does not automatically provide authorization; permissions still need to be checked.'
                ]
            }
        ]
    },

    {
        id: 'sec-22',
        category: 'auth',
        number: '4',
        title: 'Access Tokens, Refresh Tokens & Token Rotation',
        color: 'purple',
        borderColor: 'border-purple-300',
        bgColor: 'bg-purple-50/70',
        textColor: 'text-purple-700',
        headerBg: 'bg-purple-100/50',

        description:
            'A common modern authentication architecture uses a short-lived access token for API requests and a longer-lived refresh token to obtain new access tokens. This limits the damage caused by an exposed access token while allowing users to remain logged in.',

        badge:
            'Access Token → Short-lived\\nRefresh Token → Long-lived\\nAccess expires → Refresh → New Access',

        cards: [
            {
                id: '22-A',
                letter: 'A',
                title: 'Why Use Access + Refresh Tokens?',

                bullets: [
                    'Access tokens should usually have a relatively short lifetime.',
                    'Short expiration limits the period during which a stolen access token can be used.',
                    'Users should not have to enter their password every time the access token expires.',
                    'A refresh token can be used to request a new access token.',
                    'This creates a balance between security and user experience.',
                    'Refresh tokens should be protected more carefully because they have a longer lifetime.'
                ]
            },

            {
                id: '22-B',
                letter: 'B',
                title: 'Access Token vs Refresh Token',

                methods: [
                    {
                        name: 'Access Token',
                        desc: 'Short-lived credential used to access protected APIs.'
                    },
                    {
                        name: 'Refresh Token',
                        desc: 'Longer-lived credential used to obtain a new access token.'
                    },
                    {
                        name: 'Access Token Lifetime',
                        desc: 'Usually short, such as minutes rather than days.'
                    },
                    {
                        name: 'Refresh Token Lifetime',
                        desc: 'Usually longer, depending on the security requirements of the application.'
                    },
                    {
                        name: 'Purpose',
                        desc: 'Access token → API access. Refresh token → obtain a new access token.'
                    }
                ]
            },

            {
                id: '22-C',
                letter: 'C',
                title: 'Login with Access & Refresh Tokens',

                code: `const accessToken = jwt.sign(
  { userId: user._id },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: '15m' }
);

const refreshToken = jwt.sign(
  { userId: user._id },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: '7d' }
);

res
  .cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  })
  .json({ accessToken });`,

                bullets: [
                    'The access token is short-lived and used for API requests.',
                    'The refresh token is protected more strongly and should not be sent with every API request.',
                    'A common design is to store the refresh token in an HttpOnly Secure cookie.',
                    'Refresh tokens should ideally be revocable and tracked server-side.'
                ]
            },

            {
                id: '22-D',
                letter: 'D',
                title: 'Refreshing an Access Token',

                code: `app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      message: 'Refresh token required'
    });
  }

  // Verify refresh token
  // Find session/token record
  // Issue a new access token

  res.json({
    accessToken: newAccessToken
  });
});`,

                flow: {
                    title: 'Refresh Flow',
                    steps: [
                        'Access token expires.',
                        'Client sends refresh request.',
                        'Server receives refresh token.',
                        'Server verifies the refresh token.',
                        'Server checks whether the refresh token/session is still valid.',
                        'Server issues a new access token.',
                        'Client retries the original protected request.'
                    ]
                }
            },

            {
                id: '22-E',
                letter: 'E',
                title: 'Refresh Token Rotation',

                bullets: [
                    'Refresh token rotation means issuing a new refresh token whenever a refresh operation succeeds.',
                    'The old refresh token is invalidated or marked as used.',
                    'This reduces the usefulness of a stolen refresh token.',
                    'The server can detect reuse of an already-rotated refresh token.',
                    'Detected token reuse can trigger revocation of the related session/token family.',
                    'Rotation is especially useful for applications where long-lived sessions are required.'
                ]
            },

            {
                id: '22-F',
                letter: 'F',
                title: 'Logout & Token Revocation',

                bullets: [
                    'Logout should invalidate the refresh token/session on the server.',
                    'The refresh-token cookie should be cleared.',
                    'A short-lived access token may remain technically valid until expiration unless a server-side revocation mechanism is used.',
                    'For high-security applications, access-token revocation can be implemented using token identifiers or a session/token blacklist.',
                    'Refresh token rotation and server-side storage make session revocation easier to manage.'
                ]
            },

            {
                id: '22-G',
                letter: 'G',
                title: 'Common Token Architecture',

                flow: {
                    title: 'Complete Flow',
                    steps: [
                        'Login → verify credentials.',
                        'Issue short-lived access token.',
                        'Issue long-lived refresh token.',
                        'Access token → protected API requests.',
                        'Access token expires.',
                        'Refresh token → request new access token.',
                        'Rotate refresh token when appropriate.',
                        'Logout → revoke refresh token/session.',
                        'Future refresh attempts are rejected.'
                    ]
                }
            }
        ]
    },

    {
        id: 'sec-23',
        category: 'auth',
        number: '5',
        title: 'Authorization, Roles, Permissions & RBAC',
        color: 'orange',
        borderColor: 'border-amber-300',
        bgColor: 'bg-amber-50/70',
        textColor: 'text-amber-800',
        headerBg: 'bg-amber-100/50',

        description:
            'Authorization controls which resources and actions an authenticated user can access. Role-Based Access Control (RBAC) groups permissions into roles such as user, moderator and admin, making authorization easier to manage in larger applications.',

        badge:
            'Authentication → Identify user\\nAuthorization → Check permission',

        cards: [
            {
                id: '23-A',
                letter: 'A',
                title: 'What is Authorization?',

                bullets: [
                    'Authorization is the process of deciding whether an authenticated user can perform a specific action.',
                    'Authorization should be checked after authentication.',
                    'Examples include reading a post, editing your own profile, deleting another user or accessing an admin dashboard.',
                    'Authorization can depend on roles, permissions, resource ownership or application-specific rules.',
                    'The backend must enforce authorization because frontend checks can be bypassed.'
                ]
            },

            {
                id: '23-B',
                letter: 'B',
                title: 'Role-Based Access Control (RBAC)',

                bullets: [
                    'RBAC assigns users one or more roles.',
                    'Each role represents a set of permissions.',
                    'Common roles include user, moderator, editor and admin.',
                    'RBAC simplifies authorization because the application can check the role instead of manually checking many permissions.',
                    'Roles should represent application responsibilities, not authentication status.'
                ],

                code: `User
{
  name: 'Saurabh',
  role: 'admin'
}

Roles:

user      → read content
editor    → create + edit content
moderator → moderate content
admin     → manage users + system`
            },

            {
                id: '23-C',
                letter: 'C',
                title: 'Role-Based Authorization Middleware',

                code: `function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden'
      });
    }

    next();
  };
}

app.delete(
  '/users/:id',
  requireAuth,
  requireRole('admin'),
  deleteUser
);`,

                bullets: [
                    'requireAuth verifies that the user is authenticated.',
                    'requireRole checks whether the authenticated user has an allowed role.',
                    'Authentication and authorization remain separate responsibilities.',
                    'The authorization check happens before the protected controller executes.'
                ]
            },

            {
                id: '23-D',
                letter: 'D',
                title: 'Permission-Based Authorization',

                bullets: [
                    'Instead of checking only roles, an application can define individual permissions.',
                    'Permissions can represent actions such as user:read, user:update, post:create or post:delete.',
                    'Roles can then contain multiple permissions.',
                    'Permission-based systems provide more flexibility than simple role checks.',
                    'RBAC and permissions can be combined.'
                ],

                code: `const permissions = {
  user: [
    'post:read'
  ],

  editor: [
    'post:read',
    'post:create',
    'post:update'
  ],

  admin: [
    'post:read',
    'post:create',
    'post:update',
    'post:delete',
    'user:manage'
  ]
};`
            },

            {
                id: '23-E',
                letter: 'E',
                title: 'Resource Ownership',

                bullets: [
                    'Authorization can depend on whether the user owns the requested resource.',
                    "A user may be allowed to update their own profile but not another user's profile.",
                    'Ownership checks should be performed on the server.',
                    'Never trust a userId supplied by the frontend without verifying ownership.',
                    'Resource ownership is often combined with RBAC.'
                ],

                code: `const post = await Post.findById(req.params.id);

if (!post) {
  return res.status(404).json({
    message: 'Post not found'
  });
}

if (
  post.author.toString() !==
  req.user.id
) {
  return res.status(403).json({
    message: 'You can only edit your own post'
  });
}`
            },

            {
                id: '23-F',
                letter: 'F',
                title: '401 vs 403',

                methods: [
                    {
                        name: '401 Unauthorized',
                        desc: 'The request does not contain valid authentication credentials or authentication is required.'
                    },
                    {
                        name: '403 Forbidden',
                        desc: 'The server knows who the user is, but the user does not have permission to perform the requested action.'
                    }
                ],

                flow: {
                    title: 'Decision',
                    steps: [
                        'Is the user authenticated?',
                        'NO → 401 Unauthorized.',
                        'YES → Continue to authorization.',
                        'Does the user have the required permission?',
                        'NO → 403 Forbidden.',
                        'YES → Allow the operation.'
                    ]
                }
            },

            {
                id: '23-G',
                letter: 'G',
                title: 'Authorization Best Practices',

                advantages: [
                    'Always enforce permissions on the backend.',
                    'Keep authentication and authorization as separate middleware responsibilities.',
                    'Use roles or permissions consistently across protected routes.',
                    'Check resource ownership when required.',
                    'Return 401 for authentication failures and 403 for permission failures.',
                    'Do not trust role or permission values sent by the client.',
                    'Follow least privilege: users should receive only the permissions they need.'
                ]
            }
        ]
    },

    {
        id: 'sec-24',
        category: 'auth',
        number: '6',
        title: 'Complete Authentication & Authorization System',
        color: 'teal',
        borderColor: 'border-teal-300',
        bgColor: 'bg-teal-50/70',
        textColor: 'text-teal-700',
        headerBg: 'bg-teal-100/50',

        description:
            'A production authentication system combines credential verification, password hashing, authentication state, token or session management, authorization middleware, secure cookies, validation and proper error handling.',

        badge:
            'Register → Login → Authenticate → Authorize → Protected Resource',

        cards: [
            {
                id: '24-A',
                letter: 'A',
                title: 'Complete Register Flow',

                code: `app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input

  const existingUser =
    await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      message: 'User already exists'
    });
  }

  const passwordHash =
    await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: passwordHash
  });

  res.status(201).json({
    message: 'Registration successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});`,

                flow: {
                    title: 'Registration Flow',
                    steps: [
                        'Receive registration data.',
                        'Validate input.',
                        'Check whether the email already exists.',
                        'Hash the password.',
                        'Store the user and password hash.',
                        'Never return the password or password hash.',
                        'Return a safe user response.'
                    ]
                }
            },

            {
                id: '24-B',
                letter: 'B',
                title: 'Complete Login Flow',

                code: `app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  // Create session or tokens here

  res.json({
    message: 'Login successful'
  });
});`,

                bullets: [
                    'Validate login input.',
                    'Find the user account.',
                    'Compare the submitted password with the stored hash.',
                    'Do not reveal whether the email or password was incorrect.',
                    'Create the authentication state only after successful verification.',
                    'Return only the information required by the client.'
                ]
            },

            {
                id: '24-C',
                letter: 'C',
                title: 'Protected Route Architecture',

                code: `app.get(
  '/admin/users',
  requireAuth,
  requireRole('admin'),
  getAllUsers
);

app.patch(
  '/posts/:id',
  requireAuth,
  requireRole('editor', 'admin'),
  updatePost
);

app.delete(
  '/posts/:id',
  requireAuth,
  deleteOwnPost
);`,

                flow: {
                    title: 'Request Flow',
                    steps: [
                        'Client sends request.',
                        'Authentication middleware verifies identity.',
                        'req.user is attached after successful authentication.',
                        'Authorization middleware checks role/permission if required.',
                        'Resource ownership is checked when necessary.',
                        'Controller executes the operation.',
                        'Response is returned to the client.'
                    ]
                }
            },

            {
                id: '24-D',
                letter: 'D',
                title: 'Security Best Practices',

                bullets: [
                    'Use HTTPS in production.',
                    'Hash passwords with bcrypt, scrypt or Argon2.',
                    'Never store plain-text passwords.',
                    'Use strong secrets and keep them in environment variables.',
                    'Use short-lived access tokens when using token-based authentication.',
                    'Protect refresh tokens carefully and consider rotation.',
                    'Use HttpOnly, Secure and appropriate SameSite cookie settings when using cookies.',
                    'Validate and sanitize authentication input.',
                    'Implement rate limiting on login and sensitive authentication endpoints.',
                    'Do not reveal whether a specific email exists through overly detailed login errors.',
                    'Enforce authorization on the backend.',
                    'Apply the principle of least privilege.',
                    'Invalidate sessions or refresh tokens during logout.',
                    'Never log passwords, tokens or other sensitive authentication credentials.'
                ]
            },

            {
                id: '24-E',
                letter: 'E',
                title: 'Common Authentication Attacks',

                methods: [
                    {
                        name: 'Brute Force',
                        desc: 'Attacker repeatedly tries passwords. Use strong password policies, rate limiting and account protection.'
                    },
                    {
                        name: 'Credential Stuffing',
                        desc: 'Attacker uses leaked username/password combinations from another service. Encourage unique passwords and use rate limiting.'
                    },
                    {
                        name: 'Session Hijacking',
                        desc: 'Attacker obtains a valid session identifier or token and uses it as the victim.'
                    },
                    {
                        name: 'XSS',
                        desc: 'Injected JavaScript can steal sensitive client-side data. Use output encoding, CSP and secure token/cookie storage strategies.'
                    },
                    {
                        name: 'CSRF',
                        desc: 'A malicious site attempts to cause an authenticated browser to send an unwanted request. SameSite cookies and CSRF protection can help.'
                    },
                    {
                        name: 'Token Theft',
                        desc: 'A stolen access or refresh token can be abused. Use HTTPS, short access-token lifetimes and secure refresh-token handling.'
                    }
                ]
            },

            {
                id: '24-F',
                letter: 'F',
                title: 'Authentication Architecture Comparison',

                methods: [
                    {
                        name: 'Session-Based',
                        desc: 'Server stores session state. Browser usually stores only a session ID in a cookie.'
                    },
                    {
                        name: 'JWT Access Token',
                        desc: 'Client sends a signed access token with protected requests. Server verifies the token.'
                    },
                    {
                        name: 'Access + Refresh Token',
                        desc: 'Short-lived access token handles API access while a refresh token obtains new access tokens.'
                    },
                    {
                        name: 'Cookie-Based Authentication',
                        desc: 'Authentication information is transmitted using browser cookies. It can be session-based or token-based.'
                    }
                ]
            },

            {
                id: '24-G',
                letter: 'G',
                title: 'Final Authentication & Authorization Flow',

                flow: {
                    title: 'Production Flow',
                    steps: [
                        'User registers an account.',
                        'Password is validated and securely hashed.',
                        'User logs in with credentials.',
                        'Server verifies the password hash.',
                        'Server creates a session OR issues access/refresh tokens.',
                        'Client accesses a protected endpoint.',
                        'Authentication middleware verifies the session/token.',
                        'Server identifies the authenticated user.',
                        'Authorization middleware checks role/permission.',
                        'Resource ownership is checked if required.',
                        'Controller performs the operation.',
                        'Server returns the response.',
                        'Logout invalidates the session or refresh-token state.'
                    ]
                }
            },

            {
                id: '24-H',
                letter: 'H',
                title: 'Important Mental Model',

                note:
                    'Authentication answers "Who are you?" Authorization answers "What are you allowed to do?" Password hashing protects stored credentials. Sessions or tokens maintain authenticated state. Middleware verifies authentication and authorization before protected controllers execute. The frontend can improve user experience by hiding unavailable actions, but the backend must always enforce the actual security rules.'
            }
        ]
    }
];