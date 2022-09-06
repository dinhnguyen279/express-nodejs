// get the client
import mysql2 from "mysql2/promise";

// create the connection to database
console.log("Create connection pool...");

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
  // password:'password'
});

export default pool;
