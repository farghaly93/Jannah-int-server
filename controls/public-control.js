
const Visits = require("../models/visits");
const Systems = require("../models/systems");
const Categories = require("../models/categories");
const SiteData = require("../models/site-data");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const cloudinary = require('cloudinary').v2;
const siteData = require("../models/site-data");
cloudinary.config({
    cloud_name: 'farghaly-developments',
    api_key: '789929815277853',
    api_secret: 'GRYCOy1KymmaOkGu6BuPVNH0VLc'
})
const folder = "platforms-control";

function generatePassword() {
    const length = 24;
    let _id = "";
    const chars = ["1","2","3","4","5","6","7","8","9","0","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","_","-"]
      for(let i=0; i<length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        _id += chars[index];
      }
      console.log(_id);
      return _id;
    }

function uploadFile(file, fileName) {
    console.log(file.tempFilePath)
    // return;
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(fileName+'.'+file.mimetype.split("/")[1], (err, result) => {
            if(err) {console.log(err)}
            console.log(result);

        });
        cloudinary.uploader.upload_large(
            file.tempFilePath,
            
            {
                public_id : fileName+'.'+file.mimetype.split("/")[1],
                folder: folder
            },
            (err, result) => {
                if(err) return reject(err);
                return resolve(result.url);
            })
    })
}

exports.addVisit = async(req, res) => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const info = await Visits.find({month, year});
    if(info.length > 0) 
    await Visits.updateOne({month, year}, {$inc: {visitors: 1}});
    else 
    await new Visits({month, year, visitors: 1}).save();
    res.json({added: true})
}

exports.getVisits = async(req, res) => {
    try {
        const year = new Date().getFullYear();
        const visits = await Visits.find({year});
        res.json({visits});
    } catch(err) {
        res.json({err});
    }
}

exports.addSystem = async(req, res) => {
    try {
        console.log(req.body)
        const newSystem = await new Systems(req.body).save();
        if(newSystem)
            res.json({done: true});
        else res.json({done: false});
    } catch(err) {
        console.log(err)
        res.json({error: err, done: false});
    }
}

exports.editSystem = async(req, res) => {
    try {
        console.log(req.params)

        const updated = await Systems.updateOne({_id: req.params.id}, req.body);
        if(updated.modifiedCount == 1)
            res.json({done: true});
        else res.json({done: false});
    } catch(err) {
        console.log(err)
        res.json({error: err, done: false});
    }
}

exports.getSystemData = async(req, res) => {
    try {
        const system = await Systems.findOne({_id: req.params.id});
        if(system)
            res.json({done: true, system});
        else res.json({done: false});
    } catch(err) {
        console.log(err)
        res.json({error: err, done: false});
    }
}


exports.getSystemsForAdmin = async(req, res) => {
    try {
        const systems = await Systems.find();
        res.json({done: true, systems});
    } catch(err) {
        console.log(err)
        res.json({error: err, done: false});
    }
}


exports.removeSystem = async(req, res) => {
    try {
        const id = req.params.id;
        const delsys = await Systems.deleteOne({_id: id});
        if(delsys.acknowledged) res.json({done: true});
        else res.json({done: false});
    } catch(err) {
        console.log(err)
        res.json({error: err, done: false});
    }
}


exports.addCategory = async(req, res) => {
    try {
        const category = await new Categories(req.body).save();
        if(category) res.json({done: true, category});
    } catch(err) {
        console.log(err)
        res.json({error: err, done: false});
    }
}


exports.getCategories = async(req, res) => {
    try {
        const categories = await Categories.find();
        res.json({done: true, categories});
    } catch(err) {
        console.log(err)
        res.json({error: err, done: false});
    }
}


exports.removeCategory = async(req, res) => {
    try {
        const id = req.params.id;
        const systems = await Categories.deleteOne({_id: id});
        res.json({done: true});
    } catch(err) {
        console.log(err)
        res.json({error: err, done: false});
    }
}

