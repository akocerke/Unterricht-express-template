const request = require("supertest");
const app = require("../../../src/server");
const { StatusCodes } = require('http-status-codes');

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
    const response = await request(app)
      .get("/v1/todos/all")
      .expect("Content-Type", /json/)
      .expect(200);
  
    // Überprüfen, ob die Antwort ein Array ist
    expect(Array.isArray(response.body)).toBe(true);
  
    // Überprüfen, ob mindestens ein Eintrag im Array vorhanden ist
    expect(response.body.length).toBeGreaterThan(0);
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

describe("Test Mutations (POST CREATE)", () => {
  test("Test Create Object", async () => {
    const response = await request(app)
      .post(`/v1/todos/create`)
      .send({
        newTask: "Tennis spielen",
        newIsDone: false,
        newDueDate: "2026-10-10",
        newUserId: 2,
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });
});




describe("Test Mutations (PUT MARK)", () => {
  test("Test Mark Object as Done", async () => {
    // Annahme: Eine Aufgabe mit der ID 13 existiert bereits
    const todoId = 13;
    const newIsDone = true;

    const response = await request(app)
      .put(`/v1/todos/mark`)
      .send({
        todoId: todoId,
        newIsDone: newIsDone,
      })
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK);

    // Überprüfen Sie die Antwort, wenn erforderlich
    expect(response.body.updatedTodoId).toBe(todoId);
  });
  test("Test Mark Object as NOT Done", async () => {
    // Annahme: Eine Aufgabe mit der ID 3 existiert bereits
    const todoId = 3;
    const newIsDone = false;

    const response = await request(app)
      .put(`/v1/todos/mark`)
      .send({
        todoId: todoId,
        newIsDone: newIsDone,
      })
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK);

    expect(response.body.updatedTodoId).toBe(todoId);
  });
});



describe("Test Mutations (PUT UPDATE)", () => {
  test("Test Update Object", async () => {
    // Annahme: Eine Aufgabe mit der ID 3 existiert bereits
    const todoId = 3;
    const newTask = "Neue Aufgabe";
    const newIsDone = true;
    const newDueDate = "2024-03-15";

    const response = await request(app)
      .put(`/v1/todos/update`)
      .send({
        todoId: todoId,
        newTask: newTask,
        newIsDone: newIsDone,
        newDueDate: newDueDate,
      })
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK);

    expect(response.body.updatedTodoId).toBe(todoId);
  });
});




describe("Test Mutations (DELETE)", () => {
  test("Test Delete Object", async () => {
    // Annahme: Eine Aufgabe mit der ID 123 existiert bereits
    const todoId = 123;

    const response = await request(app)
      .delete(`/v1/todos/delete`)
      .send({
        todoId: todoId,
      })
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK);

    // Überprüfen Sie die Antwort, wenn erforderlich
    expect(response.body.deletedTodosId).toBe(todoId);
  });
});
