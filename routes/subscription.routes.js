import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
  res.send({message: 'GET All subscriptions route'});
});

subscriptionRouter.get('/:id', (req, res) => {
  res.send({message: 'GET subscriptions details route'});
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
  res.send({message: 'UPDATE subscriptions route'});
});

subscriptionRouter.delete('/:id', (req, res) => { 
  res.send({message: 'Delete subscriptions route'});
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.put('/:id/cancel', (req, res) => {
  res.send({message: 'Cancel subscriptions route'});
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.send({message: 'GET upcoming subscriptions route'});
});

export default subscriptionRouter;