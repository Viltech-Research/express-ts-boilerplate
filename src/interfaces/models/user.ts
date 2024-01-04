/**
 * 
 * @author Viltech
 */

export interface Tokens {
    kind: string;
    accessToken: string;
    tokenSecret?: string;
}

export interface IUser {
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    salt: string;

    meta: string;
    twitter: string;
    google: string;
    tokens: Tokens[];

    fullname: string;
    gender: string;
    geolocation: string;
}

export default IUser;