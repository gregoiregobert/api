import { Observable } from 'rxjs';
import { UserEntity } from 'src/user/model/user.entity';
import { UserI } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(newUser: UserI): Observable<UserI>;
    private hashPassword;
    private findOne;
    private mailExists;
}
