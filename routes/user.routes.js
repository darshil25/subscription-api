import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser); //this is dynamic parameter, where we can pass any value and according to that value we can get different data

userRouter.post('/', (req, res) => {
  res.send({message: 'Create users route'});
});

userRouter.put('/:id', (req, res) => {
  res.send({message: 'Update users route'});
});

userRouter.delete('/:id', (req, res) => {
  res.send({message: 'Delete users route'});
});

export default userRouter;