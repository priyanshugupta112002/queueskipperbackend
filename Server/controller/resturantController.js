
const {ResturantSchema} = require("../model/shopOwners")
const fs = require("fs")
const formidable = require('formidable');

// const registerResturantComtroller = async(req, res) => {
//     console.log(req.body)
//     try {
//         const form = new formidable.IncomingForm();

//         form.parse(req, async (err, fields, files) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Something went wrong' });
//             }

//             const { user, restaurant_Name, cuisine, estimatedTime } = fields;
//             const { bannerPhoto64Image } = files;

//             if (!user || !restaurant_Name || !cuisine || !estimatedTime) {
//                 return res.status(400).json({ error: 'Missing required fields' });
//             }

//             if (!bannerPhoto64Image || bannerPhoto64Image.size > 5000) {
//                 return res.status(400).json({ error: 'Invalid banner photo' });
//             }

//             const newRestaurant = new ResturantSchema({
//                 user,
//                 restaurant_Name,
//                 cuisine,
//                 estimatedTime,
//             });

//             // newRestaurant.bannerPhoto64Image.data = fs.readFileSync(bannerPhoto64Image.path);
//             // newRestaurant.bannerPhoto64Image.contentType = bannerPhoto64Image.type;

//             await newRestaurant.save();

//             return res.status(202).json({ success: true });
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };








const registerResturantComtroller = async(req,res)=>{


    try {
        
        // const form = new formidable.IncomingForm();
        // form.parse(req, function(err, fields, files) {
        //     if (err) {
        //       console.error(err);
        //       return res.end('Something went wrong');
        //     }
       
        //     res.end('File uploaded successfully');
        //   });
        // const {req.fields}
        // console.log(req.fields)
        // console.log(req.files)
        // console.log("ewwq")
        const user = "66602e9d8e3836eb7093eeda"
        const {   restaurantName:restaurant_Name , cuisines:cuisine , estimatedTime } = req.fields
        const {restaurantImage:bannerPhoto64Image} = req.files

        console.log(user, restaurant_Name ,cuisine  ,bannerPhoto64Image)

      
        // const {user ,  restaurant_Name  , cuisine , estimatedTime , bannerPhoto64Image}  = req.body
    
        if(!user || ! restaurant_Name  || !cuisine || !estimatedTime ) {
            return res.status(400)
        } else if (!bannerPhoto64Image) {
            return res.status(400)

        }

        // console.log("ewwqqasdasd")
        // const userExist = await ResturantSchema.findOne({user})ß
        // if (userExist){
        //     res.status(404)
        // }
     console.log(bannerPhoto64Image)

        const newRseturant = await ResturantSchema({
            user,
            restaurant_Name,
            cuisine,
            estimatedTime,
        })
      
        if (bannerPhoto64Image) {
            newRseturant.bannerPhoto64Image.data = fs.readFileSync(bannerPhoto64Image.path);
            newRseturant.bannerPhoto64Image.contentType = bannerPhoto64Image.type;
        }
        await newRseturant.save();
        
        return res.status(202).json({
            success:true
    })
        
    } catch (error) {
        console.log(error)
        return res.status(404)
    }
}
const get_All_resturant = async(req,res)=>{

    try {
        const Restaurant = await ResturantSchema.find({}).select("-bannerPhoto64Image -user")
        res.status(200).json({
            Restaurant
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:error
        })
    }
}

const get_Retrurant_Photo = async(req,res)=>{

    try {
        console.log("gvhn")
        const {pid} =req.params
        console.log(pid)
        const restaurant_photo = await ResturantSchema.findById({_id:pid}).select("bannerPhoto64Image")
        
        res.status(202).json({
            restaurant:{
                banner_photo64 :restaurant_photo.bannerPhoto64Image
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"error to fetch the Resturant banner phtoto"
        })
    }

}



module.exports = {registerResturantComtroller , get_All_resturant , get_Retrurant_Photo}