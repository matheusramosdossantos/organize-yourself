"use client";

import styles from "./style.module.css";
import fingerUp from "../../../../public/icons/dedo-cima.png";
import Image from "next/image";
import TaskPopUp from "../TaskPopUp";
import { useEffect, useState } from "react";
import TaskPopUpContext from "@/app/contexts/TaskPopUpContext";
import TasksContext from "@/app/contexts/TasksContext";
import NewTasksContext from "@/app/contexts/NewTasksContexts";
import RepetitionDropdown from "../RepetitionDropdown";
import axios from "axios";

export default function TasksTable() {
  const [onEdit, setOnEdit] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    id: 1,
    name: "",
    category_name: "",
    status: "Pendente",
    repetition: "Diariamente",
  });

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [tasks]);

  const handleInputChange = async (event, id, key) => {
    const updatedTask = tasks.find((task) => task.id === id);
    updatedTask[key] = event.target.value;
    try {
      const res = await axios.put(`http://localhost:4000/${id}`, updatedTask);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      return;
    }
    const newArray = tasks.map((item) => (item.id === id ? updatedTask : item));
    setTasks((prevTasks) => newArray);
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/${id}`)
      .then(() => {
        const newArray = tasks.filter((task) => task.id !== id);

        setTasks(newArray);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <NewTasksContext.Provider value={{ newTask, setNewTask }}>
          <TaskPopUpContext.Provider value={{ showPopUp, setShowPopUp }}>
            <div className={styles.buttonDiv}>
              <button
                className={styles.addButton}
                onClick={() => {
                  setShowPopUp(true);
                  document.body.style.overflow = "hidden";
                  document.body.style.marginRight = "1rem";
                }}
              >
                <h3>+</h3>
              </button>
              {showPopUp ? (
                <>
                  <div className={styles.overlay}>
                    <TaskPopUp />
                  </div>
                </>
              ) : null}
            </div>
            {tasks == "" ? (
              <div className={styles.noTasksDiv}>
                <Image
                  src={fingerUp}
                  width={150}
                  height={150}
                  className={styles.fingerImg}
                  alt="Uma imagem de um dedo apontando para cima"
                />
                <h1 className={styles.noTasksText}>
                  Sem tarefas para cumprir...
                </h1>
                <h1 className={styles.noTasksText}>Adicione alguma.</h1>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr className={styles.column} id={styles.tableHeadColumn}>
                    <th className={styles.row} id={styles.tableHeadRow}>
                      NOME
                    </th>
                    <th className={styles.row} id={styles.tableHeadRow}>
                      CATEGORIA
                    </th>
                    <th className={styles.row} id={styles.tableHeadRow}>
                      STATUS
                    </th>
                    <th className={styles.row} id={styles.tableHeadRow}>
                      REPETIÇÃO
                    </th>
                    <th className={styles.row} id={styles.tableHeadRow}>
                      HORÁRIO
                    </th>
                  </tr>
                </thead>
                {tasks.map((task) => (
                  <tbody key={task.id}>
                    <tr className={styles.column}>
                      <td className={styles.row} id={styles.tableBodyRow}>
                        {onEdit === task.id ? (
                          <input
                            type="text"
                            className={styles.editInputs}
                            value={task.name}
                            onChange={(ev) =>
                              handleInputChange(ev, task.id, "name")
                            }
                          />
                        ) : (
                          task.name
                        )}
                      </td>
                      <td className={styles.row} id={styles.tableBodyRow}>
                        {onEdit === task.id ? (
                          <input
                            type="text"
                            className={styles.editInputs}
                            value={task.category_name}
                            onChange={(ev) =>
                              handleInputChange(ev, task.id, "category_name")
                            }
                          />
                        ) : (
                          task.category_name
                        )}
                      </td>
                      <td className={styles.row} id={styles.tableBodyRow}>
                        {onEdit === task.id ? (
                          <input
                            type="text"
                            className={styles.editInputs}
                            value={task.status}
                            onChange={(ev) =>
                              handleInputChange(ev, task.id, "status")
                            }
                          />
                        ) : (
                          task.status
                        )}
                      </td>
                      <td className={styles.row} id={styles.tableBodyRow}>
                        {onEdit === task.id ? (
                          <RepetitionDropdown
                            className={styles.select}
                            value={task.repetition}
                            onChange={(ev) =>
                              handleInputChange(ev, task.id, "repetition")
                            }
                          />
                        ) : (
                          task.repetition
                        )}
                      </td>
                      <td className={styles.row} id={styles.tableBodyRow}>
                        {onEdit === task.id ? (
                          <input
                            type="time"
                            className={styles.editInputs}
                            value={task.hour}
                            onChange={(ev) =>
                              handleInputChange(ev, task.id, "hour")
                            }
                          />
                        ) : (
                          task.hour
                        )}
                      </td>
                      <td className={styles.row} id={styles.tableBodyRow}>
                        <div className={styles.tableButtons}>
                          {onEdit === task.id ? (
                            <button
                              className={styles.saveButton}
                              onClick={() => setOnEdit(null)}
                            >
                              Salvar
                            </button>
                          ) : (
                            <button
                              className={styles.editButton}
                              onClick={() => setOnEdit(task.id)}
                            >
                              Editar
                            </button>
                          )}

                          <button
                            className={styles.removeButton}
                            onClick={() => handleDelete(task.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            )}
          </TaskPopUpContext.Provider>
        </NewTasksContext.Provider>
      </TasksContext.Provider>
    </>
  );
}
