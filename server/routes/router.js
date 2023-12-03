const express = require("express");
const router = express.Router();

const emailSchema = require("../models/EmailVerification");

const userModel = require("../models/User");
const blockModel = require("../models/BlockData");
const faqModel = require("../models/FreqAQ");
const { encryptPassword, comparePassword } = require("../configs/password-helper");
const storyModel = require("../models/Stories");
const ResumeBuilder = require("../resume-builder/resume-builder");

const isAuth = (req, res, next) => {
  if (req?.session?.userEmail) {
    next();
  } else {
    res.json("User not authenticated!");
  }
};

router.get("/users", async (req, res) => {
  await userModel
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.delete("/user", async (req, res) => {
  const user = await userModel.deleteOne({ email: req?.body?.email });
  user.deletedCount;
  res.json(user);
});

router.get("/blockData", async (req, res) => {
  await blockModel
    .find()
    .then((blockData) => res.json(blockData))
    .catch((err) => res.json(err));
});

router.get("/check-link", async (req, res) => {
  const { url } = req.query;
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const lastModifiedHeader = response.headers.get("last-modified");
    if (!lastModifiedHeader) {
      res
        .status(501)
        .send("last-modified header not present, might be older than 365 days");
      return;
    }
    res.json({ lastModified: lastModifiedHeader });
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
});

router.post('/validate-link', async(req, res) => {
    try{
        const response = await fetch(req?.body?.url, {
            method: 'HEAD'
        })
        if (response?.status >= 200 && response?.status < 300){
          return res.status(200).json(true)
        }
        res.status(404).json(false)
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

router.get("/faqs", async (req, res) => {
  await faqModel
    .find()
    .then((faq) => res.json(faq))
    .catch((err) => res.json(err));
});

router.get("/stories", async (req, res) => {
  await storyModel
    .find()
    .then((story) => res.json(story))
    .catch((err) => res.json(err));
});

router.post("/users", async (req, res) => {
  const { error } = emailSchema.validate(req?.body?.email);
  if (error) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const userExist = await userModel.where("email").equals(req?.body?.email);
  if (userExist.length) {
    return res.status(409).json({ message: "User already exists" });
  }

  const encryptedPassword = await encryptPassword(req?.body?.password);
  const user = new userModel({
    email: req?.body?.email,
    firstName: req?.body?.firstName,
    password: encryptedPassword,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req?.body?.email });
    if (!user) {
      return res.json({ error: `User doesn't exist` });
    }
    const validate = await comparePassword(user?.password, req.body?.password);
    if (validate) {
      req.session.isAuth = true;
      req.session.userEmail = req?.body?.email;
      return res.status(200).json({ message: "Valid user", access: true});
    }
    res.json({ message: "Invalid Password", access: false });
  } catch (err) {
    res.json(err);
  }
});

router.get("/signin", async (req, res) => {
  if (req?.session?.userEmail) {
    return res.status(200).json({ loggedIn: true });
  }
  res.status(404).json({ loggedIn: true });
});

router.get("/signout", (req, res) => {
  req?.session?.destroy();
  res.json({ loggedIn: false });
});

router.post("/faq", async (req, res) => {
  try {
    req?.body.map(async (item, index) => {
      const faq = new faqModel({
        question: item?.question,
        answer: item?.answer,
      });
      const newFaq = await faq.save();
    });

    res.status(201).json(req?.body);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/blockData", async (req, res) => {
  try {
    req?.body.map(async (item, index) => {
      const blockData = new blockModel({
        id: item?.id,
        name: item?.name,
        link: item?.link,
        description: item?.description,
      });
      await blockData.save();
    });
    res.status(201).json({ message: "Block datas added successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.patch("/favorites", async (req, res) => {
  //get the user from db
  //query the user's current favs
  //add new fav block to the list
});

router.delete("/favorites", async(req, res) => {
  //get the user from db
  //query the user's current favs
  //remove the unfavorited block
})

router.get("/favorites", async(req, res) => {
  try{
    const userEmail = req?.session?.userEmail
    const user = userModel.findOne({email: userEmail})
    res.status(200).json(user?.favorites)
  }
  catch(err){
    res.json(err)
  }
})

router.get("/api", (req, res) => {
  res.json({
    pFundamentals: [
      "w3schools",
      "freeCodeCamp",
      "codeacademy",
      "neetCode",
      "coursera",
      "geeksforgeeks",
      "harvardCS50",
    ],
    dSA: ["neetCode", "coursera", "geeksforgeeks"],
    note: ["personalNote", "onlineNote"],
  });
});

router.post("/resume", (req, res) => {
  try {
    const data = req.body;
    const resumeContent = ResumeBuilder.create(data);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader("Content-Disposition", "attachment; filename=resume.docx");

    // Send the resume
    res.send(resumeContent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/test", async (req, res) => {
  req.session.isAuth = true;
  res.json(req.session);
});

router.get("/", (req, res) => {
  res.send("Hello")
})

module.exports = router;
