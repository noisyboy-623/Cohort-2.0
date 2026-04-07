import express from 'express';
import runGraph from './ai/graph.ai.js'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
}));

// app.get('/', async (req, res) => {
//     const result = await runGraph('Write a haiku about the ocean.')
//     res.json(result)
// })

app.post('/invoke', async (req, res) => {
    const { problem } = req.body;
    const result = await runGraph(problem);
    res.status(200).json({
        message: "Graph executed successfully",
        success: true,
        result
    })
})


export default app;

