import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../model/dto/creat-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Observable<boolean>;
}
