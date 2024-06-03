const fs = require("fs")
const { ProductSchema } = require("../model/product")


const createProductController = async(req,res)=>{

   try {
        
        // console.log(req.body)
        const { product_name ,product_photo64Image, product_price , food_category , restaurant_id , description , extraTime} =  req.body
        console.log(product_name ,product_photo64Image, product_price , food_category , restaurant_id , description , extraTime)

        if (!product_name || !product_photo64Image || !product_price || !food_category || !restaurant_id || !description ){
                res.status(400).send({
                success:false,
                message:"incomplete Credentials"
            })
        }
       
        const newProduct = await ProductSchema({
            product_name,
            product_photo64Image,
            product_price,
            food_category,
            restaurant_id,
            description,
            extraTime
        })
        await newProduct.save();
        console.log(newProduct)
        return res.status(202)
    
   } catch (error) {
    console.log(error)
   }


}
const get_All_Product = async(req,res)=>{
   try {
    console.log("ekcwec")
    const {Resturant_id} = req.params;
    console.log(resturant_id)
    const All_Product = await ProductSchema.find({restaurant_id:Resturant_id}).select("-extraTime").sort({availability :true})
    console.log(All_Product)
    // .populate({
    //     path: 'resturant',
    //     select: '-bannerPhoto',
    //     options: { strictPopulate: false }

    if(All_Product){
        res.status(200).json({
            All_Product
        })
    }

    
   } catch (error) {
        res.status(404)
   }
}
const get_Product_Photo = async(req,res)=>{
    try {
        const {pid} =req.params

        const product_photo = await ProductSchema.findById({_id:pid}).select("photo")
        if(product_photo){
            res.set('Content-type' , product_photo.photo.contentType)
        }
        res.status(200).json({
            product_photo,
            success:true
        })


    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"error to fetch the product phtoto"
        })
    }

}



module.exports = {createProductController , get_All_Product , get_Product_Photo}