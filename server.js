const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection with more detailed logging
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'users' // Explicitly specify the database name
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  console.log('Database:', mongoose.connection.db.databaseName);
  console.log('Collections:', Object.keys(mongoose.connection.collections));
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1); // Exit if cannot connect to database
});

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/contacts', require('./routes/contacts'));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Contacts API',
    endpoints: {
      getAllContacts: '/api/contacts',
      getSingleContact: '/api/contacts/:id',
      createContact: '/api/contacts (POST)',
      updateContact: '/api/contacts/:id (PUT)',
      deleteContact: '/api/contacts/:id (DELETE)'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('MongoDB URI:', process.env.MONGODB_URI ? 'URI is set' : 'URI is not set');
}); 