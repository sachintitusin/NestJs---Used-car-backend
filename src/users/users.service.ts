import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDTO } from './dtos/update-user-dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    createUser(email: string, password: string){
        try{
            return this.prisma.user.create({
                data: {
                    email,
                    password
                }
            })
        }
        catch(error){
            throw Error("Not working")
        }
    }

    async findAll(){
        return await this.prisma.user.findMany()
    }

    async findById(id:number){
        return await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }

    async findByEmail(email:string){
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }

    async update(id:number, data: UpdateUserDTO){
        return await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...data
            }
        })
    }

    async delete(id:number){
        await this.prisma.user.delete({
            where: {
                id: id
            }
        })
        return true;
    }
}
