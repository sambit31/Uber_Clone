import userModel from "../models/user.model.js";

export const createUser = async ({ fullname, email, password }) => {
  
    // Check if user with this email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Create user in DB
    const user = await userModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email,
        password,
    });

    return user;
};

export default {
    createUser,
};
