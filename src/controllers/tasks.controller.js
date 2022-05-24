import { Task } from '../models/Task.js'

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll()
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findOne({
            where: {
                id,
            },
            //attributes:['name'] ->retorna en el api solo las columnas que se quiere
        })
        if (!task) return res.status(404).json({ message: 'Task does not exists' })
        res.json(task)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//actualiza solo los valores que se le pasa, los que no se pasan no se actualizan
export const createTask = async (req, res) => {
    try {
        const { name, done, projectId } = req.body
        const newTask = await Task.create({
            name,
            done,
            projectId
        })
        res.json(newTask)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateTask = async (req, res) => {
    try {
        const{id}=req.params
        const {name,done,projectId}=req.body
        const task=await Task.findOne({
            where:{id}
        })

        task.set(req.body)
        await task.save()
        return res.json({task})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Task.destroy({
            where: {
                id
            }
        })
        console.log(result)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
