import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselOptions } from '../../../Helpers/CarouselOptions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dynamicSlides: { id: string; src: string; alt: string; title: string; }[]=[];

  constructor() { }

  customOptions = CarouselOptions.customOptions;

  ngOnInit(): void {
    this.dynamicSlides = CarouselOptions.getCarousalItems();
  }

}
