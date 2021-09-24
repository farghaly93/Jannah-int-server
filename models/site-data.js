const mongoose = require('mongoose');

const siteData = mongoose.Schema({
  siteName: {
    type: String,
    default: "Site name"
  },
  description: {
    type: String,
    default: "Site description"
  },
  field: {
    type: String,
    default: "Company field"
  },
  email: {
    type: String,
    default: "email@mail.com"
  },
  instructions: {
    type: String,
    default: "unstruction 1, instruction 2, instruction 3",
  },
  stripe_publishable_api_key: {
    type: String,
    default: "pk_**************************"
  },
  stripe_secret_key: {
    type: String,
    default: "sk_**************************"
  },
  facebook: {
    type: String,
    default: "www.facebook?profile=34344564523436878"
  },
  whatsapp: {
    type: String,
    default: "014457896482"
  },
  phone: {
    type: String,
    default: "014457896482"
  },
  image: {
    type: String,
    default: "http://res.cloudinary.com/farghaly-developments/raw/upload/v1632384669/platforms-control/site_image.jpeg"
  },
  video: {
    type: String,
    default: "http://res.cloudinary.com/farghaly-developments/raw/upload/v1632139738/platforms-control/site_video.mp4"
  }
});

module.exports = mongoose.model('siteDatas', siteData);
