import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserI } from 'src/user/model/user.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJwt(user: UserI): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePassword(password: string, storedPasswordHash: string): Observable<any>;
}
