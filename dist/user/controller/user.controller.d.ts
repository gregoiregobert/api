import { UserService } from '../service/user-service/user.service';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../model/dto/creat-user.dto';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserI } from '../model/user.interface';
export declare class UserController {
    private userService;
    private userHelperService;
    constructor(userService: UserService, userHelperService: UserHelperService);
    create(createUserDto: CreateUserDto): Observable<UserI>;
    findAll(): void;
    login(): void;
}
