const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
    // Define the local strategy for email and passport authentication
    passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            // find the user
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return done(null, false, { message: "Incorrect password" });
            }
            // Authentication successful , return the user object
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }))
    // Serialize the user object to store in the session
    // Serialization: This is done using passport.serializeUser(), where you typically store the user ID in the session.

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    // Deserialize the user object from the session
    // Deserialization: This is done using passport.deserializeUser(), which retrieves the user object based on the stored ID.
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    })
}

