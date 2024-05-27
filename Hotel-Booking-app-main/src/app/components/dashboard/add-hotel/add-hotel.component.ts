import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../security/helper/auth.service';
import { SessionService } from '../../../security/helper/session.service';
import { HotelService } from '../../hotel/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { JsonService } from '../../../json.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
  hotelLocationList: any = [];
  locationForm: any = FormGroup;
  config!: { itemsPerPage: number; currentPage: number; totalItems: any; };
  searchfilter!: any;
  constructor(
    private hotelService: HotelService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jsonServ: JsonService
  ) { }

  ngOnInit() {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.hotelLocationList.length
    };
    this.getAllLocation()
  }


  getAllLocation() {
    this.hotelLocationList = this.jsonServ.getLocations();
    //this.hotelService.getAllLocation().subscribe((res: any) => {
    //  this.hotelLocationList = res.body;
    //  console.log(this.hotelLocationList);
    //});
  }

  addLocation() {
    this.hotelService.createLocation(this.locationForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success(res.message)
          this.getAllLocation()
        },
        error: (error: any) => {
          this.toastr.error(error.error.message)
          console.log('error', error.error.message);
        },
        complete: () => { }
      });
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }


  deleteLocation(name: string) {
    this.hotelService.deleteLocation(name)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.toastr.success(res.message)
          this.getAllLocation()
        },
        error: (error: any) => {
          this.toastr.error(error.error.message)
        },
        complete: () => { }
      })

  }

}
