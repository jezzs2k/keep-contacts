const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../middleware/auth.middleware');
const User = require('../model/user.model');

// @router     GET  /api/auth
// @desc       get login in user
// @access      Private
router.get('/', auth, async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router     POST  /api/auth
// @desc       Auth user & get tokenn
// @access      Public
router.post(
  '/',
  [
    check('email', 'Please enter email').isEmail(),
    check('password', 'Password must be 6 or more characters.').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'User invalid?' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Err');
    }
  }
);

module.exports = router;
