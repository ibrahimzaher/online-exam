import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectForgetFlowSteps } from '../../store/auth.reducer';
import { ForgetComponent } from './components/forget/forget.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, ForgetComponent, VerifyCodeComponent, ResetPasswordComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  private store = inject(Store);
  steps = this.store.selectSignal(selectForgetFlowSteps);
  ngOnInit(): void {}
}
