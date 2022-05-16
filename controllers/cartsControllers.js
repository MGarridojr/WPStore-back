import db from "../db.js";

export async function addToCart(req, res) {
    const { user } = res.locals;

    try {
        const cart = await db.collection("carts").findOne({ userId: user._id });
        const cartProduct = cart.products.find(product => product.name === req.body.name);

        if (cartProduct) {
            await db.collection("carts").updateOne({
                userId: user._id, "products.name": cartProduct.name
            }, { $set: { "products.$.quantity": cartProduct.quantity + 1 } });
        }
        else {
            let product = await db.collection("products").findOne({ name: req.body.name });
            product.quantity = 1;
            delete product._id;

            await db.collection("carts").updateOne({
                userId: user._id
            }, { $push: { products: product } });
        }

        await db.collection("sessions").updateOne({
            userId: user._id
        }, { $set: { lastStatus: Date.now() } });

        res.sendStatus(201);
    } catch (error) {
        console.log("Error updating cart.", error);
        res.status(500).send("Error updating cart.");
    }
}

export async function updateQuantity(req, res) {
    const { user } = res.locals;

    try {
        const cart = await db.collection("carts").findOne({ userId: user._id });
        const cartProduct = cart.products.find(product => product.name === req.body.name);

        if (req.body.type === "add") {
            const product = await db.collection("products").findOne({ name: req.body.name });

            if (product.quantity > 0) {
                await db.collection("carts").updateOne({
                    userId: user._id, "products.name": cartProduct.name
                }, { $set: { "products.$.quantity": cartProduct.quantity + 1 } });
            }
            else {
                return res.status(500).send("No more items left.");
            }
        }
        else {
            await db.collection("carts").updateOne({
                userId: user._id, "products.name": cartProduct.name
            }, { $set: { "products.$.quantity": cartProduct.quantity - 1 } });
        }

        await db.collection("sessions").updateOne({
            userId: user._id
        }, { $set: { lastStatus: Date.now() } });

        res.sendStatus(201);
    } catch (error) {
        console.log("Error updating quantity.", error);
        res.status(500).send("Error updating quantity.");
    }
}

export async function removeFromCart(req, res) {
    const { user } = res.locals;

    try {
	console.log("removendo");
	console.log(req.params.name);
        await db.collection("carts").updateOne({
            userId: user._id
        }, { $pull: { products: { name: req.params.name } } });


        await db.collection("sessions").updateOne({
            userId: user._id
        }, { $set: { lastStatus: Date.now() } });

        res.sendStatus(201);
    } catch (error) {
        console.log("Error removing item from cart.", error);
        res.status(500).send("Error removing item from cart.");
    }
}

export async function getCart(req, res) {
    const { user } = res.locals;

    try {
        const cart = await db.collection("carts").findOne({ userId: user._id });
        res.status(201).send([...cart.products]);
    } catch (error) {
        console.log("Error recovering cart.", error);
        res.status(500).send("Error recovering cart.");
    }
}