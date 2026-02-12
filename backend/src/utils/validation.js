const validator = require("validator");

const validateSignupData = (req) => {
  const { firstname, lastname, emailid, password } = req.body;

  if (!firstname || !lastname) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailid)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!");
  }
};

const validateEditProfileData = (req) => {
  const ALLOWED_UPDATES = ["firstname", "lastname", "gender", "age"];
  const updates = Object.keys(req.body);
  const isUpdateAllowed = updates.every((update) =>
    ALLOWED_UPDATES.includes(update)
  );
  return isUpdateAllowed;
};

module.exports = {
  validateSignupData,
  validateEditProfileData,
};
