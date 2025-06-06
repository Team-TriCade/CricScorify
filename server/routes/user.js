const express = require('express');
const User = require('../models/user');

const router = express.Router();
const {
  createUser,
  userSignIn,
  uploadProfile,
  signOut,
  updateUserProfile,
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
  validateUserUpdate,
} = require('../middlewares/validation/user');

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.get('/me', isAuth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ success: true, user });
});
router.put('/update-profile', isAuth, validateUserUpdate, updateUserProfile);

module.exports = router;
