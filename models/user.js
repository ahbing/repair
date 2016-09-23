'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  githubId: { type: String },
  accessToken: {type: String},
  profileUrl: { type: String  },
  displayName: { type: String },
  username: { type: String }, // github unique
  avatar_url: { type: String  },
  company: { type: String  },
  blog: { type: String  },
  location: { type: String  },
  email: { type: String },
  bio: { type: String  },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

UserSchema.index({email: 1}, {unique: true});
UserSchema.index({githubId: 1});
UserSchema.index({accessToken: 1});

const User = mongoose.model('User', UserSchema);
module.exports = User;
