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
  @Output() viewAction = new EventEmitter();

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
    console.log('view action triggered')
  }

  route(page:string){
    this.router.navigate(['/app/' + page])
  }

}
