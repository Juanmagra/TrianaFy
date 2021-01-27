import bcrypt from 'bcryptjs';
import 'dotenv/config';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: String,
  username: String,
  email: String,
  password: String
});

const emailExists = async (email) => {
  const result = await User.countDocuments({ email: email }).exec();
  return result > 0;

}
const userRepository = {


  async findAll() {
    const result = await User.find({}).exec();
    return result;
  },
  async findById(id) {
    const result = await User.findById(id).exec();
    return result != null ? result : undefined;
  },

  async create(newUser) {
    const theUser = new User({
      username: newUser.username,
      email: newUser.email
    });
    const result = await theUser.save();
    return result;
  },

  async updateById(id, modifiedUser) {
    const posicionEncontrado = indexOfPorId(id)
    if (posicionEncontrado != -1) {
      users[posicionEncontrado].username = modifiedUser.username;
    }
    return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
  },

  async update(modifiedUser) {
    return this.updateById(modifiedUser.id, modifiedUser);
  },
  async delete(id) {
    const posicionEncontrado = indexOfPorId(id);
    if (posicionEncontrado != -1)
      users.splice(posicionEncontrado, 1);
  }

}


export {
  userSchema,
  userRepository,
  emailExists
}