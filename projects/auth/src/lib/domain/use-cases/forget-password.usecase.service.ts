import { inject, Injectable } from '@angular/core';
import { ForgetPasswordReqDTO } from '../../data/dto/auth-req.dto';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: ForgetPasswordReqDTO) {
    return this._authRepository.forgetPassword(data);
  }
}
