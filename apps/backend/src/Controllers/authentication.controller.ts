import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import AuthenticationService from '../Services/authentication.service';
import { authLoginDTO } from '../DTO/authLogin.dto';
import IUserService from '../Interfaces/IUserService.interface';
import IAuthenticationService from '../Interfaces/IAuthenticationService.interface';
import UserService from '../Services/user.service';
import { Request, Response } from 'express';

@Controller('authentication')
export class AuthenticationController {
    // private userService: IUserService;
    // private authService: IUserService;
    constructor(
        private readonly authService: AuthenticationService
        , private readonly userService: UserService
    ) {
        // this.userService = new UserService();
        authService = new AuthenticationService(this.userService);
    }

    @Post('login')
    login(@Res() res: Response,@Body() authLogin: authLoginDTO) {
        try {
            this.authService.ValidateLogin(authLogin);

            res.status(HttpStatus.OK).json({success: true});

            // return  { success: true }
        } catch (error) {

            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);

        }
    }
}
