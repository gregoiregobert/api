import { IsNotEmpty, IsString } from "class-validator";
import { loginUserDto } from "./login-user.dto";

export class CreateUserDto extends loginUserDto {

	@IsString()
	@IsNotEmpty()
	username: string;

}