import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import AuthRouter from './src/router/authRouter.js';
import UserRouter from './src/router/userRouter.js';
import OrderRouter from './src/router/orderRouter.js';
import PaymentRouter from './src/router/paymentRouter.js';
import ProductsRouter from './src/router/productsRouter.js';
import DeliveryRouter from './src/router/deliveryRouter.js';
import StylesRouter from './src/router/stylesRouter.js';
import AnalyticsRouter from './src/router/analyticsRouter.js';

// the application server
const appServer = express();

// configuring the environment variables
dotenv.config();
const sPort = process.env.SERVER_PORT; // the server port

// server middlewares
appServer.use(express.json()); // allow passing in the json data
appServer.use(express.urlencoded({ extended: true }));
appServer.use(cors()); // configuring the cross origin

// main endpoints
appServer.use('/api/auth', AuthRouter);
appServer.use('/api/user', UserRouter);
appServer.use('/api/order', OrderRouter);
appServer.use('/api/payment', PaymentRouter);
appServer.use('/api/products', ProductsRouter);
appServer.use('/api/delivery', DeliveryRouter);
appServer.use('/api/styles', StylesRouter);
appServer.use('/api/analytics', AnalyticsRouter);

// server listening to the port 
appServer.listen(sPort, () => {
    console.log(`Initialize the application server on port: ${sPort}.`);
})
