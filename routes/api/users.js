const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

//. updatet some info
router.put(
  '/myinfos',
  [
    auth,
    [
      check('region', 'Adress region is required').isAlpha(),
      check('phone', 'Phone is required (8 numbers)').isNumeric({ no_symbols: true }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { region, phone } = req.body;
    try {
      let user = await User.findOne({ _id: req.user.id });
      user.address.region = region;
      user.phone = phone;
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//. Route : Register a user
router.post(
  '/',
  [
    check('firstname', 'FirstName is required').isAlpha(),
    check('lastname', 'LastName is required').isAlpha(),
    check('profession', 'Profession is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('region', 'Adress region is required').isAlpha(),
    check('phone', 'Phone is required (8 numbers)').isNumeric({ no_symbols: true }),
    check('gender', 'Gender is required')
      .not()
      .isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      firstname,
      lastname,
      profession,
      email,
      region,
      details,
      phone,
      gender,
      password,
    } = req.body; // we get data from the request body
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      const address = { region, details };
      user = new User({
        firstname,
        lastname,
        profession,
        email,
        address,
        phone,
        gender,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save(); //return a promise so we add await in front of

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token }); // here we return the token to the user
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//. add myself to user work requests
router.put('/invite', auth, async (req, res) => {
  const { name, brief, id, projectId } = req.body;
  const friend = { name, brief, id: req.user.id, projectId };

  try {
    const currentUser = await User.findOne({ _id: id });

    currentUser.workrequests.unshift(friend);
    await currentUser.save();
    res.json(currentUser);
  } catch (error) {
    throw new Error(error);
  }
});

// . delete myself from user work requests
router.put('/caninvite', auth, async (req, res) => {
  const { id } = req.body;
  try {
    const currentUser = await User.findOne({ _id: id });

    currentUser.workrequests = currentUser.workrequests.filter(
      work => work.id != req.user.id
    );

    await currentUser.save();
    res.json(currentUser);
  } catch (error) {
    throw new Error(error);
  }
});
//.delete a work request
router.put('/deleteInvitation', auth, async (req, res) => {
  const { projectId } = req.body;
  try {
    const currentUser = await User.findOne({ _id: req.user.id });

    currentUser.workrequests = currentUser.workrequests.filter(
      work => work.projectId != projectId
    );
    await currentUser.save();
    res.json(currentUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
