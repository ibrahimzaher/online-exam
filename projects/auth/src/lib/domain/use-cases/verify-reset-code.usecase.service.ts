import { inject, Injectable } from '@angular/core';
import { VerifyResetCodeReqDTO } from '../../data/dto/auth-req.dto';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class VerifyResetCodeUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: VerifyResetCodeReqDTO) {
    return this._authRepository.verifyResetCode(data);
  }
}
