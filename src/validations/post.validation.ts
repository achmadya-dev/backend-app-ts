import Joi from "joi";
import PostType from "../types/post.type";

export const inputPostValidation = (post: PostType): Joi.ValidationResult<PostType> => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        authorId: Joi.number().required(),
        poster: Joi.optional()
    });

    return schema.validate(post);
};
