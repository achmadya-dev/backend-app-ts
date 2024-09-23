export default interface TokenType {
    id?: number;
    name: string | null;
    email: string;
    iat: number;
    exp: number;
}
