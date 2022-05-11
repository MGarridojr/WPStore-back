import { authSignInSchema, authSignUpSchema } from "../schemas/authSchema.js";


export function validateSignUp(req, res, next) {
    const {error} = authSignUpSchema.validate(req.body);
    if(error) {
        return res.sendStatus(422); // unprocessable entity
    }
    
    next();
}

export function validateSignIn(req, res, next) {
  const {error} = authSignInSchema.validate(req.body);
  if(error) {
    return res.sendStatus(422); // unprocessable entity
  }

  next();
}