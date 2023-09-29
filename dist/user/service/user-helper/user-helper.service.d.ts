import { Observable } from 'rxjs';
import { CreateUserDto } from 'src/user/model/dto/creat-user.dto';
import { loginUserDto } from 'src/user/model/dto/login-user.dto';
import { UserI } from 'src/user/model/user.interface';
export declare class UserHelperService {
    createUserDtoToEntity(createUserDto: CreateUserDto): Observable<UserI>;
    loginUserDtoToEntity(loginUserDto: loginUserDto): Observable<UserI>;
}
