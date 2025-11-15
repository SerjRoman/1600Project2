import { ProductService } from "./product.service";
import { ProductControllerContract } from "./product.types";


export const ProductController: ProductControllerContract = {
    getAllProducts: async (req, res) => {
        try {
            const take = req.query.take
            console.log(take)
            if (!take){
                res.status(200).json(await ProductService.getAllProducts())
                return
            }
            if(isNaN(+take)){
                res.status(400).json({message: "Take must be an Integer"})
                return
            }
            const slicedProducts = await ProductService.getAllProducts(+take); 
            res.status(200).json(slicedProducts)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Take must be an Integer"})
        }
    },
    getProductById: async  (req, res) => {
        try {
            if (!req.params.id){
                res.status(400).json({message: "Id is required"})
                
                return;
            }
            const id = +req.params.id
            if (isNaN(id)){
                res.status(400).json({message: "Id must be an Integer"})
                return;
            }
            const product =await ProductService.getProductById(id);
            if (!product) {
                res.status(404).json({message: "Product not found"});
                return
            }
            res.status(200).json(product)
        }catch(error) {
            console.log(error)
            res.status(500).json({message: "Unhandled Error"})
        }
    },
    createProduct: async (req, res) =>{ // Router
        try {
            console.log(req.body)
            const body = req.body                  // C
            if(!body){                             // C
                res.status(422).json({message: 'Body is required!'})
                return
            }
            if(!body.name){
                res.status(422).json({message: 'Name is required!'})
                return
            }
            if(!body.price){
                res.status(422).json({message: 'Price is required!'})
                return
            }
            if(!body.categoryId){
                res.status(422).json({message: 'Category is required!'})
                return
            } // C

            const newProduct = await ProductService.createProduct(body);
            if (!newProduct){
                res.status(500).json({message: "Product creation failed"}) // C
                return   
            }
            res.status(201).json('Successfully created') // C  
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Unhandled Error"})
        }   
    },
    async updateProduct(req, res){
        try {
            if (!req.params.id){
                res.status(400).json({message: "Id is required"})
                return;
            }
            const id = +req.params.id
            if (isNaN(id)){
                res.status(400).json({message: "Id must be an Integer"})
                return;
            }
            const body = req.body   
            if(!body){
                res.status(422).json({message: 'Body is required!'})
                return
            }
            const updatedProduct = await ProductService.updateProduct(id, body)
            if (!updatedProduct){
                res.status(500).json({message: "Product updating failed"})
                return   
            }
            res.status(200).json('Successfully updated')
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Unhandled Error"})
        }
    }
}
// /products/8
// body
