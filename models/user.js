const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  location: { type: String  },
  signature: { type: String  },
  profile: { type: String  },
  avatar: { type: String  },
  githubId: { type: String },
  githubUsername: { type: String },
  githubAccessToken: { type: String },
  create_at: { type: Date, default: Date.now },
  accessToken: {type: String},
});

UserSchema.index({email: 1}, {unique: true});
UserSchema.index({githubId: 1});
UserSchema.index({accessToken: 1});

const User = mongoose.model('User', UserSchema);
module.exports = User;
