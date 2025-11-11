import { inject, Injectable } from '@angular/core';
import { RegisterRequestDTO } from '../../data/dto/auth-req.dto';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class RegisterUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: RegisterRequestDTO) {
    return this._authRepository.register(data);
  }
}
