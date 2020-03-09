const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const path = require('path');
const fs = require('fs');

//. upload a preview photo
router.post('/preview', auth, (req, res) => {
  if (req.files === null) {
    return res.json('default.jpg');
  }

  const file = req.files.file;
  //my work
  file.name = Date.now() + path.extname(file.name);

  const dir = `./client/public/uploads/${req.user.id}`;

  if (fs.existsSync(dir)) {
    console.log('Directory exists.');
  } else {
    console.log('Directory does not exist.');
    fs.mkdirSync(dir);
  }
  file.mv(`${dir}/` + file.name);
  const previewPath = `${req.user.id}/` + file.name;

  res.json(previewPath);
  //ends here
});

// .upload profile photo

router.post('/upload', auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  //my work
  file.name = Date.now() + path.extname(file.name);

  const dir = `./client/public/uploads/${req.user.id}`;

  if (fs.existsSync(dir)) {
    console.log('Directory exists.');
  } else {
    console.log('Directory does not exist.');
    fs.mkdirSync(dir);
  }
  file.mv(`${dir}/` + file.name);
  const foundProfile = await Profile.findOne({
    user: req.user.id,
  });
  foundProfile.profilephoto = `${req.user.id}/` + file.name;
  await foundProfile.save();
  res.json(foundProfile);
  //ends here
});
router.get('/profilephoto', auth, async (req, res) => {
  //
  const foundProfile = await Profile.findOne({
    user: req.user.id,
  });
  const profilePhoto = foundProfile.profilephoto;

  //
  // res.sendFile(`./${req.params.id}/524532_1.jpg`, {
  //   root: './client/public/uploads',
  // });
  res.sendFile(`/${profilePhoto}`, {
    root: './client/public/uploads',
  });
});

module.exports = router;
