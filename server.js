import express from 'express';
import postsRouter from './routers/posts.js'


const app = express();
const port = process.env.SERVER_PORT;

app.use('/posts', postsRouter);

app.listen(port, (error)=> {
    if (error){
        console.error('errore del server');
        
    } else {
        console.log(`server in ascolto sulla porta ${port}`);
        
    }
})


