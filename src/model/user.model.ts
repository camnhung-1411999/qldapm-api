import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

export type IUser = mongoose.Document & {
  email: string;
  password: string;
  name: string;
  company: string;
  address: string;
  phone: string;
  image: string;
  signature: string;
  type: string;
  comparePassword: ComparePasswordFunction;
};

type ComparePasswordFunction = (this: IUser, candidatePassword: string, cb?: (err: any, isMatch: any) => {}) => void;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, index: true },
  password: String,
  company: String,
  address: String,
  phone: String,
  name: String,
  image: String,
  signature: String,
  type: String,
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(this: any, next: any) {
  const user = this as IUser;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (Err: mongoose.Error, hash) => {
      if (Err) { return next(Err); }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: ComparePasswordFunction = async function (this: IUser, candidatePassword) {
  const result = await bcrypt.compare(candidatePassword, this.password);
  return result;
};

userSchema.methods.comparePassword = comparePassword;


const UserCollection = mongoose.model<IUser>('User', userSchema);

export default UserCollection;
