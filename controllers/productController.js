import { ObjectId } from "mongodb"
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

export async function getProductDetail(req, res){
    const {_id} = req.params
    console.log('id do item: ', _id)
    try {
        const objetoProduto = await db.collection("products").findOne({_id: new ObjectId(_id)})
        console.log(objetoProduto)
        if(!objetoProduto){
            res.status(404).send('not found')
            return
        }
        res.send(objetoProduto)
    }catch (err){
        res.status(500).send(err)
    }
}