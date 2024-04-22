'use client';

import { FaPlus } from "react-icons/fa6";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewtaskvalue] = useState<string>('');

  const handleSubmitNewtodo: FormEventHandler<HTMLFormElement> = async (e) => {
     e.preventDefault();
     await addTodo({
      id:uuidv4(),
      text: newTaskValue
     }
     )
     setNewtaskvalue('')
     setModalOpen(false);
     router.refresh();

  }

  return (
    <div>
        <button onClick={() => setModalOpen(true)}  className="btn btn-primary w-full">Add new task
        <FaPlus />
        </button>
        <Modal modalOpen={modalOpen}  setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewtodo}>
            <h3 className="font-bold text-lg">Add new task</h3>
            <div className="modal-action">
            <input 
            value={newTaskValue}
            onChange={(e) => setNewtaskvalue(e.target.value)}
            type="text" placeholder="Type here" className="input input-bordered w-full w-full" />
            <button type="submit" className="btn">Add</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}
