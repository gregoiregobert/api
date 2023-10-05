import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from } from 'rxjs';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

	constructor(private readonly jwtService: JwtService) {

	}


	hashPassword(password: string): Observable<string> {
		return from<string>(bcrypt.hash(password, 12));
	}

	comparePassword(password: string, storedPasswordHash: string): Observable<any> {
		return from(bcrypt.compare(password, storedPasswordHash))
	}
}
