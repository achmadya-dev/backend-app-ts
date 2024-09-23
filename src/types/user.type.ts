export default interface UserType {
    id?: number;
    name: string | null;
    email: string;
    password?: string;
    confirmPassword?: string;
}
