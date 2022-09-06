import pool from "../configs/connectDB";

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.render("index.ejs", { dataUser: rows });
};

// Lấy thông tin từng id user
let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute("SELECT * From users where id = ?", [userId]);

  console.log(">>check users: ", user);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log("check req: ", req.body);

  // Cách 1: đối với beginner
  // let firstName = req.body.firstName;
  // let lastName = req.body.lastName;
  // let email = req.body.email;
  // let address = req.body.address;

  // Cách 2: dùng Destructuring của js là cú pháp giảng lượt
  let { firstName, lastName, email, address } = req.body;

  await pool.execute(
    "INSERT INTO users(firstName, lastName, email, address) values (?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
};
