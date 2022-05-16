import { ObjectId } from "mongodb";
import db from "../db.js";

export async function choosePayment(req, res){

    const { credCard, credName, credCode, credValidity, id} = req.body
    const userId = id
    try{     
        const userFound = await db.collection("users").findOne({
            _id: new ObjectId(userId)
         })
        userFound ?    
        await db.collection("users").updateOne(
            {
            _id: userFound._id,
            },
            {
                $set: {
                    payment:{
                        credName,
                        credCard,
                        credCode,
                        credValidity
                    }
                }  
            }
        ) 
        : res.sendStatus(500);
        
        return res.sendStatus(201)
        
    } catch (error) {
        console.log("Error creating new user.");
        console.log(error);
        return res.sendStatus(500);
    }
}