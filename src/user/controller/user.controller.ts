import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user-service/user.service';
import { Observable, of, switchMap } from 'rxjs';
import { CreateUserDto } from '../model/dto/creat-user.dto';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserI } from '../model/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { loginUserDto } from '../model/dto/login-user.dto';
import { LoginResponseI } from '../model/login-response.interface';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

@Controller('users')
export class UserController {

	constructor(
		private userService: UserService,
		private userHelperService: UserHelperService
		) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto ): Observable<UserI> {
		return this.userHelperService.createUserDtoToEntity(createUserDto).pipe(
			switchMap((user: UserI) => this.userService.create(user))
		);
	}

	@Get()
	findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number  = 10
	): Observable<Pagination<UserI>> {
		limit = limit > 100 ? 100: limit;
		return this.userService.findAll({page, limit, route: 'http://localhost:3000/api/userS'})
	}

	@Post('login')
	login(@Body() loginUserDto: loginUserDto): Observable<LoginResponseI> {
		return this.userHelperService.loginUserDtoToEntity(loginUserDto).pipe(
			switchMap((user: UserI) => this.userService.login(user).pipe(
				map((jwt: string) => {
					return {
						access_token: jwt,
						token_type: 'JWT',
						expires_in: 10000
					};
				})
			))
		)
	}
}
