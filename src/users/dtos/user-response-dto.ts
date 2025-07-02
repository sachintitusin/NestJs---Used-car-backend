import { Exclude } from "class-transformer";

export class UserResponseDTO{
    id: number;
    email: string;
    password: string;

    // Partial means the object will have some or all the fields
    constructor(partial: Partial<UserResponseDTO>){
        // assign the fields to current object
        Object.assign(this, partial);
    }
}