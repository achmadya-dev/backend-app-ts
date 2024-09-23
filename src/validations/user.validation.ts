import Joi from "joi";
import UserType from "../types/user.type";

export const inputUserValidation = (post: UserType): Joi.ValidationResult<UserType> => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
        confirmPassword: Joi.any().equal(Joi.ref("password")).required().label("Confirm password")
    });
    return schema.validate(post);
};

export const inputLoginValidation = (post: UserType): Joi.ValidationResult<UserType> => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    });
    return schema.validate(post);
};
