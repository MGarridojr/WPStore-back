import { authSignInSchema, authSignUpSchema } from "../schemas/authSchema.js";
import db from "./../db.js";

export function validateSignUp(req, res, next) {
    const { error } = authSignUpSchema.validate(req.body);
    if (error) {
        console.log("passou aqui3")
        return res.sendStatus(422); // unprocessable entity
    }

    next();
}

export function validateSignIn(req, res, next) {
    const { error } = authSignInSchema.validate(req.body);
    if (error) {
        return res.sendStatus(422); // unprocessable entity
    }

    next();
}

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.status(401).send("No token.");

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("No session.");

        const time = Date.now() - session.lastStatus;
        if (time > 3600000) return res.status(401).send("Session expired.");

        const user = await db.collection("users").findOne({ _id: session.userId });
        if (!user) return res.sendStatus(404);

        res.locals.user = user;

        next();
    } catch (error) {
        console.log("token", error);
        res.status(500).send("Error checking token.");
    }
}