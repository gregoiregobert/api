import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/user/model/user.entity';
import { UserI } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(newUser: UserI): Observable<UserI>;
    login(user: UserI): Observable<boolean>;
    findAll(options: IPaginationOptions): Observable<Pagination<UserI>>;
    private validatePassword;
    private findByEmail;
    private hashPassword;
    private findOne;
    private mailExists;
}
