import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/service/auth.service';
import { UserEntity } from 'src/user/model/user.entity';
import { UserI } from 'src/user/model/user.interface';
import { Like, Repository } from 'typeorm';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private authService: AuthService
	) {}

	async create(newUser: UserI): Promise<UserI> {
		try{
			const exists: boolean = await this.mailExists(newUser.email);
			if (!exists) {
				const passwordHash: string = await this.hashPassword(newUser.password);
				newUser.password = passwordHash;
				const user = this.userRepository.save(this.userRepository.create(newUser));
				return this.findOne((await user).id); 
			} else {
				throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
			}
		} catch {
			throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
		}
	}

	async login(user: UserI): Promise<string> {
		try{
			const foundUser: UserI = await this.findByEmail( user.email.toLowerCase() );
			if (foundUser) {
				const matches: boolean = await this.validatePassword(user.password, foundUser.password);
				if (matches) {
					const payload: UserI = await this.findOne(foundUser.id);
					return this.authService.generateJwt(payload);
				} else {
					throw new HttpException("login was not successfull, wrong credentials", HttpStatus.UNAUTHORIZED);
				}
			} else {
				throw new HttpException("login was not successfull, wrong credentials", HttpStatus.UNAUTHORIZED);

			}
		} catch {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
	}

	async findAll(options: IPaginationOptions): Promise<Pagination<UserI>> {
		return paginate<UserEntity>(this.userRepository, options);
	}

	async findAllByUsername(username: string): Promise<UserI[]> {
		return this.userRepository.find({
			where: {
				username: Like(`%${username.toLowerCase()}%`)
			}}
		)
	}

	private async findByEmail(email: string): Promise<UserI> {
		return this.userRepository.findOne({ where: { email }, select: ['id', 'email', 'username' ,'password']});
	}

	private async validatePassword(password: string, storedPasswordHash: string): Promise<any> {
		return this.authService.comparePassword(password, storedPasswordHash);
	}

	private async hashPassword(password: string): Promise<string> {
		return this.authService.hashPassword(password);
	}
	
	private async findOne(id: number): Promise<UserI> {
		return this.userRepository.findOne({ where: { id }});
	}

	public async getOne(id: number): Promise<UserI> {
		return this.userRepository.findOneOrFail({ where: { id } })	
	}

	private async mailExists(email: string): Promise<boolean> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (user) {
			return true;
		} else {
			return false;
		}
	}
}
