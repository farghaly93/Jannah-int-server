const mongoose = require('mongoose');

const siteData = mongoose.Schema({
  siteName: {
    type: String,
  },
  description: {
    type: String,
  },
  field: {
    type: String,
  },
  email: {
    type: String,
  },
  instructions: {
    type: String,
  },
  stripe_publishable_api_key: {
    type: String,
  },
  stripe_secret_key: {
    type: String,
  },
  facebook: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  phone: {
    type: String,
  },
  image: {
    type: String,
  },
  video: {
    type: String
  }
});

module.exports = mongoose.model('siteDatas', siteData);
