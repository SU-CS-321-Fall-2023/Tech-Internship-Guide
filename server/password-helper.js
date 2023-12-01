const bcrypt = require("bcrypt");

// Convert plain text password to encrypted password
const encryptPassword = async (plainPassword) => {
  const saltRounds = 15;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

// Compare the password to check they are same
const comparePassword = async (encryptedPassword, plainPassword) => {
  const isMatched = await bcrypt.compare(plainPassword, encryptedPassword);
  return isMatched;
};

const testPasswordHelper = async () => {
  const plainPassword = "passw0rd";
  const encryptedPassword = await encryptPassword(plainPassword);
  if (plainPassword !== encryptedPassword) {
    console.log("Encrypted password => ", encryptedPassword);
  }

  if (await comparePassword(encryptedPassword, plainPassword)) {
    console.log("Its working");
  }
};

module.exports = {
  encryptPassword,
  comparePassword,
  testPasswordHelper,
};
