import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user-service/user.service';
import { CreateUserDto } from '../model/dto/creat-user.dto';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserI } from '../model/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { loginUserDto } from '../model/dto/login-user.dto';
import { LoginResponseI } from '../model/login-response.interface';

@Controller('users')
export class UserController {

	constructor(
		private userService: UserService,
		private userHelperService: UserHelperService
		) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto ): Promise<UserI> {
		const UserEntity: UserI = this.userHelperService.createUserDtoToEntity(createUserDto);
		return this.userService.create(UserEntity);
	}

	@Get()
	async findAll(@Query('page') page: number = 1, @Query('limit') limit: number  = 10,): Promise<Pagination<UserI>> {
		limit = limit > 100 ? 100: limit;
		return this.userService.findAll({page, limit, route: 'http://localhost:3000/api/userS'})
	}

	@Get('/find-by-username')
	async findAllByUsername(@Query('username') username: string) {
		return this.userService.findAllByUsername(username);
	}

	@Post('login')
	async login(@Body() loginUserDto: loginUserDto): Promise<LoginResponseI> {
		const UserEntity: UserI = this.userHelperService.loginUserDtoToEntity(loginUserDto);
		const jwt: string = await this.userService.login(UserEntity);
		return {
			access_token: jwt,
			token_type: 'JWT',
			expires_in: 10000
		};
	}

}
