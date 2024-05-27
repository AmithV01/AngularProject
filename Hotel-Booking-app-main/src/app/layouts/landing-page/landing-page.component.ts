import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../json.service';
import { Hotels } from '../../interfaces/Hotels';
import { Rooms } from '../../interfaces/Rooms';

const mergeById = (a1: any, a2: any) =>
  a1.map((itm: any) => ({
    ...a2.find((item: any) => (item.HotelId === itm.HotelId) && item),
    ...itm
  }));

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})



export class LandingPageComponent implements OnInit {
  hotels: Hotels[] = [];
  rooms:  Rooms[]=[];
  hotelRooms:  any[]=[];
  
  constructor(private jsonServ: JsonService) { }

 

  ngOnInit(): void {
    this.hotels = this.jsonServ.getHotels();
    this.hotels.length = 6;
    this.rooms = this.jsonServ.getRooms();
    this.hotelRooms=(mergeById(this.hotels, this.rooms));
  }


}
