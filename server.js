const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

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
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 