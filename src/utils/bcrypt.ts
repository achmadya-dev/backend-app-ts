import bcrypt from "bcrypt";

const saltRounds = 10;

const encrypt = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
};

const compare = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export { encrypt, compare };
