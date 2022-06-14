import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './Dto/createUser.dto';
import { User } from './Model/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Get()
    async GetAllUser(){
        return this.userService.GetAllUser()
    }

    @Get("search")
    async GetUsers( @Query()dto:{ name:string}): Promise<User[]>{
        return this.userService.GetUsers(dto)
    }

    @Get("read")
    async GetUserById(@Query()dto: {id:string}){
        return await this.userService.GetUserByID(dto);
    }

    @Post("add")
    async CreateUser(@Body() createUserDto: CreateUserDto){
        return this.userService.CreateUser(createUserDto)
    }

    @Delete('delete/:id')
    async DeleteUser(@Param('id') id: string){
        return this.userService.DeleteUser(id)
    }

    @Put('edit/:id')
    async EditUser(@Param('id') id: string, @Body() editUserDto: CreateUserDto){
        return this.userService.EditUser(id, editUserDto)
    }

    @Get("locate")
    async GetUsersNearby(@Query() dto:  {amount:number, id : string}){
        return this.userService.GetUsersNearby(dto)
    }
}
