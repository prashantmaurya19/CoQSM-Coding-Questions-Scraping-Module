export default interface Lang {
    uid: string;
    EXTENSION: string;
    BOILERPLATE: string;
    MULTI_LINE_COMMENT: string;
    getBody(): string
}