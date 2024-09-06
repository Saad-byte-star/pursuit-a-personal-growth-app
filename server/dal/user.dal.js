const User = require('../models/user.model');


async function getUserById(req, res) {

    try {
        const uid = req.params.id;
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ msg: `user not found for id : ${uid}` });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        console.log(`error at getUserById : ${err}`);
        res.status(500).json({ msg: `failed to get user by id` });
    }
};


async function getAllUser(req, res) {

    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ msg: `failed to get all users` });
        }
        return res.status(200).json(users);
    }
    catch (err) {
        console.log(`error at getAllUsers : ${err}`);
        res.status(500).json({ msg: `failed to get user by id` });
    }
};

async function addUser(req, res) {

    try {
        const { Name, Email, Password, ProfilePicture, Role } = req.body;
        const userExists = await User.find({ "Email": Email });
        if (userExists) {
            return res.status(400).json({ msg: `email already registered` });
        }
        const added = await User.create({ Name, Email, Password, ProfilePicture, Role });
        res.header("location", `${req.orignalUrl}/${added._id}`);
        res.status(201).json({
            msg: `registration successful`,
            name: added.Name,
            token: await added.generateToken()
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: `failed to add user` });
    }
};


async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const { Name, Email, Password, Role } = req.body;

        // If Password is being updated, hash it before saving
        const updateData = { Name, Email, Role };
        if (Password) {
            const saltRounds = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(Password, saltRounds);
            updateData.Password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: `User not found` });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update user" });
    }
}


async function deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: `User not found` });
      }
  
      return res.status(200).json(deletedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete user" });
    }
  }
  

  async function loginUser(req, res) {
    try {
      const { Email, Password } = req.body;
      const user = await User.findOne({ Email });
  
      if (!user) {
        return res.status(400).json({ message: `User not found` });
      }
  
      const isPasswordValid = await user.comparePassword(Password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: `Invalid password` });
      }
  
      const tokens = await user.generateToken();
      console.log(tokens);
  
      res.cookie("authToken", tokens.authToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // Uncomment in production
        sameSite: "Strict",
      });
  
      return res.status(200).json({
        message: 'Login successful',
        refreshToken: tokens.refreshToken // Optional: Return refresh token if needed
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to login" });
    }
  }
 

module.exports = {
    getUserById,
    getAllUser,
    addUser,
    updateUser,
    deleteUser,
    loginUser
}