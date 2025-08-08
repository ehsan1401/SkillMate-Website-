import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get() // /users --- this get methood return all users
    findAll(@Query('role') role?: 'INTERN' | 'ENGNIEER0' | 'ADMIN'){
        return []
    }

    @Get(':id') //users/:id --- this get method retuen one user 
    findOne(@Param('id') id : string){
        return { id }
    }

    @Post() // /users --- this post method create a new user
    create(@Body() user: {}){
        return user
    }


    @Patch(':id') //users/:id --- this get method retuen one user 
    update(@Param('id') id : string , @Body() userUpdate: {}){
        return { id , ...userUpdate }
    }


    @Delete(':id') //user:id --- this delete method delete user with id
    delete(@Param('id') id: string){
        return { id }
    }
}
