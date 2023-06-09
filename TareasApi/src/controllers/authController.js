const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config');


const register = async (req, res) => {
  try {
    console.log('register');
    console.log(req.body);
    const { username, password,nombre,rol } = req.body;
    console.log(username,password,nombre,rol)
    const existingUser = await User.findOne({ username });
    console.log('busqueda');
    // console.log(existingUser.username,existingUser.password+'existe')
    if (existingUser) {
        console.log('existe')
      return res.status(409).json({ message: 'Username already exists' });
    }
    console.log('no existe')
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = new User({
        nombre,
        rol,
        username,
        password: hashedPassword,
    });
    await newUser.save();
    console.log(newUser.username,newUser.password);
    res.status(200).send({ message: 'User registered successfully' });
    // res.status(201).json();
  } catch (error) {
    res.status(500).send({error, message: 'Something went wrongggg' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ user:{ username: user.username,rol:user.rol,nombre:user.nombre} }, config.jwtSecret);

    res.status(200).json({ token,rol:user.rol});
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const isAuthenticated = async (req, res,next) => {
        console.log('isAuthenticated');
    try 
  {
    var cookieHeader;
    var decodedToken;
    console.log(req.headers)
    console.log('adminAutorizacion')
    if(req.headers.authorization)
    {
        console.log('req.headers.authorization')

      cookieHeader = req.headers.authorization;
      console.log(cookieHeader)
      decodedToken = await jwt.decode(cookieHeader.replace('Bearer ', ''))
      console.log(decodedToken)
    } 
    else if (cookieHeader) {
        console.log('cookies')
      const token = cookieHeader;
      console.log(token);
     
       decodedToken = await jwt.decode(decodedToken.replace('Bearer ', ''));
       console.log('decode---------- '+decodedToken);
       console.log(decodedToken);
    //    decodedToken = jwt.verify(decodedToken, config.jwtSecret)
    //    console.log('verifiy-------------------'+decodedToken)
    }
    else
    {
        console.log('unautor')
        res.status(401).json({ error: 'Unauthorized' });
    }



    if (decodedToken) {
      // Acceder y manejar las cookies aquí
      console.log('decoder..')
    //  decodedToken = await jwt.decode(token.replace('Bearer ', ''));
      const user = decodedToken;
      console.log(user)
      // Imprime el objeto 'user' en la consola
          console.log('buscanod usuario')
          if(user.rol='eject')
          {
            console.log('eject')
            next();
          }
          else
          {
            console.log('sin autorizacion')
            res.status(401).json({ error: 'Unauthorized' });
          }
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
    res.status(401).json({ error ,status: 'Unauthorized' });
    throw error;
     return  error; 
  }
}

const isAuthenticatedAdmin = async(req,res,next) =>
{
 
  try 
  {
    var cookieHeader;
    var decodedToken;
    console.log(req.headers)
    console.log('adminAutorizacion')
    if(req.headers.authorization)
    {
        console.log('req.headers.authorization')

      cookieHeader = req.headers.authorization;
      console.log(cookieHeader)
      decodedToken = await jwt.decode(cookieHeader.replace('Bearer ', ''))
      console.log(decodedToken)
    } 
    else if (cookieHeader) {
        console.log('cookies')
      const token = cookieHeader;
      console.log(token);
     
       decodedToken = await jwt.decode(decodedToken.replace('Bearer ', ''));
       console.log('decode---------- '+decodedToken);
       console.log(decodedToken);
    //    decodedToken = jwt.verify(decodedToken, config.jwtSecret)
    //    console.log('verifiy-------------------'+decodedToken)
    }
    else
    {
        console.log('unautor')
        res.status(401).json({ error: 'Unauthorized' });
    }



    if (decodedToken) {
      // Acceder y manejar las cookies aquí
      console.log('decoder..')
    //  decodedToken = await jwt.decode(token.replace('Bearer ', ''));
      const user = decodedToken;
      console.log(user)
      // Imprime el objeto 'user' en la consola
          console.log('buscanod usuario')
          if(user.rol='admin')
          {
            console.log('admin')
            next();
          }
          else
          {
            console.log('sin autorizacion')
            res.status(401).json({ error: 'Unauthorized' });
          }
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
    res.status(401).json({ error ,status: 'Unauthorized' });
    throw error;
     return  error; 
  }
}

const getEject = async (req,res) => {
    try {
        var users = await User.find({rol:"eject"});
        res.status(200).json({users, ok:true});
    }catch(error){
        console.log(error)
        res.status(200).json({msj:"no se encontraron ejecutores", ok:true});
    }   
    }

module.exports = {
  register,
  login,
  isAuthenticatedAdmin, 
  isAuthenticated,
  getEject
};

