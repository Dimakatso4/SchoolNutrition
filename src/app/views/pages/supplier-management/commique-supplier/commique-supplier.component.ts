import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-commique-supplier',
  templateUrl: './commique-supplier.component.html',
  styleUrls: ['./commique-supplier.component.scss']
})
export class CommiqueSupplierComponent implements OnInit {
  public username:any
  public compantName:any
  public role:any


  constructor(private appservice: AppService) { }

  ngOnInit(): void {
    this.username = this.appservice.getLoggedInUserId();
    this.role=this.appservice.getLoggedInUserRole()
    this.compantName = this.appservice.getIsLoggedInUsername();
    console.log(this.compantName);
    console.log(this.username);
  }

}
