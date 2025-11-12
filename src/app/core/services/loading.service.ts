import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = signal<boolean>(false);
  private count = signal<number>(0);
  show() {
    this.count.set(this.count() + 1);
    this.update();
  }
  hide() {
    this.count.set(this.count() - 1);
    this.update();
  }
  private update() {
    this.loading.set(this.count() > 0);
  }
}
