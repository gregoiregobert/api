import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Observable, of } from 'rxjs';
import { CreateUserDto } from '../model/dto/creat-user.dto';

@Controller('user')
export class UserController {

	constructor(private userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto): Observable<boolean> {
		return of(true);
	}

}
