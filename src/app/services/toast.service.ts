import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }
  showSuccess(value: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: value });
  }

  showInfo(value: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: value });
  }

  showWarn(value: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: value });
  }

  showError(value: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: value });
  }

}