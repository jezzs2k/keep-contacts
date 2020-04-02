const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth.middleware');
const Contacts = require('../model/contact.model');

// @router     GET  /api/contacts
// @desc       get contacts
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id }).sort({
      date: -1
    });
    return res.status(200).json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server Error');
  }
});

// @router     POST /api/contacts
// @desc       create a new user
// @access     Private
router.post(
  '/',
  [
    auth,
    check('name', 'Please enter your name!!!')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, type } = req.body;

    try {
      const newContact = new Contacts({
        name,
        phone,
        email,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.status(200).json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @router     PUT /api/contacts/:id
// @desc       Update a contacts
// @access     Private
router.put(
  '/:id',
  [
    auth,
    check('name', 'Please enter your name!!!')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const id = req.params.id;
    try {
      const contact = await Contacts.findByIdAndUpdate(
        { _id: id },
        {
          ...req.body
        }
      );

      res.status(200).json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @router     DELETE /api/contacts/:id
// @desc       delete a user
// @access     Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const contactDelete = await Contacts.findByIdAndDelete(id);

    res.status(200).json(contactDelete);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
