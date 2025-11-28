import { inject, Injectable } from '@angular/core';
import { EditProfileReq } from '../../data/dto/auth-req';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class EditProfileUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: EditProfileReq) {
    return this._authRepository.editProfile(data);
  }
}
