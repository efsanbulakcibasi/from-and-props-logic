import { useState } from 'react';
import './App.css';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';

function App() {
  const [task, setTask] = useState([])

  const onCreate = (title,date,desc) => {
    const createdTask=[
      ...task,
      {
        id:Math.round(Math.random()*999),
        title,
        date,
        desc
      }
    ]
    setTask(createdTask)
    localStorage.setItem("taskList",JSON.stringify(createdTask))

  }

  const editTaskById = (id,updateTitle,updateDate,updateDesc) => {
    const updateTask= task.map((task) => {
      if (task.id === id) {
        return {
          id,
          title:updateTitle,
          date:updateDate,
          desc:updateDesc
        }
      }{
        return task
      }
    })
    setTask(updateTask)
  }
  const deleteTaskById = (id) => {
   const newList= task.filter((x) =>{
    return x.id !== id
   });
   setTask(newList)
  }
  return (
    <div className="App">
      <CreateTask onCreate={onCreate}/>
      <h1>Görevler</h1>
      <TaskList tasks={task} onDelete={deleteTaskById} onUpdate={editTaskById}/>
    </div>
  );
}

export default App;
