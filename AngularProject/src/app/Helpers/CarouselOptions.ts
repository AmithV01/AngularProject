import { OwlOptions } from 'ngx-owl-carousel-o';

export class CarouselOptions {

  static customOptions: OwlOptions = {
    autoplay: true,
    smartSpeed: 1000,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      666: {
        items: 2
      }
    },
    nav: true
  }

  static getCarousalItems() {
    const dynamicSlides = [
      {
        id: "1",
        src: '/assets/Images/Carousal/carousel-1.jpg',
        alt: 'Side 1',
        title: 'Side 1'
      },
      {
        id: "2",
        src: '/assets/Images/Carousal/carousel-2.jpg',
        alt: 'Side 2',
        title: 'Side 2'
      }
    ]
    return dynamicSlides;
  }
}
