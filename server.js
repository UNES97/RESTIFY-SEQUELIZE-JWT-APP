const restify   = require('restify');
const cors      = require("cors");
const db        = require("./models");
const multer    = require('multer');
const path      = require('path');
const sConfig   = require('./config/server.config');
var corsOptions = {
    origin: "*"
};

const server = restify.createServer({
    name    : sConfig.name,
    version : sConfig.version,
    url     : sConfig.hostname
});

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: File type is INVALID');
    }
};

/* Upload files storage */
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(_req, file, cb){
        var fileName = file.fieldname;
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function(_req, file, cb){
        checkFileType(file, cb);
    }
});

server.use(cors(corsOptions));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const Role = db.role;
db.sequelize.sync().then(() => {
    // initial();
    console.log('Resynced DB');
});

function initial() {
    Role.create({
        id: 1,
        name: "User"
    });
   
    Role.create({
        id: 2,
        name: "Admin"
    });
   
    Role.create({
        id: 3,
        name: "Super Admin"
    });
}


/* Upload route */
server.get("/upload" , [upload.single('myFile')] , (req, res) => {
    res.json({ message: 'File uploaded successfully !' });
});

/* Home route */
server.get('/', function(req, res){
    res.json({ message: 'Welcome to UNES X SEQUELIZE X Restify X JWT Auth'});
});

/* Set my App routes */
require('./routes/auth.routes')(server);
require('./routes/user.routes')(server);
require('./routes/post.routes')(server);

server.listen(4000 , function () {
  console.log('%s Listening at %s', server.name , server.url);
});