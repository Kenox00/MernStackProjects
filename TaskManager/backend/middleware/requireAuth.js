/**
 * middleware to check if user is authenticated
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware to call
 */
const requireAuth = async (req, res, next) => {
    // check if headers contain authorization token
    const { authorization } = req.headers;

    if( !authorization){
        // if not, return error that authorization token is required
        return res.status(401).json({error: 'authorization token required'});
    }

    // extract token from authorization header
    const token = authorization.split(' ')[1];

    try {
        // verify token, if valid, extract user id from it
        const { _id } = jwt.verify(token, process.env.SECRET);

        // find user by id and attach it to request object
        req.user= await User.findOne({ _id }).select('_id');
    } catch (error) {
        // if token is invalid, return error that request is not authorized
        console.log(error);
        return res.status(401).json({error: 'request is not authorized'})
    }
}


module.exports = requireAuth