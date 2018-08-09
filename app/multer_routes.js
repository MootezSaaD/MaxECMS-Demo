var multer = require('multer');
var path = require('path');
var express  = require('express');
var app      = express();

module.exports = function(app,multer) {
  // Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: PDF Only!');
  }
}
var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,cb) {
      cb(null,file.originalname);
    }

  });

 //management of the storage and the file that will be uploaded
 //.single expects the name of the file input field
const upload = multer({
  storage: storage,
  limits:{fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('pdf');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('midterms', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('midterms', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('midterms', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

};
