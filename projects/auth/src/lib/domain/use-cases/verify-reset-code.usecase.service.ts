import { inject, Injectable } from '@angular/core';
import { VerifyResetCodeReq } from '../../data/dto/auth-req';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class VerifyResetCodeUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: VerifyResetCodeReq) {
    return this._authRepository.verifyResetCode(data);
  }
}
