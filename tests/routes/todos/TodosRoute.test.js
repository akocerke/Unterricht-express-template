const request = require("supertest");
const app = require("../../../src/server");

describe("GET /v1/todos/all", () => {
  test("responds with json", async () => {
    const response = await request(app)
      .get("/v1/todos/all")
      .expect("Content-Type", /json/)
      .expect(200);

    const myTodos = response.body;
    const myFirstTodo = myTodos[0];

    expect(myTodos.length).toBeGreaterThan(0);
    expect(myFirstTodo.id).toBeDefined();
    expect(myFirstTodo.task).toBeDefined();
    expect(myFirstTodo.userId).toBeDefined();
  });
  test("responds with json", async () => {
    // Erwartete Antwort basierend auf den Testdaten
    const expectedResponse = [
      {
        dueDate: "2024-03-12T00:00:00.000Z",
        id: 1,
        isDone: false,
        task: "ToDo 1",
        userId: 1,
      },
      {
        dueDate: "2024-03-13T00:00:00.000Z",
        id: 2,
        isDone: false,
        task: "ToDo 2",
        userId: 1,
      },
      {
        dueDate: "2024-03-14T00:00:00.000Z",
        id: 3,
        isDone: true,
        task: "ToDo 3",
        userId: 1,
      },
      // Weitere ToDo-Einträge hier hinzufügen, falls erforderlich
    ];
  
    const response = await request(app)
      .get("/v1/todos/all")
      .expect("Content-Type", /json/)
      .expect(200);
  
    // Überprüfen, ob die tatsächliche Antwort mit der erwarteten Antwort übereinstimmt
    expect(response.body).toEqual(expectedResponse);
  });
  
});

describe("GET /v1/todos/byid", () => {
  test("Testet, ob die Antwort JSON ist und das ToDo anhand der ID zurückgibt", async () => {
    // Annahme: Es gibt keine ToDo-Einträge in der Datenbank
    const todoId = 90; // Annahme: Eine ungültige ID
    const response = await request(app)
      .get(`/v1/todos/byid?todoId=${todoId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    // Annahme: Der Server gibt ein leeres Objekt zurück, wenn keine ToDo mit der angegebenen ID gefunden wurde
    expect(response.body).toEqual({ todo: null });
  });
});
