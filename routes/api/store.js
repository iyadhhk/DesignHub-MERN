const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const { check, validationResult } = require('express-validator');
const Store = require('../../models/Store');

//. create my store

router.post('/', auth, async (req, res) => {
  try {
    const newStore = new Store({
      user: req.user.id,
      product: [],
    });
    const store = await newStore.save();
    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

//. get my store
router.get('/mystore', auth, async (req, res) => {
  try {
    const store = await Store.findOne({
      user: req.user.id,
    }).populate('user', ['firstname', 'lastname', 'address', 'phone']);
    if (!store) {
      return res.status(400).json({ msg: 'There is no store for this user' });
    }
    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//. add new product
router.put(
  '/product',
  [
    auth,
    [
      check('preview', 'preview is required')
        .not()
        .isEmpty(),
      check('description', 'description is required')
        .not()
        .isEmpty(),
      check('price', 'price  is required (max 3 digits number)').isNumeric({
        no_symbols: true,
      }),

      check('tags', 'tags  is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { preview, description, price, tags } = req.body;
    const newPro = {
      preview,
      description,
      price,
      tags,
    };
    try {
      const store = await Store.findOne({ user: req.user.id });
      store.product.unshift(newPro);
      await store.save();
      res.json(store);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
// .get product by id from my store
router.get('/product/:prod_id', auth, async (req, res) => {
  try {
    const foundStore = await Store.findOne({ user: req.user.id });
    const myProduct = foundStore.product.filter(
      proj => prod._id.toString() === req.params.prod_id
    )[0];
    res.json(myProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//. delete a product by id
router.delete('/product/:prod_id', auth, async (req, res) => {
  try {
    const foundStore = await Store.findOne({ user: req.user.id });
    foundStore.product = foundStore.product.filter(
      prod => prod._id.toString() !== req.params.prod_id
    );
    await foundStore.save();
    res.json(foundStore);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//. update product by its id
router.put(
  '/product/:prod_id',
  [
    auth,
    [
      check('description', 'description is required')
        .not()
        .isEmpty(),
      check('price', 'price  is required (max 3 digits number').isNumeric({
        no_symbols: true,
      }),
      check('tags', 'tags  is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { description, price, tags } = req.body;

    try {
      const foundStore = await Store.findOne({ user: req.user.id });
      foundStore.product = foundStore.product.map(prod => {
        if (prod._id.toString() == req.params.prod_id) {
          prod.description = description;
          prod.price = price;
          prod.tags = tags;
        }
        return prod;
      });
      await foundStore.save();
      res.json(foundStore);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//. get all stores
router.get('/', auth, async (req, res) => {
  try {
    const stores = await Store.find().populate('user', ['name']);
    res.json(stores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//. get store by user id
router.get('/products/:user_id', auth, async (req, res) => {
  try {
    const store = await Store.findOne({
      user: req.user.id,
    });
    if (!store) return res.status(400).json({ msg: 'store  is not found' });
    res.json(store);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'store not here found' });
    }
    res.status(500).send('Server Error');
  }
});
