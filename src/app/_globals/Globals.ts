import {environment} from '../../environments/environment';

export class Globals {
  static baseUrl = environment.baseUrl;
  static apiUrl = Globals.baseUrl + '/api';
  static faq = '/faq';
  static contactRequest = '/contact-request';
  static answered = '/answered';
  static category = '/category';
  static product = '/product';
  static reduction = '/reduction';
  static order = '/order';
  static inShipping = '/in-shipping';
  static shipped = '/shipped';
  static canceled = '/canceled';
  static promoCode = '/promo-code';
  static unverified = '/unverified';
  static user = '/user';
  static resend = '/resend';
  static login = '/login';
  static shop = '/shop';
  static home_image = '/home-image';
  static bill = '/bill';
  static search = '/search';


  static convertDateTimezone(serverDate: Date) {

    // const serverDate = new Date(serverDate.toUTCString());
    console.log(serverDate, serverDate.getFullYear(), serverDate.getMonth(), serverDate.getDate(), serverDate.getHours(), serverDate.getMinutes(), serverDate.getSeconds());
    const convertedDate = new Date(Date.UTC(serverDate.getFullYear(), serverDate.getMonth(), serverDate.getDate(), serverDate.getHours(), serverDate.getMinutes(), serverDate.getSeconds()));

    // @ts-ignore
    Date.prototype.stdTimezoneOffset = function() {
      const jan = new Date(this.getFullYear(), 0, 1);
      const jul = new Date(this.getFullYear(), 6, 1);
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };

    // @ts-ignore
    Date.prototype.isDstObserved = function() {
      return this.getTimezoneOffset() < this.stdTimezoneOffset();
    };

    /*if (serverDate.isDstObserved()) {
      alert('Daylight saving time!');
    }*/
    console.log('date from server : ', serverDate);
    console.log('converted date : ', convertedDate);
    console.log('----------');
    return convertedDate;
  }

  static toFormData<T>(formValue: T) {
    const formData = new FormData();

    console.log('formvalue', formValue);
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      console.log('value', value);
      if (Array.isArray(value)) {
        value.forEach(val => {
          console.log(typeof val);
          if (typeof val === 'object' && !(val instanceof File)) {

            formData.append(`${key}[]`, JSON.stringify(val));

          } else {
            formData.append(`${key}[]`, val);
          }
        });
      } else {
        //  console.log('not array');
        formData.append(key, value);
      }
    }
    // console.log(formData);
    // console.log('exiting toFormData');


    return formData;
  }
}
