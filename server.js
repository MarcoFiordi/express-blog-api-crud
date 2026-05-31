import express from 'express';
import postsRouter from './routers/posts.js'
import notFound from './middlewares/notFound.js';
import errorsHandler from './middlewares/errorsHandler.js';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use('/posts', postsRouter);



app.use(notFound);

app.use(errorsHandler);

app.listen(port, (error)=> {
    if (error){
        console.error('errore del server');
        
    } else {
        console.log(`server in ascolto sulla porta ${port}`);
        
    }
})


