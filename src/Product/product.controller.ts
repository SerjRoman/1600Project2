import { Request, Response } from "express";
import { ProductService } from "./product.service";


export const ProductController = {
    getAllProducts: (req: Request, res: Response) => {      // Тип для req|res,Request | Reponse который из Express
        const take = req.query.take      // C
        console.log(take)
        if (!take){                      // C / S
            res.status(200).json(ProductService.getAllProducts())
            return
        }                                
        if(isNaN(+take)){                // C
            res.status(400).json("Take must be an Integer")
            return
        }
        const slicedProducts = ProductService.getAllProducts(+take); // Repo
        res.status(200).json(slicedProducts)            // C
    },
    getProductById:  (req: Request, res: Response) => {
        console.log(req.params)
        if (!req.params.id){
            res.status(400).json("Id is required")
            return;
        }
        const id = +req.params.id
        if (isNaN(id)){
            res.status(400).json("Id must be an Integer")
            return;
        }
        const product = ProductService.getProductById(id);
        if (!product) {
            res.status(404).json("Product not found");
            return
        }
        res.status(200).json(product)
    },
    createProduct: async (req: Request, res: Response) =>{ // Router
        console.log(req.body)
        const body = req.body                  // C
        if(!body){                             // C
            res.status(422).json('Body is required!')
            return
        }
        if(!body.name){
            res.status(422).json('Name is required!')
            return
        }
        if(!body.price){
            res.status(422).json('Price is required!')
            return
        }
        if(!body.category){
            res.status(422).json('Category is required!')
            return
        } // C

        const newProduct = await ProductService.createProduct(body);
        if (!newProduct){
            res.status(500).json("Product creation failed") // C
            return   
        }
        res.status(201).json('Successfully created') // C     
    },
    async updateProduct(req: Request, res: Response){
        if (!req.params.id){
            res.status(400).json("Id is required")
            return;
        }
        const id = +req.params.id
        if (isNaN(id)){
            res.status(400).json("Id must be an Integer")
            return;
        }
        const body = req.body   
        if(!body){
            res.status(422).json('Body is required!')
            return
        }
        const updatedProduct = await ProductService.updateProduct(id, body)
        if (!updatedProduct){
            res.status(500).json("Product updating failed")
            return   
        }
        res.status(200).json('Successfully updated')
    }
}
// /products/8
// body
