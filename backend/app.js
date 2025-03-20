import express from 'express';
import cors from "cors";
import connectDB from './config/db.js';
import router from './routers/userRouter.js';
import routerParker from './routers/addParker.js';
import locationRouter from './routers/locationRouter.js';
import vehicleRouter from './routers/vehicleRouter.js';
import slotRouter from './routers/slotRouter.js';
import reservationRouter from './routers/reservationRouter.js';
import parkingRouter from './routers/parkingRoute.js';
import paymentRouter from './routers/paymentRouter.js';



const app = express();
const PORT = 3000;

//database connected
connectDB();
app.use(express.json())
app.use(cors());


//end api point
app.use('/api/user',router);
app.use('/api/parker',routerParker);
app.use('/api/location',locationRouter);
app.use('/api/vehical',vehicleRouter);
app.use('/api/slot',slotRouter);
app.use('/api/reservation',reservationRouter)
app.use("/api/parking", parkingRouter);
app.use("/api/payments", paymentRouter)


app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:/${PORT}`)
})