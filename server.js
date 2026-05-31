import express from 'express';
import postsRouter from './routers/posts.js'


const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use('/posts', postsRouter);



app.use((request, response)=>{
    response.status(404).json({
        error:'endpoint non trovato'
    });
});

app.use((error, request, response, next)=> {
    response.status(500).json({
        error: 'errore interno del server'
    });
});

app.listen(port, (error)=> {
    if (error){
        console.error('errore del server');
        
    } else {
        console.log(`server in ascolto sulla porta ${port}`);
        
    }
})


