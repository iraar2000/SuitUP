import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import AuthRouter from './src/router/authRouter';
import UserRouter from './src/router/userRouter';
import OrderRouter from './src/router/orderRouter';
import PaymentRouter from './src/router/paymentRouter';
import ProductsRouter from './src/router/productsRouter';
import DeliveryRouter from './src/router/deliveryRouter';
import StylesRouter from './src/router/stylesRouter';
import AnalyticsRouter from './src/router/analyticsRouter';

// the application server
const appServer = express();

// configuring the environment variables
dotenv.config();
const sPort = process.env.SERVER_PORT; // the server port

// server middlewares
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
