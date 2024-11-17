
const logInUser = async (req, res) => {
    res.json({message: "User logged in"})
}
const signUpUser = async (req, res) => {
    res.json({message: "User signed up"})
}

module.exports = {logInUser, signUpUser}