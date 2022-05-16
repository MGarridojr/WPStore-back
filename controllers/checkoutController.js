import db from "../db.js";

export default function confirmPayment(){
    const { user } = res.locals;
        try {
            const historico = await db.collection('checkout').findOne(user._id)
        } catch (error) {
            console.log("Error updating cart.", error);
            res.status(500).send("Error updating cart.");
        }
}