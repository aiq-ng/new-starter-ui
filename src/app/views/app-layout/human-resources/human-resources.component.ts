import { Component } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrl: './human-resources.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class HumanResourcesComponent {

}
