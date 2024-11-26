import { Injectable, BadRequestException } from '@nestjs/common';
import { FirebaseAdmin } from '../../config/firebase.setup';
import { UserAuthDto } from './dto/user-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly admin: FirebaseAdmin) {}

  async getUserByEmail(email: string): Promise<any> {
    const app = this.admin.setup();
    try {
      const user = await app.auth().getUserByEmail(email);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async setCustomClaims(userAuth: UserAuthDto): Promise<any> {
    const { uid, role } = userAuth;
    const app = this.admin.setup();
    try {
      await app.auth().setCustomUserClaims(uid, { role });
      return { message: 'Custom claims set successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createUser(userRequest: CreateUserDto): Promise<any> {
    const { email, password, username, role } = userRequest;
    const app = this.admin.setup();

    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${username}`,
      });
      await app.auth().setCustomUserClaims(createdUser.uid, { role });
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
