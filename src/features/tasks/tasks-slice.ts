import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "../../store";

type TaskList = {
  id: string;
  title: string;
  tasks: Task[]
}

type Task = {
  id: string;
  text: string;
  completed: boolean;
}

type SliceState = {
  entities: TaskList[];
}

const initialState = {
  entities: []
} as SliceState;

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TaskList[]>) {
      state.entities = action.payload;
    },
    addTask(state, action: PayloadAction<{task: Task, id: string}>) {
      const { id, task } = action.payload;
      const tasklist = state.entities.find(t => t.id === id);
      if (tasklist) {
        tasklist.tasks.push(task);
      }
    }
  }
});

export const {
  reducer: tasksReducer,
  actions: tasksActions
} = tasksSlice;

export const tasksSelectors = {
  selectAll(state: StoreState) {
    return state.tasks.entities;
  },
  selectById(state: StoreState, id: string) {
    return state.tasks.entities.find(t => t.id === id);
  }
};
