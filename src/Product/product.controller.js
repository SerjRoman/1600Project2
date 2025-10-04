const ProductService = require("./product.service");

const ProductController = {
    getAllProducts: (req, res) => {      // C
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
    getProductById:  (req, res) => {
        console.log(req.params)
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
    createProduct: async (req, res) =>{ // Router
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
    }
}

module.exports = ProductController;