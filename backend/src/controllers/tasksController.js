import { db } from "../db.js";

export const getTasks = (_, res) => {
  const q = "SELECT * FROM tasks";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addTask = (req, res) => {
  const q =
    "INSERT INTO tasks(`name`, `category_name`, `status`, `repetition`, `hour`) VALUES(?)";

  const values = [
    req.body.name,
    req.body.category_name,
    req.body.status,
    req.body.repetition,
    req.body.hour,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa criada com sucesso.");
  });
};

export const updateTask = (req, res) => {
  const q =
    "UPDATE tasks SET `name` = ?, `category_name` = ?, `status` = ?, `repetition` = ?, `hour` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.category_name,
    req.body.status,
    req.body.repetition,
    req.body.hour,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
};

export const deleteTask = (req, res) => {
  const q = "DELETE FROM tasks WHERE `id`= ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa excluída com sucesso.");
  });
};
