import db from "../db.js"

export async function addProduct(req, res) {
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
}

export async function getProducts(req, res){
    db.collection("products").find().toArray()
    .then(products =>{
        res.send(products)
    })
}