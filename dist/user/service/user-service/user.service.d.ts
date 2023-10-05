import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { UserEntity } from 'src/user/model/user.entity';
import { UserI } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(newUser: UserI): Observable<UserI>;
    login(user: UserI): Observable<boolean>;
    findAll(options: IPaginationOptions): Observable<Pagination<UserI>>;
    private findByEmail;
    private validatePassword;
    private hashPassword;
    private findOne;
    private mailExists;
}
