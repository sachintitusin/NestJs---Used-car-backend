import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user-dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post('/signup')
    async createUser(@Body() body: CreateUserDTO){
        const {id, createdAt} = await this.usersService.createUser(body.email, body.password);
        return {id, createdAt};
    }

    @Get("/users")
    async findAll(){
        return await this.usersService.findAll()
    }

    @Get("/users/:userId")
    async getUserById(@Param("userId", ParseIntPipe) userId: number ){
        return await this.usersService.findById(userId)
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
