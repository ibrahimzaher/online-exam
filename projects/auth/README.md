# Auth Library

A **clean-architecture-based authentication library** for Angular applications.

---

## Installation

```bash
npm install @izaher-dev/auth
```

## Setup

### Dependency Injection

To configure and inject the library in your Angular project, you can use one of the following methods:

#### 1. Using `bootstrapApplication` (Standalone Components)

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app.component';
import { AUTH_PROVIDERS, API_CONFIG } from '@izaher-dev/auth';

bootstrapApplication(App, {
  providers: [
    ...AUTH_PROVIDERS,
    { provide: API_CONFIG, useValue: { baseUrl: 'https://api.example.com/' } },
  ],
});
```

#### 1. 2. Using `NgModule` (Traditional Module-based App)

```ts
import { NgModule } from '@angular/core';
import { AUTH_PROVIDERS, API_CONFIG } from '@izaher-dev/auth';

@NgModule({
  providers: [
    ...AUTH_PROVIDERS,
    { provide: API_CONFIG, useValue: { baseUrl: 'https://api.example.com/' } },
  ],
})
export class AppModule {}
```

## Usage

### Using the Facade (Recommended)

```ts
import { Component } from '@angular/core';
import { AuthFacade } from '@izaher-dev/auth';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.html',
})
export class MyComponent {
  constructor(private auth: AuthFacade) {}

  login() {
    this.auth.login({ email: 'user@example.com', password: 'password' }).subscribe({
      next: (user) => console.log(user),
      error: (err) => console.error(err),
    });
  }
}
```

### Using Individual UseCases

```ts
import { LoginUsecaseService, RegisterUsecaseService } from '@izaher-dev/auth';

constructor(private loginUsecase: LoginUsecaseService) {}

this.loginUsecase.execute({ email, password }).subscribe(...);

```

## Layers

### Domain

- **User entity**
- **AuthRepo interface**
- **UseCases:**
  - LoginUsecaseService
  - RegisterUsecaseService
  - ChangePasswordUsecaseService
  - LogoutUsecaseService
  - DeleteMeUsecaseService
  - EditProfileUsecaseService
  - ForgetPasswordUsecaseService
  - ResetPasswordUsecaseService
  - VerifyResetCodeUsecaseService
  - ProfileDataUsecaseService

### Data

- **DTOs:** `auth-req.dto.ts`, `auth-res.dto.ts`
- **API Service:** `AuthApiService`
- **Repository Implementation:** `AuthApiRepo`
- **Adaptors:** `AuthApiAdaptor`
- **Endpoints:** `AuthApiEndPoint`

### Application

- **AuthFacade** to simplify usage

---

## DTOs

### Request DTOs

- LoginRequestDTO
- RegisterRequestDTO
- ChangePasswordReqDTO
- EditProfileReqDTO
- ForgetPasswordReqDTO
- ResetPasswordReqDTO
- VerifyResetCodeReqDTO

### Response DTOs

- LoginResponseDTO
- RegisterResponseDTO
- ChangePasswordResDTO
- DeleteMeResDTO
- LogOutResDTO
- ProfileDataResDTO
- EditProfileResDTO
- ForgetPasswordResDTO
- ResetPasswordResDTO
- VerifyResetCodeResDTO

---

## Notes

- Use Angular Dependency Injection for repository and API config.
- Errors are propagated via Observable errors; optionally handle them with interceptors.
- Endpoints are centralized in `AuthApiEndPoint`.

---

## License

MIT
