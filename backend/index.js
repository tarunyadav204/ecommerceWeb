const Port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(cors());

//Database creation
mongoose.connect("mongodb+srv://tarun204yadav:Tarun1508@cluster0.ml2g9fo.mongodb.net/e-commerce");


//API creation
app.get("/" , (req,res)=>{
    res.send("Express App is runniing");
})

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, './upload/images');
    },
    filename:  (req, file, cb) => {
     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);

    }
  });
  
  const upload = multer({ storage: storage });

app.use('/images' , express.static('upload/images'));

// Define endpoint for uploading images
app.post("/upload" , upload.single('product') , (req,res)=>{
    //console.log(req.file.filename); // Logging the filename of the uploaded image
    res.json({
        success : 1 ,
        image_url : `http://localhost:${Port}/images/${req.file.filename}`
    });
});


//schema for creating product

const Product = mongoose.model("Product", {
    id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    new_price:{
        type : Number,
        required : true
    },
    old_price:{
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    available:{
        type : Boolean,
        default : true,
    }

    

});


app.post("/addproduct" , async(req,res)=>{
    const products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0]
        id = last_product.id + 1;
    }
    else{
        id=1;
    }
     const product = new Product({
        id : id,
        name:req.body.name,
        image : req.body.image,
        category : req.body.category,
        new_price : req.body.new_price,
        old_price : req.body.old_price,
     })
     console.log(product);
     await product.save();
     console.log("Saved Successfully");
     res.json({
        success:true,
        name : req.body.name,
     })
})

//creating API for deleting product
app.post("/removeproduct" , async(req,res)=>{
      await Product.findOneAndDelete({id:req.body.id});
      console.log("Removed Product");
      res.json({
        success: true,
        name : req.body.name,
      });
})

//creating API for display all products
app.get("/allproducts" , async(req,res)=>{
    let products = await Product.find({});
    console.log("All products Fetched")
    res.send(products);
})


//Schema for user creation
const User = mongoose.model("User" , {
    name : {
        type:String,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
    },
    cartData : {
      type : Object,
    },
    date : {
        type :Date,
        default : Date.now(),
    }
})

//creating endpoint for registering the user
app.post("/signup" , async(req,res) =>{
   try{
    let check = await User.findOne({email : req.body.email});
    if(check)
    {
        return res.status(400).json({ success: false, error: "An account with this email already exists" });  
      }
      const cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const hashpass = await bcrypt.hash(req.body.password , 10);
        const newUser = new User({
            name: req.body.username,
            email: req.body.email,
            password: hashpass,
            cartData: cart,
        });
        await newUser.save();
        const data = {
            user: {
                id: newUser.id
            }
        };
        const token = jwt.sign(data, "secret_ecom"); // Assuming you have a JWT_SECRET in your environment variables
        res.json({ success: true, token });
   }
   catch(err){
    console.log({"Error" : err});
   }
});

app.post("/login", async(req,res)=>{
    try{
  let user = await User.findOne({email:req.body.email});
  if(user){
     bcrypt.compare(req.body.password, user.password , (err, passwordMatch)=>{
        if(err || !passwordMatch)
        {
            return res.status(401).json({success:false ,error: "Invalid email or password" });
        }
        else{
        const data = {
            user :{
                id : user.id
            }
        }
        const token = jwt.sign(data,"secret_ecom");
        res.status(201).json({success : true , token});
    }
     });
  }

  else{
    res.json({success : false , errors : "Wrong Email ID"});
  }
}
catch(err)
{
    console.log({"Error" : err });
}
});

//creating endpoint for new collection data
app.get("/newcollection" , async (req,res)=>{
    try{
      let products = await Product.find({});
      console.log(products,'//////////');
      let newcollection = products.slice(1).slice(-8);
      console.log("New collection fetched");
      res.send(newcollection);
    }
    catch(err)
    {
        console.log('Err:',err);
    }
})

app.listen(Port,(error)=>{
   if(!error)
   {
   console.log(`Server is running on port ${Port}`);
   }
   else{
    console.log("Error" , error);
   }
})