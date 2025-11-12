import { inject, Injectable } from '@angular/core';
import { LoginRequestDTO } from '../../data/dto/auth-req.dto';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class LoginUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: LoginRequestDTO) {
    return this._authRepository.login(data);
  }
}
