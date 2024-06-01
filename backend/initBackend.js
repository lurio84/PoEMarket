const { exec } = require("child_process");
const db = require("./models");

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, error);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
};

const initBackend = async () => {
  try {
    console.log("Connecting to the database...");
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");

    console.log("Reverting all migrations...");
    await runCommand("npx sequelize-cli db:migrate:undo:all");

    console.log("Running database migrations...");
    await runCommand("npx sequelize-cli db:migrate");

    console.log("Running seeders...");
    await runCommand("npx sequelize-cli db:seed:all");

    console.log("Starting the server...");
    require("./server"); // Arranca el servidor desde server.js
  } catch (error) {
    console.error("Error initializing the backend:", error);
  }
};

initBackend();
