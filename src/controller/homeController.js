import pool from "../configs/connectDB";

const getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.render("index.ejs", { dataUser: rows });
};

// Lấy thông tin từng id user
const getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute("SELECT * From users where id = ?", [userId]);

  console.log(">>check users: ", user);
  return res.send(JSON.stringify(user));
};

const createNewUser = async (req, res) => {
  console.log("check req: ", req.body);

  // Cách 1: đối với beginner
  // let firstName = req.body.firstName;
  // let lastName = req.body.lastName;
  // let email = req.body.email;
  // let address = req.body.address;

  // Cách 2: dùng Destructuring của js là cú pháp giảng lượt
  const { firstName, lastName, email, address } = req.body;

  await pool.execute(
    "INSERT INTO users(firstName, lastName, email, address) values (?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

const deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("delete from users where id = ?", [userId]);
  return res.redirect("/");
};

const getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("select * from users where id = ?", [id]);
  return res.render("update.ejs", { dataUser: user[0] });
};

const postUpdateUser = async (req, res) => {
  const { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "Update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );
  console.log("check req: ", req.body);
  return res.redirect("/");
};
module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
};
