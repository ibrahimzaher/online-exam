import { Component, OnInit, signal } from '@angular/core';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetComponent } from './components/forget/forget.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, ForgetComponent, VerifyCodeComponent, ResetPasswordComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  steps = signal<number>(1);
  email = signal<string>('');
  ngOnInit(): void {}
  onStepChange(newStep: number) {
    this.steps.set(newStep);
  }
  onEmailChange(email: string) {
    this.email.set(email);
  }
}
