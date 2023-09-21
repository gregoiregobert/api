import { IsEmail, IsNotEmpty } from "class-validator";

export class loginUserDto {

	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;
}