require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    const user = await User.findOne({ email: 'manager@zentrax.com' }).select('+password');
    console.log('user', !!user);
    if (user) {
      console.log('email', user.email);
      console.log('role', user.role);
      console.log('pwdlen', user.password ? user.password.length : '<none>');
      const match = await user.matchPassword('manager123');
      console.log('match', match);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
