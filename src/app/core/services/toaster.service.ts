import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private readonly _messageService = inject(MessageService);
  show(message: string, isSuccess: boolean = true, detail?: string) {
    this._messageService.add({
      severity: isSuccess ? 'success' : 'error',
      summary: message,
      detail: detail,
      life: 1500,
      closable: false,
      id: crypto.randomUUID(),
    });
  }
}
