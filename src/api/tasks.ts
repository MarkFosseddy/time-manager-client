async function fakeApi(data: any) {
  const random = Math.floor(Math.random() * 10);

  return new Promise((resolve, _) => {
    setTimeout(() => {
      if (random >= 2) {
        resolve({ status: 200, data: data, error: null });
      } else {
        resolve({
          status: 400,
          data: null,
          error: "There was an error doing operation"
        });
      }
    }, 1000);
  });
}

async function getAll() {
  return fakeApi({
    tasks: [
      {
        id: "1",
        title: "Today",
        tasks: [{
          id: "1",
          text: "Do something",
          completed: false
        }]
      },
      {
        id: "2",
        title: "Shopping list",
        tasks: [{
          id: "1",
          text: "Buy milk",
          completed: false
        }]
      }
    ]
  });
}

type AddTaskBody = {
  text: string;
}

async function addTask(body: AddTaskBody) {
  return fakeApi({
    ...body,
    id: String(Date.now()),
    completed: false
  })
}

export const tasks = { getAll, addTask };
