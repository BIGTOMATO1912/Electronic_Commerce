import { Controller, UseGuards, Get, Post, Delete, Put, Body, Param, Header, Req, Request, Res, Response } from '@nestjs/common';
import { UsersService } from './users.service'
import { LocalAuthGuard } from "../auth/local-auth.guard";
import * as dotenv from 'dotenv'
import { User } from "./users.entity";
dotenv.config();


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) { }

    @Get()
    get(){
        return this.userService.findAll();
    }

    @Get('/forgot-password')
    answerForgotPassword(@Body() Email: any){
        return this.userService.answerForgotPassword(Email.email);
    }

    @Post('signin')
    @UseGuards(LocalAuthGuard)
    serverRequiestSignin(@Request() req): any {
        return req.user;
    }

    @Post('signup')
    serverRequestSignup(@Body() infomationSignup: any) {
        return this.userService.athenticationSignup(infomationSignup);
    }

    @Put('/change-password')
    changePassword(@Body() newPassword: any){
        return this.userService.changePassword(newPassword)
    }




    @Get('authorization')
    myEnforcement() {
        return "Content in here..."
    }

    @Get('/test')
    test(@Body() test: User){
        return this.userService.test(test);
    }

}
