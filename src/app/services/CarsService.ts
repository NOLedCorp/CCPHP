import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FeedBack, Sale, User, UserService } from './UserService';
import { PickerComponent } from '../picker/picker.component';
import { userInfo } from 'os';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CarsService implements OnInit {
  showCarInfo = false;
  showBookingForm = false;
  bookings: BookTimes[];
  DateStart: Date = undefined;
  DateFinish: Date = undefined;
  StartPoint: string = undefined;
  EndPoint: string = undefined;
  CurFilters = [];
  public locations: string[] = [
    'AIR_HER',
    'PORT_HER',
    'HERAKLION_DOWNTOWN',
    'AMOUDARA',
    'LIGIRIA',
    'AGIA_PELAGIA',
    'FODELE',
    'KOKKINI_HANI',
    'GOURNES',
    'GOUVES',
    'ANALIPSI',
    'ANISSARAS',
    'CHERSONISSOS',
    'KOUTOULOUFARI',
    'PISKOPIANO',
    'STALIS',
    'MALIA',
    'SISSI',
    'MILATOS',
    'AGIOS_NIKOLAS',
    'ELOUNDA',
    'IERAPETRA',
    'RETHIMNO',
    'SKALETA',
    'PANORMO',
    'GEORGIOUPOLIS',
    'BALI',
    'CHANIA'
  ];
  public car: Car = null;
  baseUrl: string = 'http://client.nomokoiw.beget.tech/back/';
  //baseUrl = 'http://localhost:80/CCPHP/';
  constructor(
    private http: HttpClient,
    private us: UserService,
    private translate: TranslateService
  ) {}

  clearDates() {
    this.DateStart = undefined;
    this.DateFinish = undefined;
    this.StartPoint = undefined;
    this.EndPoint = undefined;
  }

  GetCars() {
    return this.http.get<Car[]>(
      this.baseUrl + 'CarsController.php?Key=get-cars'
    );
  }
  GetBestCars() {
    return this.http.get<Car[]>(
      this.baseUrl + 'CarsController.php?Key=get-best-cars'
    );
  }
  GetSameCars(id) {
    return this.http.get<Car[]>(
      this.baseUrl + 'CarsController.php?Key=get-same-cars&Id=' + id
    );
  }
  GetCar(id: string) {
    return this.http.get<Car>(
      this.baseUrl + 'CarsController.php?Key=get-car&Id=' + id
    );
  }
  GetBook(id: string) {
    return this.http.get<Book>(
      this.baseUrl +
        'CarsController.php?Key=get-book&Id=' +
        id +
        '&Token=' +
        this.us.Token
    );
  }
  GetBooks() {
    return this.http.get<Book[]>(
      this.baseUrl + 'CarsController.php?Key=get-books&Token=' + this.us.Token
    );
  }
  GetCarPhotos(id: number) {
    return this.http.get<string[]>(
      this.baseUrl + 'CarsController.php?Key=get-photos&Id=' + id
    );
  }
  GetReportCars() {
    return this.http.get<ReportCar[]>(
      this.baseUrl + 'CarsController.php?Key=get-report-cars'
    );
  }
  AddCar(car) {
    return this.http.post<number>(
      this.baseUrl + 'CarsController.php?Key=add-car&Token=' + this.us.Token,
      car
    );
  }
  DeleteCar(id) {
    return this.http.delete(
      this.baseUrl +
        'CarsController.php?Key=delete-car&Id=' +
        id +
        '&Token=' +
        this.us.Token
    );
  }
  DeleteBook(id) {
    return this.http.delete(
      this.baseUrl +
        'CarsController.php?Key=delete-book&Id=' +
        id +
        '&Token=' +
        this.us.Token
    );
  }
  AddPrices(CarId, Price) {
    return this.http.post(
      this.baseUrl +
        'CarsController.php?Key=add-price&Id=' +
        CarId +
        '&Token=' +
        this.us.Token,
      Price
    );
  }
  UpdateCar(car, id) {
    return this.http.post<Car>(
      this.baseUrl +
        'CarsController.php?Key=update-car&Id=' +
        id +
        '&Token=' +
        this.us.Token,
      car
    );
  }
  UpdateBook(book, id) {
    return this.http.post<Car>(
      this.baseUrl +
        'CarsController.php?Key=update-book&Id=' +
        id +
        '&Token=' +
        this.us.Token,
      book
    );
  }
  UpdatePrices(Price, id) {
    return this.http.post<Prices>(
      this.baseUrl +
        'CarsController.php?Key=update-prices&Id=' +
        id +
        '&Token=' +
        this.us.Token,
      Price
    );
  }
  BookCar(book: any) {
    // tslint:disable-next-line:max-line-length
    // return this.http.post<Book>(this.baseUrl + 'CarsController.php?Key=add-booking',{'Id':123,'DateStart':book.DateStart, 'ExtraDateStart':book.ExtraDateStart, 'DateFinish':book.DateFinish, 'UserId':book.UserId, 'CarId':book.CarId, 'Price':book.Price, 'Place':book.Place, 'Coment':book.Coment, 'SalesId':book.SalesId});
    return this.http.post(
      this.baseUrl +
        'CarsController.php?Key=add-booking&Lang=' +
        this.translate.currentLang,
      book
    );
  }
  BookCarNew(book: NewBook) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<Book>(
      this.baseUrl + 'CarsController.php?Key=add-booking-new',
      book
    );
  }

  UploadFile(id, type: UploadTypes, data) {
    return this.http.post<string>(
      this.baseUrl +
        'CarsController.php?Key=upload-file&Id=' +
        id +
        '&Type=' +
        type +
        '&Token=' +
        this.us.Token,
      data,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }

  ngOnInit() {}
  checkStr(str: string, type?: string) {
    if (!type) {
      // tslint:disable-next-line:max-line-length
      const reg = /(\s??хер|[а-я]*ху[ей]+|пид[оа]р[а-я]*|суч?ка|[пзд]?[оа]?[ел]б[ауеоё][еёлчнтмш][а-я]*|бл[яе]а?[тдь]{0,2}|[расзпо]*пизд[ецаитьуняй]*)/gi;
      str = str.replace(reg, '***');
    }
    if ((type = 'phone')) {
      const reg = /\D/g;

      str = str.replace(reg, '');
    }
    if ((type = 'phone-check')) {
      // tslint:disable-next-line:max-line-length
      const reg = /(^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$|^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$)/g;

      str = str.replace(/\D/g, '');
      return str.match(reg) ? str.match(reg)[0] : null;
    }
    return str;
  }
  checkEmail(str: string) {
    return !str.match(/[a-z]+@[a-z]+\.[a-z]+/gi);
  }
  addFilter(name, value) {
    this.CurFilters.push({
      Name: name,
      Value: name == 'Passengers' ? value[0] : value
    });
  }
  getCarPrice(car: Car, ds = this.DateStart, df = this.DateFinish) {
    car.SPrice = Number(car.SPrice);
    car.WPrice = Number(car.WPrice);
    if (ds.getMonth() > 4 && ds.getMonth() < 8) {
      let price = 0;
      let days = Math.ceil(
        Math.abs(df.getTime() - ds.getTime()) / (1000 * 3600 * 24)
      );
      if (days < 8) {
        return car.Prices.SummerPrices[
          Object.keys(car.Prices.SummerPrices)[days - 1]
        ];
      } else {
        price = Number(car.Prices.SummerPrices.SevenDaysPrice);
        for (let i = 0; i < days - 7; i++) {
          price += car.SPrice;
        }
      }
      return price;
    } else {
      let price = 0;
      const days = Math.ceil(
        Math.abs(df.getTime() - ds.getTime()) / (1000 * 3600 * 24)
      );
      if (days < 8) {
        return car.Prices.SummerPrices[
          Object.keys(car.Prices.SummerPrices)[days - 1]
        ];
      } else {
        price = Number(car.Prices.WinterPrices.SevenDaysPrice);
        for (let i = 0; i < days - 7; i++) {
          price += car.WPrice;
        }
      }
      return price;
    }
  }
}

