import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// Configure Multer for file uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

app.use(express.json())
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: "no file uploded"})
    }

    const fileBuffer = req.file.buffer;
    const fileSize = req.file.size;
    const fileType = req.file.mimetype;
    res.json({
      name: req.file.originalname,
      type: fileType,
      size: fileSize
    })
  } catch (err) {
    console.error("File processing error: ", err);
    res.status(500).json({message: "Oops! Something went wrong."})
    
  }
  // res.json({message: "here is where the file goes!"})
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
