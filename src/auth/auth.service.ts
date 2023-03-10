import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { existingUserDto, userDto } from 'src/user/dtos/user.dto';
import { userType } from 'src/user/user.types';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //   hash password
  haspPassword(password: string) {
    return bcrypt.hashSync(password, 15);
  }
  //    register
  async register(newUser: userDto) {
    const { email, name, password } = newUser;
    const existingUser = await this.userService.getUseByEmail(email);
    if (existingUser)
      throw new ForbiddenException('this email already exists ');
    const hash = this.haspPassword(password);

    const user = await this.userService.createNewUser({
      email,
      name,
      hashedPassword: hash,
    });

    return this.userService._getUserDetails(user);
  }
  //   doesPasswordMatch
  doesPassWordMatch({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    const doesMatch = bcrypt.compareSync(password, hashedPassword);
    console.log('doesMatch', doesMatch);
    return doesMatch;
  }
  //   validateUser
  async validateUser(email, password) {
    const user = await this.userService.getUseByEmail(email);
    if (!user) throw new ForbiddenException('Email or password is wrong ');
    const passMatch = this.doesPassWordMatch({
      password,
      hashedPassword: user.hashedPassword,
    });
    if (!passMatch) throw new ForbiddenException('Email or password is wrong');
    return this.userService._getUserDetails(user);
  }
  //    login
  async logIn(logInUser: existingUserDto) {
    const { email, password } = logInUser;
    const user = await this.validateUser(email, password);
    if (!user) throw new ForbiddenException('email or password is wrong');

    const token = await this.jwtService.signAsync(user);
    console.log('jwt', token);
    return { token };
  }

  // verify Jwt
  async verifyJwt(token: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(token);
      return { exp };
    } catch (err) {
      throw new HttpException('this invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
