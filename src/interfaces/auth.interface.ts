import { ResponseData, User } from './common.interface';

export interface AuthResponse
  extends ResponseData<{
    access_token: string;
    user: User;
  }> {}
