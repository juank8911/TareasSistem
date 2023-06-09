const Task = require('../models/taskModel');

const getAllTasks = async (req,res) => {
  try {
    console.log("get all tasks");
    const tasks = await Task.find();
   res.status(200).send(tasks)
  } catch (error) {
    res.status(200).send({Error:'Something went wrong', error});
  }
};

const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    return task;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

const getTasksRol = async (req, res) => {
    try{
        var busqueda;
    var search = {rol:req.params.rol,id:req.params.id}
    console.log(search);
    if(search.rol=="admin")
    {
        console.log("admin");
       busqueda  = {admin:search.id};
    }
    else if(search.rol=="ejec"){
        console.log("eject");
        busqueda  = {eject:search.id};
    }
    console.log(busqueda);
    var tasks = await Task.find(busqueda);
    console.log(tasks);
    if(tasks!=null){res.status(200).send({tasks, ok:true})}
    else{ res.status(200).send({msj:"no se enconttraron tareas", ok:false})}
    }
    catch (error) {

    }
}

const createTask = async (req,res) => {

  try {
    console.log(req.body)
    task = {title:req.body.title, description:req.body.description, vencimiento:req.body.vencimiento,estado:req.body.estado, admin:req.body.admin,ejecuta:req.body.ejecuta};
    const newTask = new Task(task);
    await newTask.save();
    res.status(200).send({newTask,ok:true,msj:null})
  } catch (error) {
    res.status(500).send({ok:false,msj:error})
    throw error;
  }
};

const updateTask = async (req,res) => {
  try {
    task = {id:req.body.id, title:req.body.title, description:req.body.description, estado:req.body.estado}
    
    const task = await Task.findByIdAndUpdate(id, task, { new: true });
    return task;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

const updateTaskEstado = async (req,res) => {
    try {
      task = {id:req.body.id, estado:req.body.estado}
      
      const task = await Task.findByIdAndUpdate(id, {estado }, { new: true });
      res.status(200).send({task,ok:true,msj:'tarea actualizada'});
    } catch (error) {
      throw new Error('Something went wrong');
    }
  };

const deleteTask = async (req,res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    var taslDel = await Task.findById(id);
    console.log(taslDel);
    if(taslDel.estado==='Asignado')
    {
        await Task.findByIdAndDelete(id);
        res.status(200).send({ok:true,msj:"tarea eliminada"})
    }
   
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksRol,
  updateTaskEstado,
};
