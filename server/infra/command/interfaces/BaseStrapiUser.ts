export interface BaseStrapiUser {
    username: string;
    firstname: string;
    name: string;
    email: string;
    birthday: string;
    title: "Mr" | "Ms";
    password: string;
}

export interface StrapiUser extends BaseStrapiUser {
    id: number
}