const passport = require("passport");
/**
 * Adds a virtual field 'id' that returns the '_id' as 'id' and sets toJSON options.
 * @param {Schema} schema - The Mongoose schema to modify.
 */
exports.addCommonSchemaOptions = (schema) => {
  // Create a virtual field 'id' that returns the '_id' as 'id'
  const virtual = schema.virtual("id");
  virtual.get(function () {
    return this._id;
  });

  // Set the toJSON options for the schema
  schema.set("toJSON", {
    virtuals: true, // Include virtual fields in the JSON representation
    versionKey: false, // Exclude the '__v' field
    transform: (doc, ret) => {
      delete ret._id; // Remove the '_id' field
    },
  });
};

exports.isAuth = () => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

exports.accountCreationtemplate = `
<h1>Thanks for Creating Account</h1>
<p>
Thank you for creating an account with My-Commerce! We're thrilled to have you on board and look forward to providing you with a seamless shopping experience.
</p>

<h3>Regards</h3>
<p> Team My-Commerce</p>
`;
