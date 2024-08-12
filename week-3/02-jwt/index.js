const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z = require('zod');

const user = z.object(
    {
      email: z.string().email(),
      password: z.string().min(6)
    }
  )
/**
 * Generates a JWT for a given email and password.
 *
 * @param {string} email - The email to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the email and password are valid.
 *                        Returns null if the email is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(email, password) {
    // Your code here
    const validInput = user.safeParse({email:email,password:password})
    if(!validInput.success){
        return null
    }
    const token = jwt.sign({email:email}, jwtPassword)
    return token;
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    // Your code here
    try {
        jwt.verify(token,jwtPassword)
    } catch (error) {
        return false
    }
    return true
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    // Your code here
    const decoded = jwt.decode(token)
    if (decoded) {
        return true
    }
    return false
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
