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


module.exports = {
  encryptPassword,
  comparePassword
};
