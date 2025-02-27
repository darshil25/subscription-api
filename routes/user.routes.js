import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send({message: 'GET All users route'});
});

userRouter.get('/:id', (req, res) => {  //this is dynamic parameter, where we can pass any value and according to that value we can get different data
  res.send({message: 'GET specefic users route'});
});

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