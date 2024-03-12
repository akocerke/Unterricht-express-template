require("../../src/server");
const TodoModel = require("../../src/database/models/TodoModel");
const todoSequelize = require("../../src/database/setup/database");
const TestDataTodo = require("./testData/TestDataTodos");

module.exports = async () => {
  try {
    // todoSequelize.dropSchema("Todos").then(() => {
    //   todoSequelize.sync();
    // });
    console.log("PRDDD", process.env);
    await todoSequelize.sync();
    await todoSequelize.dropSchema("todos");
    await todoSequelize.sync();
    
    // DB mit Daten füllen, um DB auf Test Szenarien vorzubereiten
    await TodoModel.bulkCreate(TestDataTodo);

    console.log("Test DB init");
  } catch (e) {
    console.error("MY DB Issue", e);
  }
};






