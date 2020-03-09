const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const { check, validationResult } = require('express-validator');
const Portfolio = require('../../models/Portfolio');

// Get my PORTFOLIO(my)------------

//-@access   Private
// @route    GET api/profile/me
// @desc     Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      user: req.user.id,
    }).populate('user', ['firstname', 'lastname', 'address', 'phone']);

    console.log(portfolio);
    if (!portfolio) {
      return res.status(400).json({ msg: 'There is no portfolio for this user' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//. create my work PORTFOLIO CRRER ET TESTé

router.post('/', auth, async (req, res) => {
  try {
    const newPortfolio = new Portfolio({
      user: req.user.id,
      work: [],
    });
    const portfolio = await newPortfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//-@access   Private
// @route    POST api/store;
// @desc     Create or update user store

router.put(
  '/portfolio',
  [
    auth,
    [
      check('type', 'Type is required')
        .not()
        .isEmpty(),
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('preview', 'Preview  is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills are required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }
    const { type, title, description, preview, skills } = req.body;
    const newPortfo = {
      type,
      title,
      description,
      preview,
      skills,
    };
    try {
      const portfolio = await Portfolio.findOne({ user: req.user.id }); //. user.id comes from the token
      portfolio.work.unshift(newPortfo);
      await portfolio.save();
      res.json(portfolio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
//? -------------done---------------------> Delete product by id <---------------------------------------//

router.delete('/work/:port_id', auth, async (req, res) => {
  try {
    const foundPortfolio = await Portfolio.findOne({ user: req.user.id });
    //..... Remove and return filtered table
    foundPortfolio.work = foundPortfolio.work.filter(
      port => port._id.toString() !== req.params.port_id
    );
    //..... Save changes to profile
    await foundPortfolio.save();
    res.json(foundPortfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// .get Portfolio by id from portfolio
router.get('/work/:port_id', auth, async (req, res) => {
  try {
    const foundPortfolio = await Portfolio.findOne({ user: req.user.id });

    const myPortfolio = foundPortfolio.work.filter(
      port => port._id.toString() === req.params.port_id
    )[0];
    res.json(myPortfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//? -------------------------------------> Get All product of differents users<---------------------------------------//

//-@access   public
// @route    GET api/profile
// @desc     Get all profiles

router.get('/', auth, async (req, res) => {
  try {
    const works = await Portfolio.find().populate('user', ['firstname', 'lastname']);
    res.json(works);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//? -------------------------------------> Get product by user id <---------------------------------------//

//-@access   public
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID

router.get('/work/:user_id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      user: req.params.user_id,
    }).populate('user', ['firstname', 'lastname', 'address', 'phone']);
    if (!portfolio) return res.status(400).json({ msg: 'store  is not found' });
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'store not here found' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
//edit portfolio

router.put(
  '/work/:port_id',
  [
    auth,
    [
      check('type', 'type is required')
        .not()
        .isEmpty(),
      check('title', 'title  is required')
        .not()
        .isEmpty(),
      check('description', 'description  is required')
        .not()
        .isEmpty(),
      check('skills', 'skills  is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { type, title, description, skills } = req.body;

    try {
      const portfolio = await Portfolio.findOne({ user: req.user.id }); //. user.id comes from the token
      portfolio.work = portfolio.work.map(port => {
        if (port._id.toString() == req.params.port_id) {
          (port.type = type),
            (port.title = title),
            (port.description = description),
            (port.skills = skills);
        }
        return port;
      });
      await portfolio.save();
      res.json(portfolio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
