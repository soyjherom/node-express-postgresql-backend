const express = require('express')

const categoriesRouter = express.Router()

categoriesRouter.get('/:categoryId/product/:productId',(req,res)=>{
  const { categoryId, productId } = req.params
  res.json({
    category: categoryId,
    product: productId
  })
});

module.exports = categoriesRouter;
