import { inject, Injectable } from '@angular/core';
import { ChangePasswordReqDTO, } from '../../data/dto/auth-req.dto';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: ChangePasswordReqDTO) {
    return this._authRepository.changePassword(data);
  }
}
