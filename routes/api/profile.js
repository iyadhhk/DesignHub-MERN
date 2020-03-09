const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//? --------------done--------------------> Get current user Profile(my) <-----------------------------------//

//-@access   Private
// @route    GET api/profile/me
// @desc     Get current user profile

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['firstname', 'lastname', 'profession', 'address', 'phone']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//? -----------done------------------------> Create or Update profile <---------------------------------------//

//-@access   Private
// @route    POST api/profile;
// @desc     Create or update user profile

router.post(
  '/',

  auth,
  async (req, res) => {
    try {
      const newProfile = new Profile({
        user: req.user.id,
        profilephoto: 'default.jpg',
        service: [],
        qualification: [],
        experience: [],
        education: [],
      });

      const profile = await newProfile.save();
      // and as a response we send back the profile
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//. updatet hourly rate
router.put(
  '/me',
  [
    auth,
    [
      check('hourlyrate', 'Hourly rate is required (2 or 3 digits number)')
        .isNumeric({ no_symbols: true })
        .isLength({
          min: 2,
          max: 3,
        })
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { hourlyrate } = req.body;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      profile.hourlyrate = hourlyrate;
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
//? -------------------------------------> Get All Profiles <---------------------------------------//

//-@access   public
// @route    GET api/profile
// @desc     Get all profiles

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'firstname',
      'lastname',
      'profession',
      'address',
      'phone',
      ,
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//? -------------------------------------> Get profile by user id <---------------------------------------//

//-@access   public
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
      'firstname',
      'lastname',
      'profession',
      'address',
      'phone',
    ]);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//? -------------------------------------> Delete a profile, user & posts <---------------------------------------//

//-@access   private
// @route    DELETE api/profile
// @desc     Delete profile, user & posts

router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//? ----------done-------------------------> Add profile Service <---------------------------------------//

//-@access   private
// @route    PUT api/profile/service
// @desc     Add profile service

router.put(
  '/service',
  [
    auth,
    [
      check('title', 'Title is not Valid')
        .not()
        .isEmpty(),

      check('type', 'Type is not Valid')
        .not()
        .isEmpty(),

      check('cost', 'Cost is is not valid (2 to 4 digits number').isNumeric({
        no_symbols: true,
      }),
      // .isLength({
      //   min: 2,
      //   max: 4,
      // }),
      // .not()
      // .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, type, cost } = req.body;
    const newService = {
      title,
      type,
      cost,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id }); // user.id comes from the token
      profile.service.unshift(newService);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
//? -------------done---------------------> Delete service by id <---------------------------------------//

//.@access   private
// @route    DELETE api/profile/service/:serv_id
// @desc     Delete service from profile

router.delete('/service/:serv_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    //..... Remove and return filtered table
    foundProfile.service = foundProfile.service.filter(
      serv => serv._id.toString() !== req.params.serv_id
    );
    //..... Save changes to profile
    await foundProfile.save();
    res.json(foundProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//? -------------done---------------------> Update service by id <---------------------------------------//

//.@access   private
// @route    PUT api/profile/service/:serv_id
// @desc     put service from profile

router.put(
  '/service/:serv_id',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),

      check('type', 'Type is required')
        .not()
        .isEmpty(),

      check('cost', 'Cost is required (2 to 4 digits number)').isNumeric({
        no_symbols: true,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, type, cost } = req.body;
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.service = foundProfile.service.map(serv => {
        if (serv._id.toString() == req.params.serv_id) {
          serv.title = title;
          serv.type = type;
          serv.cost = cost;
        }
        return serv;
      });
      await foundProfile.save();
      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//? ------------done----------------------> Add profile qualification <---------------------------------------//

//-@access   private
// @route    PUT api/profile/qualification
// @desc     Add profile qualification

router.put(
  '/qualification',
  [
    auth,
    [
      check('certificate', 'Certificate is required')
        .not()
        .isEmpty(),
      check('organization', 'Organization is required')
        .not()
        .isEmpty(),
      check('description', 'Description  is required')
        .not()
        .isEmpty(),
      check('startyear', 'Starting year  is required').isNumeric({ no_symbols: true }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { certificate, organization, description, startyear } = req.body;
    const newQual = {
      certificate,
      organization,
      description,
      startyear,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id }); //. user.id comes from the token
      profile.qualification.unshift(newQual);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//? ------------done-----------------------> Delete qualification by id <---------------------------------------//

//-@access   private
// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile

router.delete('/qualification/:qual_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    //..... Remove and return filtered table
    foundProfile.qualification = foundProfile.qualification.filter(
      qual => qual._id.toString() !== req.params.qual_id
    );
    //..... Save changes to profile
    await foundProfile.save();
    res.json(foundProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//? -------------done---------------------> Update qualification by id <---------------------------------------//

//.@access   private
// @route    PUT api/profile/service/:serv_id
// @desc     put service from profile

router.put(
  '/qualification/:qual_id',
  [
    auth,
    [
      check('certificate', 'Certificate is required')
        .not()
        .isEmpty(),
      check('organization', 'Organization is required')
        .not()
        .isEmpty(),
      check('description', 'Description  is required')
        .not()
        .isEmpty(),
      check('startyear', 'Starting year  is required').isNumeric({ no_symbols: true }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { certificate, organization, description, startyear } = req.body;
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.qualification = foundProfile.qualification.map(qual => {
        if (qual._id.toString() == req.params.qual_id) {
          qual.certificate = certificate;
          qual.organization = organization;
          qual.description = description;
          qual.startyear = startyear;
        }
        return qual;
      });
      await foundProfile.save();
      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//? ---------------done--------------------> Add profile experience <---------------------------------------//

//-@access   private
// @route    PUT api/profile/experience
// @desc     Add profile experience

router.put(
  '/experience',
  [
    auth,
    [
      check('position', 'position is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('startyear', 'startyear date is required').isNumeric({ no_symbols: true }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { position, company, startyear, endyear, current, description } = req.body;
    const newExp = {
      position,
      company,
      startyear,
      endyear,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id }); //. user.id comes from the token
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//? --------------done--------------------> Delete experience by id <---------------------------------------//

//-@access   private
// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    //..... Remove and return filtered table
    foundProfile.experience = foundProfile.experience.filter(
      exp => exp._id.toString() !== req.params.exp_id
    );
    //..... Save changes to profile
    await foundProfile.save();
    res.json(foundProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//? -------------done---------------------> Update experience by id <---------------------------------------//

//.@access   private
// @route    PUT api/profile/service/:serv_id
// @desc     put service from profile

router.put(
  '/experience/:exp_id',
  [
    auth,
    [
      check('position', 'position is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('startyear', 'startyear date is required').isNumeric({ no_symbols: true }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { position, company, startyear, endyear, description } = req.body;
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.experience = foundProfile.experience.map(exp => {
        if (exp._id.toString() == req.params.exp_id) {
          exp.position = position;
          exp.company = company;
          exp.startyear = startyear;
          exp.endyear = endyear;

          exp.description = description;
        }
        return exp;
      });
      await foundProfile.save();
      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//? -----------done-----------------------> Add profile education <---------------------------------------//

//-@access   private
// @route    PUT api/profile/education
// @desc     Add profile education

router.put(
  '/education',
  [
    auth,
    [
      check('country', 'country is required')
        .not()
        .isEmpty(),
      check('college', 'college is required')
        .not()
        .isEmpty(),

      check('degree', 'degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'fieldofstudy is required')
        .not()
        .isEmpty(),
      check('startyear', 'startyear is required').isNumeric({ no_symbols: true }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { country, college, degree, fieldofstudy, startyear, endyear } = req.body;
    const newEdu = {
      country,
      college,
      degree,
      fieldofstudy,
      startyear,
      endyear,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id }); //. user.id comes from the token
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//? ---------------done--------------------> Delete education by id <---------------------------------------//

//-@access   private
// @route    DELETE api/profile/education/:exp_id
// @desc     Delete education from profile

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    //..... Remove and return filtered table
    foundProfile.education = foundProfile.education.filter(
      edu => edu._id.toString() !== req.params.edu_id
    );
    //..... Save changes to profile
    await foundProfile.save();
    res.json(foundProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

//? -------------done---------------------> Update Education by id <---------------------------------------//

//.@access   private
// @route    PUT api/profile/service/:serv_id
// @desc     put service from profile

router.put(
  '/education/:educ_id',
  [
    auth,
    [
      check('country', 'country is required')
        .not()
        .isEmpty(),
      check('college', 'college is required')
        .not()
        .isEmpty(),
      check('degree', 'degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'fieldofstudy is required')
        .not()
        .isEmpty(),
      check('startyear', 'startyear is required').isNumeric({ no_symbols: true }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { country, college, degree, fieldofstudy, startyear, endyear } = req.body;
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.education = foundProfile.education.map(educ => {
        if (educ._id.toString() == req.params.educ_id) {
          educ.country = country;
          educ.college = college;
          educ.degree = degree;
          educ.fieldofstudy = fieldofstudy;
          educ.startyear = startyear;
          educ.endyear = endyear;
        }
        return educ;
      });
      await foundProfile.save();
      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
