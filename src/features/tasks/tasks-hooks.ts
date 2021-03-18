import React from "react";
import { API } from "../../api/api";
import { useStoreDispatch } from "../../store";
import { tasksActions } from "./tasks-slice";

export function useFetchTasks() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const dispatch = useStoreDispatch();

  async function fetchTasks() {
    setError(null);

    setIsLoading(true);
    const res: any = await API.tasks.getAll();
    if (res.error) {
      setError(res.error);
      setIsLoading(false);
      return;
    }

    dispatch(tasksActions.setTasks(res.data.tasks));
    setIsLoading(false);
  }

  return { isLoading, error, fetchTasks };
}

export function useAddTask() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const dispatch = useStoreDispatch();

  async function addTask(id: string, text: string) {
    setError(null);
    setIsLoading(true);

    const res: any = await API.tasks.addTask({ text });
    if (res.error) {
      setError(res.error);
      setIsLoading(false);
      return;
    }

    dispatch(tasksActions.addTask({ id, task: res.data }))
    setIsLoading(false);
  }

  return { isLoading, error, addTask };
}
