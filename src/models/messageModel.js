
const { createConnection } = require("mysql2");

const dbConnection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
});


const saveMessage = (userID, message) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      'INSERT INTO Messages (userID, message) VALUES (?, ?)',
      [userID, message],
      function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  saveMessage,
};
