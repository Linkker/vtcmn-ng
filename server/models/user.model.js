const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google'],
    required: true
  },
  local: {
    email: {
      type: String,
      min: [4, 'Too short, min is 4 characters'],
      max: [32, 'Too long, max is 32 characters'],
      unique: true,
      lowercase: true,
      //required: 'Email is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
      type: String,
      min: [4, 'Too short, min is 4 characters'],
      max: [32, 'Too long, max is 32 characters'],
      //required: 'Password is required'
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  group: {
    type: String,
    default:'none',
    enum:['none','tonghop','noidung','thehien','hkcn','trungtam'],
    lowercase: true
  },
  level: {
    type: String,
    default:'none',
    enum:['none','user','mod','admin','sa'],
    lowercase: true
  }
});

userSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.local.password);
}

userSchema.pre('save', function(next) {
  const user = this;
  if (this.method !== 'local') {
    next();
  }
  bcrypt.hash(user.local.password, 10, function(err, hash) {
    user.local.password = hash;
    next();
  });
});

/*userSchema.methods.isValidPassword = async function(requestedPassword) {
  try {
    return await bcrypt.compare(requestedPassword, this.local.password);
  } catch(error) {
    throw new Error(error);
  }
};

userSchema.pre('save', async function(next) {
  try {
    console.log('entered');
    if (this.method !== 'local') {
      next();
    }

    // Generate a salt
    //const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    //const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed version over original, plain text password
    const passwordHash = await bcrypt.hash(this.local.password, 10);
    this.local.password = passwordHash;
    console.log('exited');
    next();
  } catch(error) {
    next(error);
  }
});
*/

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
