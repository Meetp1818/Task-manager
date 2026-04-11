const express=require('express');
const cors=require('cors');
const tasksRouter=require('./routes/tasks');

const app=express();
const PORT=process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use('/tasks',tasksRouter);

app.use((req,res)=>{
    res.status(404).json({error:"Endpoint not found"});
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error:"Internal Server Error"});
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
module.exports=app;