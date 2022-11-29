const jwt = require('jsonwebtoken');

function jwtTokens({id,email}){
    const user = {id,email};
    const accessToken = jwt.sign(user,process.env.JWT_KEY,{expiresIn:'20s'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_JWT_KEY,{expiresIn:'5m'});
    return ({accessToken,refreshToken});
}

module.exports = {jwtTokens};