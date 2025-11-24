import { inject, Injectable } from '@angular/core';
import { AuthRepo } from '../repo/auth-repo';

@Injectable({
  providedIn: 'root',
})
export class DeleteMeUsecaseService {
  private readonly _authRepository = inject(AuthRepo);
  execute() {
    return this._authRepository.deleteMe();
  }
}
