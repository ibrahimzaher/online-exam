import { inject, Injectable } from '@angular/core';
import { EditProfileReqDTO } from '../../data/dto/auth-req.dto';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class EditProfileUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute(data: EditProfileReqDTO) {
    return this._authRepository.editProfile(data);
  }
}
