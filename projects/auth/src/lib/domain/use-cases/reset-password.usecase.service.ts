import { AuthRepo } from '../repo/auth-repo';
import { inject, Injectable } from '@angular/core';
import { ResetPasswordReqDTO } from '../../data/dto/auth-req.dto';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: ResetPasswordReqDTO) {
    return this._authRepository.resetPassword(data);
  }
}
