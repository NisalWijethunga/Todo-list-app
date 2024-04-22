'use client';

import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

 interface TaskProps{
    task:ITask
 }
 
  export const Task: React.FC<TaskProps> = ({task}) => {
        const router = useRouter();
        const [openmodelEdit, setOpneModelEdit] = useState<boolean>(false);
        const [openmodelDeleted, setOpneModelDeleted] = useState<boolean>(false);
        const [taskToEdit, setTaskToEdit] = useState<string> (task.text)

        const handleSubmitEdittodo: FormEventHandler<HTMLFormElement> = async (e) => {
            e.preventDefault();
            await editTodo({
             id:task.id,
             text: taskToEdit
            }
            )
            
            setOpneModelEdit(false);
            router.refresh();
       
         }
         const handleDeleteTask = async (id: string) =>{
            await deleteTodo(id);
            setOpneModelDeleted(false);
            router.refresh();
         }


  return (
  <tr key={task.id}>
  <td className="w-full">{task.text}</td>
  <td className="flex gap-5">
  <FaRegEdit onClick={() => setOpneModelEdit(true) } cursor="pointer" className="text-blue-500" size={25}/>
  <Modal modalOpen={openmodelEdit}  setModalOpen={setOpneModelEdit}>
          <form onSubmit={handleSubmitEdittodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
            <input 
            value={taskToEdit}
            onChange={(e) => setTaskToEdit(e.target.value)}
            type="text" placeholder="Type here" className="input input-bordered w-full w-full" />
            <button type="submit" className="btn">Add</button>
            </div>
          </form>
        </Modal>
  <FiTrash2 onClick={() => setOpneModelDeleted(true)} cursor="pointer" className="text-red-500" size={25}/>
  <Modal modalOpen={openmodelDeleted} setModalOpen={setOpneModelDeleted} >
         
         <h3 className="text-lg">Are u sure, u want to dlt this?</h3>
         <button onClick={() => handleDeleteTask(task.id)} className="btn">
            Yes
         </button>
        </Modal>
  </td>
</tr>
  )
}
