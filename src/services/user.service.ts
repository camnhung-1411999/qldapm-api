import { AuthTokenCollection, IAuthToken } from "../model/auth.model";
import UserCollection, { IUser } from "../model/user.model";
import authUtils from "../utils/auth";
class UserService {
  async list() {
    const users = await UserCollection.find();
    return users;
  }

  async find(input: string) {
    const user = await UserCollection.findOne({
      email: input,
    });
    if (!user) {
      const err: Error = new Error();
      err.message = "User not found";
      err.name = "Error";
      throw err;
    }
    return user;
  }

  async detail(input: any) {
    const findUser = await UserCollection.findOne({
      email: input.email,
    });
    if (!findUser) {
      const err: Error = new Error();
      err.message = "NOT_FOUND";
      err.name = "Error";
      throw err;
    }

    let token: any;
    if (input.password) {
      const isMatch: any = await findUser.comparePassword(input.password);
      if (!isMatch) {
        const err: Error = new Error();
        err.message = "NOT_MATCH";
        err.name = "Error";
        throw err;
      }
    }
    // Create Token
    const newAccessToken = await authUtils.generateAccessToken(input);
    const newRefreshToken = await authUtils.generateRefreshToken(input);
    // let kind = find.getService();
    const authToken = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      kind: "",
    };
    return AuthTokenCollection.findOne({ user: findUser.id }).then(
      async (existingUser: IAuthToken | null) => {
        if (existingUser) {
          token = await AuthTokenCollection.findOneAndUpdate(
            { user: findUser.id },
            authToken
          );
        } else {
          token = await AuthTokenCollection.create({
            user: findUser.id,
            ...authToken,
          });
        }
        return {
          email: findUser.email,
          name: findUser.name,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };
      }
    );
  }

  async create(input: IUser) {
    await UserCollection.findOne({
      email: input.email,
    }).then((user) => {
      if (user) {
        const err: Error = new Error();
        err.message = "USER_EXIST";
        err.name = "Error";
        throw err;
      }
    });
    const userCreate = new UserCollection({
      email: input.email,
      password: input.password,
      name: input.name,
      company: input.company,
      address: input.address,
      phone: input.phone,
      signature: input.signature,
      type: input.type,
    });

    await userCreate.save();
    return userCreate;
  }

  async update(input: any) {
    const user = await UserCollection.findOne({
      email: input.email,
    });
    if (!user) {
      const error = new Error();
      error.message = " USER_NOT_Found";
      throw error;
    }

    if (input.oldPassword) {
      const isMatch: any = await user.comparePassword(input.oldPassword);
      if (!isMatch) {
        const err: Error = new Error();
        err.message = "NOT_MATCH";
        err.name = "Error";
        throw err;
      }
    }
    if (input.password) {
      user.password = input.password;
    }
    if (input.name) {
      user.name = input.name;
    }
    user.company = input.company ? input.company : user.company;
    user.signature = input.signature ? input.signature : user.signature;
    user.address = input.address ? input.address : user.address;
    user.phone = input.phone ? input.phone : user.phone;
    user.image = input.image ? input.image : user.image;
    user.type = input.type ? input.type : user.type;

    await user.save();

    return user;
  }
}

export default new UserService();
