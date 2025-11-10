import { Component, inject, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../../../shared/ui/input-field/input-field.component';

@Component({
  selector: 'app-forget',
  imports: [InputFieldComponent, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})
export class ForgetComponent {
  private readonly _fb = inject(FormBuilder);
  step = output<number>();
  forgetForm!: FormGroup;
  ngOnInit(): void {
    this.forgetForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
  get email() {
    return this.forgetForm.get('email') as FormControl;
  }
  continue() {
    this.step.emit(2);
    console.log(this.email.value);
  }
}
