import { Component, OnInit } from '@angular/core';
import { Hotels } from '../../../interfaces/Hotels';
import { Rooms } from '../../../interfaces/Rooms';
import { JsonService } from '../../../json.service';

const mergeById = (a1: any, a2: any) =>
  a1.map((itm: any) => ({
    ...a2.find((item: any) => (item.HotelId === itm.HotelId) && item),
    ...itm
  }));

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotels: Hotels[] = [];
  rooms: Rooms[] = [];
  hotelRooms: any[] = [];
  hotelRoomsAvailable: any[] = [];
  hotelRoomsFilling: any[] = [];
  hotelRoomsBooked: any[] = [];

  constructor(private jsonServ: JsonService) { }

  ngOnInit() {
    this.hotels = this.jsonServ.getHotels();
    this.rooms = this.jsonServ.getRooms();
    this.hotelRooms = (mergeById(this.hotels, this.rooms));

    this.hotelRoomsAvailable = this.hotelRooms.filter(hotel => hotel.RoomsAvailable / hotel.TotalRooms > 0.5);
    this.hotelRoomsFilling = this.hotelRooms.filter(hotel => (hotel.RoomsAvailable / hotel.TotalRooms < 0.5) && (hotel.RoomsAvailable / hotel.TotalRooms > 0));
    this.hotelRoomsBooked = this.hotelRooms.filter(hotel => hotel.RoomsAvailable / hotel.TotalRooms <= 0);
  }


  filter(i: number) {
    switch (i) {
      case 1:
        console.log("1");
        this.hotelRooms = (mergeById(this.hotels, this.rooms));
        break;
      case 2:
        this.hotelRooms = (mergeById(this.hotels, this.rooms));
        this.hotelRooms = this.hotelRooms.filter(hotel => hotel.RoomsAvailable / hotel.TotalRooms > 0);
        break;
      case 3:
        this.hotelRooms = (mergeById(this.hotels, this.rooms));
        this.hotelRooms = this.hotelRooms.filter(hotel => hotel.RoomsAvailable / hotel.TotalRooms <=0);
        break;
      default:
        this.hotelRooms = (mergeById(this.hotels, this.rooms));
        break;
    }
  }
}
