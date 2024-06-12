"use client";

import { useContext } from "react";
import styles from "./style.module.css";
import TaskPopUpContext from "@/app/contexts/TaskPopUpContext";
import TasksContext from "@/app/contexts/TasksContext";
import NewTasksContext from "@/app/contexts/NewTasksContexts";
import RepetitionDropdown from "../RepetitionDropdown";
import axios from "axios";

export default function TaskPopUp() {
  const { setShowPopUp } = useContext(TaskPopUpContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const { newTask, setNewTask } = useContext(NewTasksContext);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000", newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.log(error);
    }

    setNewTask({
      name: "",
      category_name: "",
      status: "Pendente",
      repetition: "Diariamente",
    });
    setShowPopUp(false);
    document.body.style.overflow = "auto";
    document.body.style.marginRight = "0";
  };

  return (
    <>
      <div className={styles.taskPopUp}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.title}>Adicione uma nova tarefa</h1>
          <div className={styles.inputsDiv}>
            <input
              type="text"
              placeholder="Nome..."
              className={styles.input}
              value={newTask.name}
              required
              onChange={(ev) =>
                setNewTask({ ...newTask, name: ev.target.value })
              }
            />
            <input
              type="text"
              placeholder="Categoria..."
              className={styles.input}
              value={newTask.category_name}
              required
              onChange={(ev) =>
                setNewTask({
                  ...newTask,
                  category_name: ev.target.value,
                })
              }
            />
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "space-between",
              }}
            >
              <RepetitionDropdown
                className={styles.select}
                value={newTask.repetition}
                onChange={(ev) =>
                  setNewTask({
                    ...newTask,
                    repetition: ev.target.value,
                  })
                }
              />
              <input
                type="time"
                className={styles.timeInput}
                value={newTask.hour}
                required
                onChange={(ev) =>
                  setNewTask({
                    ...newTask,
                    hour: ev.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={styles.buttonsDiv}>
            <button className={styles.button}>Concluir</button>
            <button
              className={styles.button}
              onClick={() => {
                setShowPopUp(false);
                document.body.style.overflow = "auto";
                document.body.style.marginRight = "0";
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
