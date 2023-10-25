const {Product} = require ("../db.js");
const axios = require("axios");
const {Op} = require("sequelize");

const STATUS_OK = 200;
const STATUS_CREATED=201;// Se usa avisar que se ha creado un nuevo recurso en el servidor como resultado de la solicitud. Por ejemplo, se utiliza en respuestas a solicitudes POST exitosas cuando se crea un nuevo objeto en la base de datos.
const STATUS_NO_CONTENT=204; //Lo uso para indicar que una solicitud se ha procesado joya ;) pero no hay contenido para devolver en la respuesta.
const STATUS_ERROR = 500;

const getProduct = async (req, res) => {
    try {
        const products = await Product.findAll()
        
        res.status(STATUS_OK).json(products);     
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
};

const addProduct = async (req, res) => {
    try {
      const {
        model,
        memory,
        storage,
        cpu,
        battery,
        size,
        img,
        price,
      } = req.body;
      const product = await Product.create({
        model,
        memory,
        storage,
        cpu,
        battery,
        size,
        img,
        price,
      });
      res.status(STATUS_CREATED).json(product);
    } catch (error) {
      res.status(STATUS_ERROR).json({ error: error.message });
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const {
        model,
        memory,
        storage,
        cpu,
        battery,
        size,
        img,
        price,
      } = req.body;
      const product = await Product.findByPk(productId);
  
      if (!product) {
        res.status(STATUS_ERROR).json({ error: "Producto no encontrado" });
      } else {
        product.model = model;
        product.memory = memory;
        product.storage = storage;
        product.cpu = cpu;
        product.battery = battery;
        product.size = size;
        product.img = img;
        product.price = price;
        await product.save();
        res.status(STATUS_OK).json(product);
      }
    } catch (error) {
      res.status(STATUS_ERROR).json({ error: error.message });
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
  
      if (!product) {
        res.status(STATUS_ERROR).json({ error: "Producto no encontrado" });
      } else {
        await product.destroy();
        res.status(STATUS_NO_CONTENT).end();
      }
    } catch (error) {
      res.status(STATUS_ERROR).json({ error: error.message });
    }
  };

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}