import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateUserDto } from 'src/user/model/dto/creat-user.dto';
import { loginUserDto } from 'src/user/model/dto/login-user.dto';
import { UserI } from 'src/user/model/user.interface';

@Injectable()
export class UserHelperService {

	createUserDtoToEntity(createUserDto: CreateUserDto): Observable<UserI> {
		return of({
			email: createUserDto.email,
			username: createUserDto.username,
			password: createUserDto.password
		});
	}

	loginUserDtoToEntity(loginUserDto: loginUserDto): Observable<UserI> {
		return of({
			email: loginUserDto.email,
			password: loginUserDto.password,
		})
	}
}
