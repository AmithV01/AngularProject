import { Injectable } from '@angular/core';
import { Hotels } from './interfaces/Hotels';
import hotelsData from './../assets/Data/Hotels.json';
import roomsData from './../assets/Data/Rooms.json';
import locationsData from './../assets/Data/Location.json';
import { Rooms } from './interfaces/Rooms';
import { Location } from './interfaces/Location';


@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor() { }

  getLocations(): Location[] {
    let locs: Location[] = locationsData;
    return locs;
  }

  getHotels(): Hotels[] {
    let hotels: Hotels[] = hotelsData;
    return hotels;
  }
  getRooms(): Rooms[] {
    let rooms: Rooms[] = roomsData;
    return rooms;
  }
  getHotelByID(id:number): Hotels {
    let hotels: Hotels[] = hotelsData;
    return hotels.filter(x => x.HotelId == id)[0];
  }
  getRoomByHotelID(id: number): Rooms {
    let rooms: Rooms[] = roomsData;
    return rooms.filter(x => x.HotelId == id)[0];;
  }
}
