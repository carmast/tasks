const login_router = require("express").Router();
const fs = require('fs');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

login_router.get("/", async (req, res) => {


  fs.readFile("static/login/login.html", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });

});


login_router.post("/", async (req, res) => {

  try {
    let rawdata = fs.readFileSync('data.json');
    let user = JSON.parse(rawdata);

    if (req.body.username !== user?.username) {
      res.status(401).json("Username Wrong credentials!");
      return;
    }

    const user_enycript = CryptoJS.AES.encrypt(user?.password, process.env.PASS_SEC).toString();
    const hashedPassword = CryptoJS.AES.decrypt(user_enycript, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json({ status: 401, message: 'Password Wrong credentials!' });
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user?.id,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    const { password, ...others } = user;
    console.log(others)
    res.status(200).json({ ...others, accessToken });

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


module.exports = login_router;


