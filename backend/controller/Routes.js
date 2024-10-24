const express = require("express")
const Task = require("../model/Task")
const router = express.Router()

router.get('/',async(req,res)=>{
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id)
        res.json(task)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id',async(req,res)=>{
    try {
        const updateTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(updateTask)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.json({message:'Task deleted'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports= router