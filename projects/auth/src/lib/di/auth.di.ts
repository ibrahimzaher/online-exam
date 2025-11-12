import { Provider } from '@angular/core';
import { AuthRepo } from '../domain/repo/auth-repo';
import { AuthApiRepo } from '../data/api/auth-api-repo';


export const AUTH_PROVIDERS: Provider[] = [
    { provide: AuthRepo, useClass: AuthApiRepo },
];
