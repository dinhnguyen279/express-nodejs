// import multer from "multer";
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

// SQL Delete
const deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("delete from users where id = ?", [userId]);
  return res.redirect("/");
};

// SQL Update
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

let getUploadFile = async (req, res) => {
  return res.render("uploadFile.ejs");
};

let handleUploadFile = async (req, res) => {
  // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any
  console.log(req.file);
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  // Display uploaded image for user validation
  res.send(
    `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
  );
};
// Upload Multiple File
let handleUploadMultipleFiles = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }
  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  console.log("check files: ", files);
  let index, len;

  //Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/image/${files[index].filename}" width='300' styles="margin-right:20px;">`;
  }
  result += '<hr/> <a href="/upload"> Upload more images</a> ';
  res.send(result);
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFile,
  handleUploadFile,
  handleUploadMultipleFiles,
};
