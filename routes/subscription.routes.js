import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
  res.send({message: 'GET All subscriptions route'});
});

subscriptionRouter.get('/:id', (req, res) => {
  res.send({message: 'GET subscriptions details route'});
});

subscriptionRouter.post('/', (req, res) => {
  res.send({message: 'Create subscriptions route'});
});

subscriptionRouter.put('/:id', (req, res) => {
  res.send({message: 'UPDATE subscriptions route'});
});

subscriptionRouter.delete('/:id', (req, res) => { 
  res.send({message: 'Delete subscriptions route'});
});

subscriptionRouter.get('/user/:id', (req, res) => { //get all subscription according to user
  res.send({message: 'GET All users subscriptions route'});
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
  res.send({message: 'Cancel subscriptions route'});
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.send({message: 'GET upcoming subscriptions route'});
});

export default subscriptionRouter;