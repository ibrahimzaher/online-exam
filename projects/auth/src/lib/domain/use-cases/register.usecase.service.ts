import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../../data/dto/auth-req';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class RegisterUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: RegisterRequest) {
    return this._authRepository.register(data);
  }
}
