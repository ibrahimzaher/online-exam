import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../data/dto/auth-req';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class LoginUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: LoginRequest) {
    return this._authRepository.login(data);
  }
}
