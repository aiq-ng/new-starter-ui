import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() showHeader: boolean = false;
  @Input() tableTitle!: string;
  @Input() tableData: any[] = [];
  @Input() tableHeader: any[] = [];
  @Input() title!:string;
  @Input() noPagination: boolean = false;
  @Output() viewAction = new EventEmitter();
  @Output() detail = new EventEmitter();
  @Input() url:any;

  constructor(private router:Router){}

  ngOnInit(){
    console.log(this.tableData);
    console.log('above is the table data');
  }

  objectKeys(obj: any){
    return Object.keys(obj  )
  }

  onClick(){
    this.viewAction.emit();
  }

  viewDetail(id:any){
    this.detail.emit();
    console.log('detail action triggered')
    this.router.navigate([this.url + id])
  }

  route(page:string){
    this.router.navigate(['/app/' + page])
  }

}
