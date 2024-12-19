import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customers-create',
  templateUrl: './customers-create.component.html',
  styleUrl: './customers-create.component.scss',
  providers: [MessageService]
})
export class CustomersCreateComponent {
    tabMenu = ['Other details']
      tab:string = 'other'
      createCustomerForm:any;
      isSubmitted:boolean = false
      loading:boolean = false;
      pageLoading: boolean = false;
      branches:any;
      currencies:any;
      paymentTerms:any;
      vendors:any;
      vendoCategories:any;

      constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService:MessageService) { }

      ngOnInit(){
        this.createCustomerForm = this.fb.group({
          salutation: ['', Validators.required],
          customer_type: ['', Validators.required],
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          company_name: ['', Validators.required],
          display_name: ['',],
          email: ['', Validators.required],
          work_phone: ['', Validators.required],
          mobile_phone: ['', Validators.required],
          payment_term_id: ['', Validators.required],
          currency_id: ['', Validators.required],
          address: ['', Validators.required],
          website: [''],
          twitter: [''],
          facebook: [''],
          instagram: [''],
        })

        this.getCurrencies()
        this.getPaymentTerms()
      }

      goBack(){
        window.history.back();
      }

      toggleTab(view:string){
        this.tab = view;
      }

      get f(){{return this.createCustomerForm.controls}}




      getCurrencies(){
        this.pageLoading = true;
        this.api.get('currencies').subscribe(
          res=>{
            this.currencies = res;
            this.pageLoading = false;
          },
          err=>{
            console.log(err)
            this.showError('Failed to load Currencies');
          }
        )
      }

      getPaymentTerms(){
        this.pageLoading = true;
        this.api.get('payment_terms').subscribe(
          res=>{
            this.paymentTerms = res;
            this.pageLoading = false;
          },
          err=>{
            console.log(err)
            this.showError('Failed to load payment Terms');
          }
        )
      }



      saveCustomer(){
        this.isSubmitted = true;
        this.loading = true;

        if(this.createCustomerForm.invalid){
          this.loading = false;
          console.log(this.createCustomerForm.value)
          console.log('form is invalid')
          this.loading = false;

          return;
        }

        let customerFormData:any = this.createCustomerForm.value;
        customerFormData.social_media = {
          "facebook": this.createCustomerForm.get('facebook').value,
          "twitter": this.createCustomerForm.get('twitter').value,
        }

        console.log(customerFormData)

        this.api.post('customers', customerFormData).subscribe(
          res=>{
            console.log(res);
            this.createCustomerForm.reset();
            this.showSuccess('Customer added successfully')
            this.isSubmitted = false
            this.loading = false;
          }, err=>{
            console.log(err);
            this.showError('Failed to add customer ')
            this.loading = false;
          }
        )
      }


      showSuccess(message: string) {
        console.log('showSuccess')
          this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      }

      showError(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
      }

}
