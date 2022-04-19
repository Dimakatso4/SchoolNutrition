import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup,  Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SupplierService} from './supplier.service';
import { Subject } from 'rxjs';




@Component({
  selector: 'app-supplier-management',
  templateUrl: './supplier-management.component.html',
  styleUrls: ['./supplier-management.component.scss']
})

export class SupplierManagementComponent implements OnInit {
  ngOnInit(): void {}
}
