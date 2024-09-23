export default interface PostType {
    id: number;
    title: string;
    content: string;
    authorId: number;
    poster: string | null;
}
