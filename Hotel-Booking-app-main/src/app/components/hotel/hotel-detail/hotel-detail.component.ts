import { Component, OnInit } from '@angular/core';
import { Hotels } from '../../../interfaces/Hotels';
import { Rooms } from '../../../interfaces/Rooms';
import { JsonService } from '../../../json.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../security/helper/session.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  constructor(private jsonServ: JsonService, private router: Router, private route: ActivatedRoute, private sessionService: SessionService) { }
  hotel!: Hotels ;
  room!: Rooms;

  availabllity = "Available";
  userLogged: boolean = false;
  isAdmin: boolean = false;

  ngOnInit() {
    this.userLogged = this.sessionService.isUserLoggedIn();
    this.isAdmin = this.sessionService.isAdmin();

    if (!this.userLogged) {
      alert("Please Login to continue !!");
      this.router.navigate(['/sign-in']);
    }
   let id = 0;
   this.route.params.subscribe((params:any) => {
      id=params['id']
   });
    console.log(id);
    this.room = this.jsonServ.getRoomByHotelID(id);
    this.hotel = this.jsonServ.getHotelByID(id);
    console.log(this.room);
    console.log(this.hotel);
    if (this.room.RoomsAvailable / this.room.TotalRooms < 0.5) {
      this.availabllity="Filling"
    }
    else if (this.room.RoomsAvailable / this.room.TotalRooms < 0) {
      this.availabllity = "Booked"
    }

  }

}
