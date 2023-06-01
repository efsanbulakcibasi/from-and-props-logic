import { useEffect, useState } from 'react';
import './App.css';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import axios from 'axios';

function App() {
  const [task, setTask] = useState([])

  const onCreate = async (title,date,desc) => {
    //datayı yüklemek için
    const response = await axios.post("http://localhost:3004/tasks",{
      title,
      date,
      desc
    });
    console.log(response)
    const createdTask=[
      ...task,
      response.data
    ]
    setTask(createdTask)
  }

  const fetchData = async() => {
    //api de bulunan datayı getirmek için
    const response = await axios.get('http://localhost:3004/tasks');
    setTask(response.data)
  } 

  useEffect(() => {
    fetchData()
  },[])

  const editTaskById = async(id,updateTitle,updateDate,updateDesc) => {
    //burada axios put kullanırız fakat put kullandıktan sonra tanımladığımız gibi değişen hallerini tanımlamamız gerekir.
    await axios.put("http://localhost:3004/tasks/"+id,{
      id,
      title:updateTitle,
      date:updateDate,
      desc:updateDesc

    })
    const updateTask= task && task.map((task) => {
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
  const deleteTaskById = async(id) => {
    await axios.delete("http://localhost:3004/tasks/"+id)
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
