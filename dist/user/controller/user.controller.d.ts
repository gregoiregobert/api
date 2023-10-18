import { UserService } from '../service/user-service/user.service';
import { CreateUserDto } from '../model/dto/creat-user.dto';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserI } from '../model/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { loginUserDto } from '../model/dto/login-user.dto';
import { LoginResponseI } from '../model/login-response.interface';
export declare class UserController {
    private userService;
    private userHelperService;
    constructor(userService: UserService, userHelperService: UserHelperService);
    create(createUserDto: CreateUserDto): Promise<UserI>;
    findAll(page?: number, limit?: number): Promise<Pagination<UserI>>;
    findAllByUsername(username: string): Promise<UserI[]>;
    login(loginUserDto: loginUserDto): Promise<LoginResponseI>;
}
