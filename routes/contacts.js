const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// GET all contacts (Read All)
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch all contacts...');
    const contacts = await Contact.find();
    console.log(`Found ${contacts.length} contacts`);
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET single contact by ID (Read One)
router.get('/:id', async (req, res) => {
  try {
    console.log(`Attempting to fetch contact with ID: ${req.params.id}`);
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      console.log('Contact found:', contact);
      res.json(contact);
    } else {
      console.log('Contact not found');
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST new contact (Create)
router.post('/', async (req, res) => {
  try {
    console.log('Attempting to create new contact:', req.body);
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    });

    const newContact = await contact.save();
    console.log('Contact created successfully:', newContact);
    res.status(201).json(newContact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT update contact (Update)
router.put('/:id', async (req, res) => {
  try {
    console.log(`Attempting to update contact with ID: ${req.params.id}`);
    console.log('Update data:', req.body);
    
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      console.log('Contact not found for update');
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Update fields
    contact.firstName = req.body.firstName || contact.firstName;
    contact.lastName = req.body.lastName || contact.lastName;
    contact.email = req.body.email || contact.email;
    contact.favoriteColor = req.body.favoriteColor || contact.favoriteColor;
    contact.birthday = req.body.birthday || contact.birthday;

    const updatedContact = await contact.save();
    console.log('Contact updated successfully:', updatedContact);
    res.json(updatedContact);
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE contact (Delete)
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Attempting to delete contact with ID: ${req.params.id}`);
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      console.log('Contact not found for deletion');
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.deleteOne();
    console.log('Contact deleted successfully');
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 