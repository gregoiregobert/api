import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { RoomEntity } from 'src/chat/model/room.entity';
import { RoomI } from 'src/chat/model/room.interface';
import { UserI } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {

	constructor(
		@InjectRepository(RoomEntity)
		private readonly roomRepository: Repository<RoomEntity>
	) {}

	async createRoom(room: RoomI, creator: UserI): Promise<RoomI> {
		const newRoom = await this.addCreatorToRoom(room, creator);
		return this.roomRepository.save(newRoom);
	}

	async getRoomForUser(userId: number, options: IPaginationOptions): Promise<Pagination<RoomI>> {
		const query = this.roomRepository
			.createQueryBuilder('room')
			.leftJoin('room.users', 'user')
			.where('user.id = :userId', {userId})
			.leftJoinAndSelect('room.users', 'all_users')
			.orderBy('room.updated_at', 'DESC');

		return paginate(query, options);
	}

	async addCreatorToRoom(room: RoomI, creator: UserI): Promise<RoomI> {
		room.users.push(creator);
		return room;
	}
}
