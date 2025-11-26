import { inject, Injectable } from '@angular/core';
import { ChangePasswordReq } from '../../data/dto/auth-req';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: ChangePasswordReq) {
    return this._authRepository.changePassword(data);
  }
}
