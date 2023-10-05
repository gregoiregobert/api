import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    hashPassword(password: string): Observable<string>;
    comparePassword(password: string, storedPasswordHash: string): Observable<any>;
}