exports.updateSiteData = async(req, res) => {
    try {
        const deleted = await SiteData.deleteMany();
        // if(deleted.acknowledged) {
            const files = req.files;
            if(files?.image) {
                req.body.image = await uploadFile(files.image, "site_image")
            }
            if(files?.video) {
                req.body.video = await uploadFile(files.video, "site_video")
            }
            const system = await SiteData(req.body).save();
            if(system) res.json({done: true});
            else res.json({done: false});
        // }
    } catch(err) {
        console.log(err)
        res.json({error: err, done: false});
    }
}

exports.getSiteData = async(req, res) => {
    try {
            const datas = await SiteData.find().limit(1);
            if(datas.length === 0) {
                await new SiteData().save();
            } 
            const data =  datas[0];
            delete data['stripe_publishable_api_key'];
            delete data['stripe_secret_key'];
            res.json({siteData: data});
            
        } catch(err) {
            console.log(err)
            res.json({error: err, done: false});
    }
}


exports.getSiteDataForAdmin = async(req, res) => {
    try {
            const datas = await SiteData.find().limit(1);
            res.json({siteData: datas[0]});
            
        } catch(err) {
            console.log(err)
            res.json({error: err, done: false});
    }
}

exports.login = async(req, res) => {
    try {
            // await new Users({email: req.body.email, password: bcrypt.hashSync(req.body.password, 10)}).save();
            // return;
            const admin = await Users.findOne({email: req.body.email});
            if(admin) {
                const valid = bcrypt.compareSync(req.body.password, admin.password);
                if(valid) {
                    const token = jwt.sign({email: req.body.email}, "mohammadfarghalyalisaadawyfarghalysaeedfarghaly", {expiresIn: "30d"});
                    res.json({done: true, token, userId: admin._id});
                } else {
                    res.json({done: false, error: "Password is wrong"});
                }
            } else {
                res.json({done: false, error: "Email is wrong"});
            }
            
        } catch(err) {
            console.log(err)
            res.json({error: err, done: false});
    }
}

exports.editAdminData = async(req, res) => {
    try {
        const data = req.body;
        let newData = null;
        const admin = await Users.findOne({_id: data.userId});
        if(!admin) res.json({done: false, error: "user doesn't exist"});
        const validPass = bcrypt.compareSync(data.password, admin.password);
        if(!validPass) res.json({done: false, error: "Password is not correct"});
        if(validPass) {
            newData = {email: data.email}
        }

        if(admin) {
            if(data.newPassword) {
                const newHashedPass = bcrypt.hashSync(data.newPassword, 10);
                newData['password'] = newHashedPass;
            }
        }
        if(newData) {
            const updated = await Users.updateOne({_id: data.userId}, newData);
            if(updated.modifiedCount == 1) {
                res.json({done: true});
            } else {
                res.json({done: false, error: "Data didn't updated"});
            }
        }
        } catch(err) {
            console.log(err)
            res.json({error: err, done: false});
    }
}

exports.getAdminEmail = async(req, res) => {
    const admin = await Users.findOne({_id: req.params.userId});
    res.json({email: admin.email});
}


exports.resetPassword = async(req, res) => {
    try {
        const sitEData = await SiteData.find().limit(1);
        const sender_email = siteData[0].email;
        const email = req.params.email;
        console.log(email)
        // return;
        const password = generatePassword();
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender_email,
            pass: 'saadawy_1993'
        }
        });

        const mailOptions = {
        from: sender_email,
        to: email,
        subject: 'هذه كلمة المرور الجديدة الخاصة بك سجل بها الدخول لتستعيد نشاطك على المنصة ويمكنك تغييرها فيما بعد',
        html: `<h1>${password}</h1>` 
        };

        transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
            res.json({done: false});
        } else {
            console.log('Email sent: ' + info.response);
            const updated = await Users.updateOne({email}, {password: bcrypt.hashSync(password, 10)});
            if(updated.modifiedCount == 1) 
                res.json({done: true});
            else res.json({done: false});
        }
});
} catch(err) {
    console.log(err)
    res.json({message: 'Ad data problem...'});
    }
}