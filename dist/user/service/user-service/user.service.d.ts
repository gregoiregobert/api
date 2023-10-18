import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/service/auth.service';
import { UserEntity } from 'src/user/model/user.entity';
import { UserI } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(newUser: UserI): Promise<UserI>;
    login(user: UserI): Promise<string>;
    findAll(options: IPaginationOptions): Promise<Pagination<UserI>>;
    findAllByUsername(username: string): Promise<UserI[]>;
    private findByEmail;
    private validatePassword;
    private hashPassword;
    private findOne;
    getOne(id: number): Promise<UserI>;
    private mailExists;
}
