import { AuthRepo } from '../repo/auth-repo';
import { inject, Injectable } from '@angular/core';
import { ResetPasswordReq } from '../../data/dto/auth-req';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: ResetPasswordReq) {
    return this._authRepository.resetPassword(data);
  }
}
