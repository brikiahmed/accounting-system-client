import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'revertDate'
})
export class RevertDatePipe implements PipeTransform {

  transform(date: string): any {
    return null;
  }

}
