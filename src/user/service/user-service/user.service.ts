import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map, switchMap } from 'rxjs';
import { UserEntity } from 'src/user/model/user.entity';
import { UserI } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	create(newUser: UserI): Observable<UserI> {
		return this.mailExists(newUser.email).pipe(
			switchMap((exists: boolean) => {
				if (exists === true) {
					return this.hashPassword(newUser.password).pipe(
						switchMap((passwordHash: string) => {
							newUser.password= passwordHash;
							return from(this.userRepository.save(newUser)).pipe(
								switchMap((user: UserI) => this.findOne(user.id))
							);
						})
					)
				} else {
					throw new HttpException("Email is already use", HttpStatus.CONFLICT);
				}
			})
		)
	}

	private hashPassword(password: string): Observable<string> {
		return from<string>(bcrypt.hash(password, 12));
	}
	
	private findOne(id: number): Observable<UserI> {
		return from(this.userRepository.findOne({ id }));
	}

	private mailExists(email: string): Observable<boolean> {
		return from(this.userRepository.findOne({ email })).pipe(
			map((user: UserI) => {
				if (user) {
					return true;
				} else {
					return false;
				}
			})
		)
	}
}
