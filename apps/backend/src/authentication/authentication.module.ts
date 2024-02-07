import { Module } from '@nestjs/common';
import { AuthenticationController } from '../Controllers/authentication.controller';
import AuthenticationService from '../Services/authentication.service';
import { UserModule } from '../user/user.module';
import UserService from '../Services/user.service';

@Module({
    imports:[UserModule],
    controllers:[AuthenticationController],
    providers: [AuthenticationService, UserService]
})
export class AuthenticationModule {}
