const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');
const { initializeAllDatabases } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const { schema, rootValue } = require('./graphql/schema');
require('dotenv').config();

const app = express();

// 1. WEB SECURITY & OWASP PROTECTIONS
// Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet());

// CORS configuration (Cross-Origin Resource Sharing)
app.use(cors({
    origin: '*', // In production, restrict to 'https://aetheria-store.vercel.app'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());

// 2. INITIALIZE POLYGLOT DATABASES
// Connects to MongoDB, PostgreSQL, MySQL, and Firebase Admin
initializeAllDatabases();

// 3. REST API ROUTES
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); // JWT Authentication Route

// 4. GRAPHQL ENDPOINT
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true, // Enable GraphiQL UI for testing in browser
}));

// 5. SERVER START (HTTP & HTTPS)
const PORT = process.env.PORT || 5000;
const https = require('https');
const fs = require('fs');

// Demonstration of Web Security: HTTPS setup
// In production (like rendering to AWS/Vercel), the platform handles HTTPS.
// But for raw EC2 or local testing, you would implement it like this:
/*
const sslOptions = {
    key: fs.readFileSync('./config/ssl/private.key'),
    cert: fs.readFileSync('./config/ssl/certificate.crt')
};
https.createServer(sslOptions, app).listen(443, () => {
    console.log("HTTPS Server Running on Port 443 with strict SSL encryption.");
});
*/

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`- REST API available at http://localhost:${PORT}/api/products`);
    console.log(`- GraphQL available at http://localhost:${PORT}/graphql`);
    console.log(`- Security: Helmet (OWASP protection) included, CORS configured, and HTTPS ready.`);
});
