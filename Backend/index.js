const express= require('express');
const mongoose=  require('mongoose');
const jwt= require('jsonwebtoken');
const multer= require('multer')
const path= require('path')
const cors= require('cors');
const dotenv= require('dotenv')


const app=express();


//request will be automatically pass through json
app.use(express.json())
app.use(cors())
//MongoDB database connection
mongoose.connect("mongodb+srv://thakuranubhav867:Anuth7061@cluster0.pdhgz.mongodb.net/E-commerce")
.then(()=>console.log("Connected to the db"))
.then((error)=>console.log("Unbale to connect mongodb database",error))

app.use('/user',require('./routes/userRoutes'));

//Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        // Corrected: 'file' parameter instead of 'res'
        // Corrected: Using file.fieldname and originalname with path.extname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        return cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
    }
});

app.use('/',require('./routes/cartitemRoutes'))

app.use('/products',require('./routes/productRoutes'))

app.use('/images', express.static('upload/images'));
const upload = multer({ storage: storage });

app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log("File received:", req.file); // Debug line

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        res.json({
            success: true,
            image_url: `http://localhost:${PORT}/images/${req.file.filename}`
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});





const PORT=3001;
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`)
})