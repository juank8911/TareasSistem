const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config');

const register = async (username, password) => {
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ username: user.username }, config.jwtSecret, { expiresIn: '1h' });

    return token;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

const isAuthenticated = async(token) =>
{
 
  try {
    if (token) {
      // Acceder y manejar las cookies aquí

      const decodedToken = jwt.verify(token, SECRET_KEY);
      
      console.log(decodedToken);
      
      const user = decodedToken.user;
      // Imprime el objeto 'user' en la consola
          console.log('buscanod usuario')
          return decodedToken;
    // Usuario.findById(user._id).
            //   then(user=>{
                // console.log('usuario de autorizacion');
                //  console.log(user?.userName);
                //  if(user){next()}else{
                // res.status(401).json({ error: 'Unauthorized' });
            //   }})
      
    } else {
      // No se encontraron cookies en la solicitud
      return null
      console.log('else')
    }
      
  } catch (error) {
    return null;
    throw error;
     return  error; 
  }
}

module.exports = {
  register,
  login
};
