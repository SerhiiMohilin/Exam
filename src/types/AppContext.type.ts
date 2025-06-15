export type UserType = {
    email: string;
    password: string;
};

export type DataType = {
    user: UserType | null;
};