import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Multer for file uploads (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests
app.use('/public', express.static(`${process.cwd()}/public`)); // Serve static files

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

// File upload and analysis endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract file details
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } catch (err) {
    console.error("File processing error:", err);
    res.status(500).json({ message: "Oops! Something went wrong." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
