export type LoginResource = {
    /** The JWT */
    "access_token": string,
    /** Constant value */
    "token_type": "Bearer"
}

export type NewsResource = {
    id?: string;
    title: string;
    subtitle: string;
    text: string;
    authorName: string;
    authorIP?: string;
    images?: string[];
    createdAt?: Date;
}

export type ContactForm = {
    name: string;
    telephone: string;
    email: string;
    message: string;
}