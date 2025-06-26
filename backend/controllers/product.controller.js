import Product from "../models/product.model.js"

export const getProduct = async(req, res) => {
    const {id} = req.params
    try{
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({status: "fail", message: "Product not found"})
        }
        res.status(200).json({status: "success", data: product})
    } catch (error) {
        console.error(`Error ${error.message}`)
        res.status(500).json({status: "fail", message: "Internal Server Error"})
    }
}

export const getAllProducts = async(req,res) => {   // Get all the products
    try {
        const products = await Product.find({})
        res.status(200).json({status: "success", data: products})
    } catch (error) {
        console.error(`Error ${error.message}`)
        res.status(500).json({status: "fail", message: "Inernal Server Error"})
    }
}

export const createProducts = async (req,res) => {
    const product = req.body

    if (!product.name || !product.price || !product.image){
        return res.status(400).json({status: "fail", message: "Please provide all the required data."})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({status: "success", data: newProduct})
    } catch (error) {
        console.error(`Error ${error.message}`)
        res.status(500).json({status: "fail", message: "Internal Server Error"})
    }
}

export const updateProducts = async(req,res) => {
    const {id} = req.params
    const product = await req.body

    if (!product){
       return res.status(404).json({success: false, message: "Product not found"})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
        res.status(200).json({success: true, data: updatedProduct})
    } catch (error) {
        res.status(500).json({success: false, message:"Internal server error"})
        console.log(error)
    }
}

export const deleteProducts = async(req,res) => {
    const {id} = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({status: "fail", message: "Product not found"})
        }
        res.status(200).json({status: "success", message: "Product deleted successfully"})
    } catch (error) {
        console.error(`Error ${error.message}`)
        res.status(500).json({status: "fail", message: "Internal Server Error"})
    }
}
