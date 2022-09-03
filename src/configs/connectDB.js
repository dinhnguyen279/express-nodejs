// get the client
import mysql2 from "mysql2";

// create the connection to database
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
});

// simple query
// connection.query("SELECT * FROM `users` ", function (err, results, fields) {
//   console.log(">>>> mysql2 ");
//   console.log(results); // results contains rows returned by server
//   console.log(results[0]); // results contains rows returned by server
// });

export default connection;
