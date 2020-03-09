const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Project = require('../../models/Project');

//. create my projects document

router.post('/', auth, async (req, res) => {
  try {
    const newProject = new Project({
      user: req.user.id,
      projects: [],
    });
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

//. add new project
router.put(
  '/newproj',
  [
    auth,
    [
      check('brief', 'Brief of project is required')
        .not()
        .isEmpty(),
      check(
        'badget',
        'Maximum Badget of project is required (3 or 4 digits number)'
      ).isNumeric({ no_symbols: true }),
      check('maxteam', 'Max team members is required').isNumeric({ no_symbols: true }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { brief, badget, maxteam } = req.body;
    const newProject = {
      brief,
      badget,
      maxteam,
    };
    try {
      const project = await Project.findOne({ user: req.user.id }); // user.id comes from the token
      project.projects.unshift(newProject);
      await project.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
//. delete a project by id
router.delete('/:proj_id', auth, async (req, res) => {
  try {
    const foundProject = await Project.findOne({ user: req.user.id });
    foundProject.projects = foundProject.projects.filter(
      proj => proj._id.toString() !== req.params.proj_id
    );
    await foundProject.save();
    res.json(foundProject);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// .get project by id from my projects
router.get('/myprojects/:proj_id', auth, async (req, res) => {
  try {
    const foundProject = await Project.findOne({ user: req.user.id });
    const myProject = foundProject.projects.filter(
      proj => proj._id.toString() === req.params.proj_id
    )[0];
    res.json(myProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//. update project by id
router.put(
  '/:proj_id',
  [
    auth,
    [
      check('brief', 'Brief of project is required')
        .not()
        .isEmpty(),
      check(
        'badget',
        'Maximum Badget of project is required (3 or 4 digits number'
      ).isNumeric({ no_symbols: true }),
      check('maxteam', 'Max team members is required').isNumeric({ no_symbols: true }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { brief, badget, maxteam } = req.body;
    try {
      const foundProject = await Project.findOne({ user: req.user.id });
      foundProject.projects = foundProject.projects.map(proj => {
        if (proj._id.toString() == req.params.proj_id) {
          proj.brief = brief;
          proj.badget = badget;
          proj.maxteam = maxteam;
        }
        return proj;
      });
      await foundProject.save();
      res.json(foundProject);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//. get my projects
router.get('/myprojects', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      user: req.user.id,
    });
    if (!project) {
      return res.status(400).json({ msg: 'there is no projects for this user' });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//. add a team member
router.put('/team/:proj_id', auth, async (req, res) => {
  const { id, name } = req.body;
  const member = { id, name, confirm: false };
  try {
    const foundProject = await Project.findOne({ user: req.user.id });
    let myProject;
    foundProject.projects = foundProject.projects.map(proj => {
      if (proj._id.toString() == req.params.proj_id) {
        proj.members.unshift(member);
        myProject = proj;
      }
      return proj;
    });
    await foundProject.save();
    res.json(myProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//. delete team member
router.put('/noteam/:proj_id', auth, async (req, res) => {
  const { id } = req.body;
  try {
    const foundProject = await Project.findOne({ user: req.user.id });
    let myProject;
    foundProject.projects = foundProject.projects.map(proj => {
      if (proj._id.toString() == req.params.proj_id) {
        proj.members = proj.members.filter(mem => mem.id != id);
        myProject = proj;
      }
      return proj;
    });
    await foundProject.save();
    res.json(myProject);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//. confirm a team member
router.put('/confirm/:proj_id', auth, async (req, res) => {
  const { userId, memberId } = req.body;
  try {
    const foundProject = await Project.findOne({ user: userId });
    let myProject;
    foundProject.projects = foundProject.projects.map(proj => {
      if (proj._id.toString() == req.params.proj_id) {
        proj.members = proj.members.map(member => {
          if (member.id == memberId) {
            member.confirm = true;
          }
          return member;
        });
        myProject = proj;
      }
      return proj;
    });
    await foundProject.save();
    res.json(myProject);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
