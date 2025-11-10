import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../../shared/ui/logo/logo.component';
import { BgBlurBlobComponent } from './components/bg-blur-blob/bg-blur-blob.component';
import { FeatureComponent } from './components/feature/feature.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, BgBlurBlobComponent, FeatureComponent, LogoComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
