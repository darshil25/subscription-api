import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToDb from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import {slowDown} from "express-slow-down";

const app = express();

// Rate limiting middleware
const limiter = rateLimit({ // this is useful for every ip hitting request to your server and i f you want to add this according to request then you have to add it in your route
  windowMs: 1 * 60 * 1000, // modify first number according to minute you want to give
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes"
});

// Slow down middleware
const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, // 1 minute
  delayAfter: 5, // Allow 50 requests per `window` (here, per 1 minute) before slowing down
  delayMs: (hits) => hits * 100 // this means (delayAftervalue + (each request)) * 100ms -> for 6th req. 600ms, for 7th 700ms. and so on....
});

//either apply speedLimiter or limiter
app.use(speedLimiter); // slowdown
// app.use(limiter); //completely blocks

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter); //this means in any req of authRouter it will be working as (/api/v1/auth/sign-up) so we can use same routes across files just set this prefix according to every route file
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  await connectToDb();
})

export default app;