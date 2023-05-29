import { useState } from "react";
import CreateTask from "./CreateTask";

function TaskShow({ task, onDelete,onUpdate }) {
  const [show, setShow] = useState(false);
  const handleDeleteClick = () => {
    onDelete(task.id);
    debugger;
  };

  const handleEditClick = () => {
    setShow(true);
  };
  const handleSubmit = (id,updateTitle,updateDate,updateDesc) => {
    onUpdate(id,updateTitle,updateDate,updateDesc)
    setShow(false)
  }
  return (
    <div className="task-show">
      {
      show ? 
      (
        <CreateTask task={task} taskFromEdit={true} onUpdate={handleSubmit}/>
      ) : 
      (
        <div>
          <h3 className="task-title">Görev</h3>
          <p>{task.title}</p>
          <h3 className="task-title">Bitiş Tarihi</h3>
          <span className="task-span">{task.date}</span>
          <h3 className="task-title">Açıklama</h3>
          <p> {task.desc}</p>
          <div className="icons">
            <button className="task-delete" onClick={handleDeleteClick}>
              Sil
            </button>
            <button className="task-edit" onClick={handleEditClick}>
              Düzenle
            </button>
          </div>
        </div>
      )
      }
    </div>
  );
}

export default TaskShow;
