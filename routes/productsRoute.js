import db from "../db.js";
import { Router } from "express";

const productsRoute = Router();

productsRoute.post("/products", (req, res) =>{
    db.collection("products").insertOne({
        name: req.body.name,
        category: req.body.category,
        color : req.body.color,
        price: req.body.price,
        quantity: req.body.quantity,
        img: req.body.img,
        promo: req.body.promo
    })
    .then(()=>{
        res.sendStatus(201)
    })
    .catch(()=>{
        res.sendStatus(500)
    })
})

productsRoute.get("/products", (req, res) =>{
    db.collection("products").find().toArray()
    .then(products =>{
        res.send(products)
    })
})



export default productsRoute



