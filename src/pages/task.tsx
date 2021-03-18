import React from "react";
import { Redirect, useParams } from "react-router";
import { useAlert } from "../components/alerts/alerts-hooks";
import { AlertTypes } from "../components/alerts/alerts-types";
import { AddButton } from "../components/buttons/add-button";
import { Heading } from "../components/typography/heading";
import { Paragraph } from "../components/typography/paragraph";
import { useAddTask } from "../features/tasks/tasks-hooks";
import { tasksSelectors } from "../features/tasks/tasks-slice";
import { routes } from "../routing/routes";
import { useStoreSelector } from "../store";
import { Container } from "./dashboard";

export function Task() {
  const { id } = useParams<{ id: string }>();
  const task = useStoreSelector(state => tasksSelectors.selectById(state, id));

  const [newTask, setNewTask] = React.useState("");
  const [newTaskCache, setNewTaskCache] = React.useState("");
  const [isTextareaShowing, setIsTextareaShowing] = React.useState(false);

  const { isLoading, error, addTask } = useAddTask();
  const alert = useAlert();

  React.useEffect(() => {
    if (error) {
      alert.show({ type: AlertTypes.Error, text: error });
      setNewTask(newTaskCache);
    }
  }, [error]);

  if (!task) {
    return <Redirect to={routes.notFound} />
  }

  return (
    <Container>
      <Heading className="mb-16">{task.title}</Heading>

      {task.tasks.length > 0 &&
        <ul className="mb-8">
          {task.tasks.map(t => (
            <li key={t.id}>
              <Paragraph>{t.text}</Paragraph>
              <hr />
            </li>
          ))}
        </ul>
      }

      {isTextareaShowing &&
        <div>
          <textarea
            value={newTask}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewTask(e.target.value)}
          ></textarea>
          <div>
            <button onClick={async () => {
              if (isLoading) return;
              setNewTaskCache(newTask);
              setNewTask("");
              await addTask(task.id, newTask);
            }}>
              {isLoading ? "Loading..." :  "Add"}
            </button>
            <button onClick={() => {
              if (isLoading) return;
              setIsTextareaShowing(false);
              setNewTask("");
              setNewTaskCache("");
            }}>
              Cancel
            </button>
          </div>
        </div>
      }

      {!isTextareaShowing &&
        <AddButton onClick={() => setIsTextareaShowing(!isTextareaShowing)}>
          Add task
        </AddButton>
      }

    </Container>
  );
}
