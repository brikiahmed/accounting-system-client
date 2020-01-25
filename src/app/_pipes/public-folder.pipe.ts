import {Pipe, PipeTransform} from '@angular/core';
import {Globals} from '../_globals/Globals';

@Pipe({
  name: 'publicFolder'
})
export class PublicFolderPipe implements PipeTransform {

  transform(path: string): any {
    return Globals.baseUrl + '/' + path;
  }

}
