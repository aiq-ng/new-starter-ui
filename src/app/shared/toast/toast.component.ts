import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  providers: [MessageService]
})
export class ToastComponent {
  @Input() type!: string;
  @Input() message!: string;

  constructor(private messageService: MessageService) {}


    ngOnInit(){
      console.log('toast loaded')
      if(this.type='success'){
        this.showSuccess();
      }else if(this.type='error'){
        this.showError();
      }else if(this.type='warning'){
        this.showWarn();
      }else if(this.type='info'){
        this.showInfo()
      }
    }


    showSuccess() {
      console.log('showSuccess')
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.message });
    }

    showError() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
    }

    showInfo() {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message });
    }

    showWarn() {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: this.message });
    }



}
