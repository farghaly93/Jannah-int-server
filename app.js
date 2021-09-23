const  mongoose = require('mongoose');

require('dotenv').config();

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    path = require('path'),
    app = express(),
    publicRouter = require("./routes/public-router"),
    userRouter = require("./routes/user-router"),
    paymentRouter = require("./routes/payment-router"),
    upload = require("express-fileupload");

// Environment configuration
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

mongoose.connect(process.env.database, { useNewUrlParser: true,  useUnifiedTopology: true  })
.then(() => {
  console.log('Connected successfully to database..');
}
).catch(()=>{
  console.log('Connection failed ... !');
});

app.use(cors());

app.use(upload({useTempFiles: true, preserveExtension: 4}));
express.json({limit: '50mb', extended: true});
express.urlencoded({limit:'50mb', extended: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(methodOverride());




// Register the router
app.use(paymentRouter);
app.use(publicRouter);
app.use(userRouter);

app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, function(){
  console.log('Server listening on port ' + port);
});




