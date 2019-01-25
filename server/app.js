const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");


//Kết nối server database: Mongod
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/APIAuth',{ useCreateIndex: true, useNewUrlParser: true });

const RoutersUser = require('./routers/user.router');
const RoutersAnq = require('./routers/anq.router');
const RoutersInfo = require('./routers/info.router');
const RoutersMetadata = require('./routers/metadata.router');

//const ControllerChat = require('./controllers/chat.controller');

// const productRoutes = require("./routes/products");
// const orderRoutes = require("./routes/orders");
// const userRoutes = require('./routes/user');

// mongoose.connect(
//   "mongodb://node-shop:" +
//     process.env.MONGO_ATLAS_PW +
//     "@node-rest-shop-shard-00-00-wovcj.mongodb.net:27017,node-rest-shop-shard-00-01-wovcj.mongodb.net:27017,node-rest-shop-shard-00-02-wovcj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin",
//   {
//     useMongoClient: true
//   }
// );

//Khai báo middleware của thư viện
app.use(morgan("dev"));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Khai báo sử dụng routes
app.use('/api/user', RoutersUser);
app.use('/api/anq', RoutersAnq);
app.use('/api/info', RoutersInfo);
app.use('/api/metadata', RoutersMetadata);

const  appPath = path.join(__dirname, '..', 'dist/vtcmn-ng');
app.use(express.static(appPath));

app.get('*', function(req,res){
  res.sendFile(path.resolve(appPath, 'index.html'));
});
//Xử lý lỗi khi nạp đường dẫn không đúng
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
