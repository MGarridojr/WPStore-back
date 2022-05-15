// import db from "../db.js";

// export async function addToCart(req, res) {
//     const { user } = res.locals;

//     try {
//         const cart = await db.collection("carts").findOne({ userId: user._id });

//         const product = cart.products.findOne(product => product.name === req.body.name);

//         if(product) {
//             await db.collection("carts").updateOne({
//                 userId: user._id, "products.name": product.name
//             }, { $set: {"products.$.quantity": product.quantity+1}});
//         }
//         else {
//             await db.collection("carts").updateOne({
//                 userId: user._id
//             }, { $push: {products: req.body}});
//         }

//         await db.collection("sessions").updateOne({ 
//             userId: user._id 
//         }, { $set: {lastStatus: Date.now()} });

//         res.sendStatus(201);

//     } catch (error) {
//         console.log("Error updating cart.", error);
//         res.status(500).send("Error updating cart.");
//     }
// }