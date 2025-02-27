import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToDb from "./database/mongodb.js";

const app = express();

app.use('/api/v1/auth', authRouter); //this means in any req of authRouter it will be working as (/api/v1/auth/sign-up) so we can use same routes across files just set this prefix according to every route file
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  await connectToDb();
})

export default app;