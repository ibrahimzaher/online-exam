import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly platformService = inject(PlatformService);
  getItem<T>(key: string): T | null {
    if (!this.platformService.isBrowser()) return null;

    const value = localStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.platformService.isBrowser()) return;

    const data = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  removeItem(key: string): void {
    if (!this.platformService.isBrowser()) return;
    localStorage.removeItem(key);
  }

  clear(): void {
    if (!this.platformService.isBrowser()) return;
    localStorage.clear();
  }
}
