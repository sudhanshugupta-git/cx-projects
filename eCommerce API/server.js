// import express
import express from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import cors from 'cors';

import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';

// import apiDocs from "./swagger.json" with {type: "json"};
import apiDocs from "./swagger3.0.json" with {type: "json"};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';

const server = express();

// CORS policy configuration

/* A preflight request is a type of HTTP request that browsers send before making an actual request, typically when dealing with Cross-Origin Resource Sharing (CORS). It is used to check if the server is configured to allow the actual request.
*/
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // specify the allowed origin(s) for accessing the server APIs
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Define specific headers  (give * for all)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Restrict methods if needed
//     // Return OK for preflight requests(a verification request sent by the client before making an actual request)
//     if (req.method === "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// });


// using cors built-in middleware
let corsOptions = {
    origin: "http://127.0.0.1:5500",
    allowedHeaders: ['Authorization', 'Content-Type']
}
server.use(cors(corsOptions));


server.use(bodyParser.json());  // to parse json data
// server.use(express.urlencoded({ extended: true }));  // used to parse form data

// default request hanlder
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
})


// To Authorize request other than user url: <token>   or   Bearer  <token>
server.use("/api-docs", 
    swagger.serve, 
    swagger.setup(apiDocs))


server.use(loggerMiddleware);

// server.use("/api/products",basicAuthorizer, productRouter);  // basicauthorization can be decoded

server.use("/api/products", jwtAuth, productRouter);
server.use('/api/cart',jwtAuth, cartRouter);
server.use('/api/users', userRouter);



server.use((req, res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3000/api-docs")
});

server.use((err, req, res, next)=>{
    // userlevel error
    if (err instanceof ApplicationError){
      res.status(err.code).send(err.message);  
    }
  
    // server errors.
    res
    .status(500)
    .send(
      'Something went wrong, please try later'
    );
});

// specify port
const PORT = 3000;
server.listen(PORT, ()=>{
    console.log("Server is running at PORT: "+PORT);
});