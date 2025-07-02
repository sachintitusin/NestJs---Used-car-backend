import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user-dto';
import { UserResponseDTO } from './dtos/user-response-dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post('/signup')
    async createUser(@Body() body: CreateUserDTO){
        const {id, email} = await this.usersService.createUser(body.email, body.password);
        return {id, email};
    }

    @Get("/users")
    async findAll(){
        return await this.usersService.findAll()
    }

    @Serialize(UserDto)
    @Get("/users/:userId")
    async getUserById(@Param("userId", ParseIntPipe) userId: number ){
        const user = await this.usersService.findById(userId)
        if(!user){
            throw Error("Not found!")// TODO
        }
        return new UserResponseDTO(user)
    }

    @Patch("/users/:userId")
    async updateUser(@Param("userId", ParseIntPipe) userId: number, @Body() data: UpdateUserDTO){
        return await this.usersService.update(userId, data)
    }

    @Delete("/users/:userId")
    async deleteUser(@Param("userId", ParseIntPipe) userId: number){
        return await this.usersService.delete(userId)
    }
}
