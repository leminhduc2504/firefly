import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Not } from 'typeorm';
import { CreateUserDto } from './Dto/createUser.dto';
import { User } from './Model/user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async CreateUser(createUserDto : CreateUserDto){
        const {lastname,firstname,age,coordinate} = createUserDto
        const newUser = this.usersRepository.create({lastname,firstname,age,coordinate})
        return await this.usersRepository.save(newUser)
    }

    async GetAllUser(){
        return await this.usersRepository.find()
    }

    async GetUserByID(dto: {id: string}){
        const {id} = dto
        const query = this.usersRepository.createQueryBuilder("user")
        query.where("user.id = :id" , {id})
        const found= await query.getOne()
        return found
    }

    async GetUsers(dto :{name: string}){
        const {name} = dto
        let query = this.usersRepository.createQueryBuilder("user")
        .where("user.firstname LIKE :name", { name:`%${name}%` })
        .orWhere( "user.lastname LIKE :name", { name:`%${name}%` })
        .orderBy("user.firstname" , "DESC")
        const users = await query.getMany()
        return users

    }

    async EditUser(id: string, editUserDto: CreateUserDto){
        const {lastname,firstname,age,coordinate} = editUserDto
        const user =await this.GetUserByID({id})
        if(lastname){
            user.lastname = lastname
        }
        if(firstname){
            user.firstname = firstname
        }
        if(age){
            user.age = age
        }
        if(coordinate){
            user.coordinate = coordinate
        }
        await this.usersRepository.save(user)
    }

    async DeleteUser(id: string){
        const user = await this.GetUserByID({id})
        return await this.usersRepository.delete(user)
    }

    async GetUsersNearby(dto: {amount : number, id: string} ){
        const {amount,id} = dto
        const user = await this.GetUserByID({id})
        const allUser = await this.usersRepository.find({where: {id: Not(id)}})
        let distances = []
        let point = user.coordinate.split(":")
        for(let i =0 ; i < allUser.length; i++){
            let _point = allUser[i].coordinate.split(":")
            let distance = Math.sqrt(   (parseInt(_point[0])-parseInt(point[0]))*(parseInt(_point[0])-parseInt(point[0]))  +
            (parseInt(_point[1])-parseInt(point[1]))*(parseInt(_point[1])-parseInt(point[1])) )
            const _user= allUser[i]
            distances.push({distance,_user})
        }

        distances.sort(function(a, b) {
            return (a.distance - b.distance);
        });
        return distances.slice(0,amount)
    }
}
