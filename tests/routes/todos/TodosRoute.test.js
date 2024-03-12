const request = require("supertest");
const app = require("../../../src/server");

describe("GET /v1/todos/all", () => {
  test("responds with json", async () => {
    const response = await request(app)
      .get("/v1/todos/all")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual([]);
  });
});



// Die Abfrage schlägt fehl, da in unserer realen Datenbank todo_app_test noch keine Testdaten vorhanden sind
describe("GET /v1/todos/byid", () => {
  test("Testet, ob die Antwort JSON ist und das ToDo anhand der ID zurückgibt", async () => {
    // Annahme: Es gibt mindestens ein ToDo in der Datenbank
    const todoId = 1; // Annahme: ID des vorhandenen ToDo
    const response = await request(app) // initialisiert eine HTTP-Anfrage an den Server
      .get(`/v1/todos/byid?to${todoId}`) // const todoId: 1 ist hinterlegt
      .expect("Content-Type", /json/) // json format wird zurück erwartet
      .expect(200); // HTTP-Statuscode 200  (OK) wird erwartet

    // Annahme: Der Server gibt das ToDo mit der angegebenen ID zurück
    expect(response.body.id).toEqual(todoId);
  });
});
