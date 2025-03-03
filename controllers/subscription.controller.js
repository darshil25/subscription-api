import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id, //getting this from authorize middleware that added before request 
    });

    res.status(201).json({
      success: true,
      data: subscription
    })
  } catch (error) {
    next(error);
  }
}

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error('You are not authorize to access this account');
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions
    })
  } catch (error) {
    next(error);
  }
}