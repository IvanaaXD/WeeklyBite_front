import { Account } from "../user.service";
import { Address } from "./adress.model";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture: string;
    birthLocation: string;
    phoneNumber: string;
    email: string;
    role: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture: string;
    birthLocation: string;
    phoneNumber: string;
    email: string;
    role: string;
}

export interface UpdateUserRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthLocation: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface Provider {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profilePicture: string;
    birthLocation: GetLocationDTO;
}

export interface GetLocationDTO {
    id: string;
    city: string;
    street: string;
    latitude: number;
    longitude: number
}

export interface CreateUserDTO {
    firstName: string;
    lastName: string;
    profilePicture: string;
    birthLocation: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

export interface GetUserDTO {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profilePicture: string;
    birthLocation: Address;
    userAccount: Account;
}

export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profilePicture: string;
    birthLocation: Address;
    email: string;
    role: Role;
}

export interface Provider {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture: string;
    birthLocation: GetLocationDTO;
    phoneNumber: string;
    email: string;
    role: string;
}

export enum Role{
    USER,
    ADMIN
}
