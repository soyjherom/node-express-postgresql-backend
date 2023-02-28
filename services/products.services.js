const boom = require('@hapi/boom');
const { v4 } = require('uuid');
const uuidv4 = v4;

const { pool } = require('../libs/postgres');

class ProductServices {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err)=>{
      throw boom.serverUnavailable(err.message);
    });
  }

  async exists(id) {
    return new Promise((resolve, reject) =>{
      try{
        const query = `SELECT 1 FROM products WHERE id = '${id}'`;
        this.pool.query(query, (err, res)=>{
          if(err) reject(err);
          if(res.rows.length <= 0) reject(boom.notFound('Product Not Found!'));
          resolve('OK');
        })
      }
      catch(e){
        reject(e);
      }
    });
  }

  async create (product) {
    return new Promise((resolve, reject) => {
      try{
        const query = 'INSERT INTO products (id, category_id, product_name, price)';
        const values = ` VALUES ('${uuidv4()}', ${product.category_id}, '${product.product_name}', ${product.price});`
        this.pool.query(query + values, (err)=>{
          if(err) reject(err);
          resolve('OK');
        })
      }catch(e){
        reject(e);
      }
    })
  }

  async find (size) {
    return new Promise((resolve, reject)=>{
      try{
        const query = `SELECT * FROM products LIMIT ${size};`;
        this.pool.query(query,(err, results)=>{
          if(err) reject(err);
          resolve(results.rows);
        })
      }catch(e){
        reject(e)
      }
    });
  }

  async findOne (id) {
    return new Promise((resolve, reject)=>{
      try{
        this.exists(id).catch(e=>reject(e));
        const query = `SELECT * FROM products WHERE id = '${id}';`;
        this.pool.query(query,(err, results)=>{
          if(err) reject(err);
          resolve(results.rows[0]);
        })
      }catch(e){
        reject(e);
      }
    })
  }

  async update (product) {
    return new Promise((resolve, reject)=>{
      try{
        this.exists(product.id).catch(e=>reject(e));
        let updateQuery = 'UPDATE products SET';
        if(product.product_name) updateQuery += ` product_name = '${product.product_name},'`;
        if(product.category_id) updateQuery += ` category_id = ${product.category_id},`;
        if(product.price) updateQuery += ` price = ${product.price},`;
        if(product.is_active) updateQuery += ` is_active = ${product.is_active},`;
        updateQuery += ` updated_on = now() WHERE id = '${product.id}';`
        this.pool.query(updateQuery, (err)=>{
          if(err) reject(err);
          resolve('OK');
        })

      }catch(e){
        reject(e)
      }
    })
  }

  async delete (id) {
    return new Promise((resolve, reject)=>{
      try{
        this.exists(id).catch(e=>reject(e));
        const query = `DELETE FROM products WHERE id = '${id}';`;
        this.pool.query(query, (err)=>{
          if(err) reject(err);
          resolve('OK');
        })
      }catch(e){
        reject(e)
      }
    })
  }

}

module.exports = ProductServices;