export class Car {
  Id: number;
  Model: string;
  Photo: string;
  Passengers: number;
  Doors: number;
  Transmission: string;
  Fuel: string;
  Consumption: number;
  BodyType: string;
  MinAge: number;
  AC: boolean;
  ABS: boolean;
  Radio: boolean;
  AirBags: boolean;
  Description: string;
  Description_Eng: string;
  SPrice: number;
  WPrice: number;
  Mark: number;
  Reports: FeedBack[];
  Books: Book[];
  Sales: Sale[];
  Includes: string[];
  IncludesEng: string[];
  Groupe: string;
  Power: number;
  Prices: CarPrices;
}
export class CarPrices {
  constructor() {
    this.SummerPrices = new Prices();
    this.WinterPrices = new Prices();
  }
  WinterPrices: Prices;
  SummerPrices: Prices;
}
export class Prices {
  OneDayPrice: number = undefined;
  TwoDaysPrice: number = undefined;
  ThreeDaysPrice: number = undefined;
  FourDaysPrice: number = undefined;
  FiveDaysPrice: number = undefined;
  SixDaysPrice: number = undefined;
  SevenDaysPrice: number = undefined;
}
export class NewCar {
  Id = 0;
  Model: string = null;
  Photo: string = null;
  Contain = '';
  Passengers: number = null;
  Doors: number = null;
  Transmission: string = null;
  Fuel: string = null;
  Consumption = 0;
  BodyType: string = null;
  FilterProp = 0;
  AC = false;
  ABS = false;
  Radio = false;
  AirBags = false;
  Description: string = null;
  Description_ENG: string = null;
  Includes: string[] = [];
}
export interface BookTimes {
  CarId: number;
  DateStart: Date;
  DateFinish: Date;
}
export class Book {
  Id: number;
  DateStart: any;
  DateFinish: any;
  CreateDate: Date;
  Sum: number;
  UserId: number;
  CarId: number;
  SalesId?: number;
  OldPrice?: number;
  Price: number;
  Place: string;
  PlaceOff: string;
  Email?: string;
  Tel?: string;
  Coment?: string;
  Name?: string;
  Description?: string;

  Car?: Car;
  User?: User;
}
export class NewBook {
  DateStart: Date;
  DateFinish: Date;
  Sum: number;
  UserId: number;
  CarId: number;
  OldPrice?: number;
  Price: number;
  Place: string;
  PlaceOff: string;
  Email?: string;
  Tel?: string;
  Coment?: string;
  Name?: string;
  Description?: string;
}

export interface ReportCar {
  Id: number;
  Photo: string;
  Model: string;
  Price: number;
}
export interface Filter {
  Name: string;
  Values: string[];
}

export class Contains {
  public Includes: string[] = [
    'Полностью комбинированное страхование',
    'Неограниченный километраж',
    'Второй водитель бесплатно',
    'Доставка/возврат в любое время',
    'Дорожная карта в подарок',
    'Доставка в аэропорт Ираклиона',
    'Аренда машины на Крите без франшизы'
  ];
  public IncludesEng: string[] = [
    'Fully comprehensive insurance',
    'Unlimited mileage',
    'Second driver free of charge',
    'Delivery/return at any time',
    'Road map as a gift',
    'Delivery to Heraklion airport',
    'Rent a car in Crete with no excess'
  ];
}

export enum UploadTypes {
  Car = 'car'
}
