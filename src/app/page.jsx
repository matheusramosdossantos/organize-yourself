import TasksTable from "./components/TasksTable";
import styles from "./page.module.css";

export default function Tasks() {
  return (
    <main>
      <section className={styles.container}>
        <TasksTable />
      </section>
    </main>
  );
}
