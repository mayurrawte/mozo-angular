import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseList',
  pure: false
})
export class ReverseListPipe implements PipeTransform {

  transform(value: any): any {
    return value.slice().reverse();
  }
}
