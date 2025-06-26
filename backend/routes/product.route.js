import express from "express"
import { createProducts, deleteProducts, getAllProducts, getProduct, updateProducts, } from "../controllers/product.controller.js"

const router = express.Router()

router.get('/:id', getProduct)

router.get('/', getAllProducts)

router.post('/', createProducts)

router.put('/:id', updateProducts)

router.delete('/:id',deleteProducts )

export default router