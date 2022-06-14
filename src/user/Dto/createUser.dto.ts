import { IsEmpty } from "class-validator"

export class CreateUserDto{
    @IsEmpty()
    lastname : string

    @IsEmpty()
    firstname : string

    @IsEmpty()
    age: number

    @IsEmpty()
    coordinate: string
}