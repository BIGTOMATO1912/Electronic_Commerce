import { Controller, UseGuards, Get, Post, Delete, Put, Body, Param, Header, Req, Request, Res, Response } from '@nestjs/common';
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport';
import { userProviders } from './entity/user.providers';


@Controller('users')
export class UsersController {
    constructor(private readonly UserMethod: UsersService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    client_request_login(@Request() req): any {
        return req.user;
    }
}
