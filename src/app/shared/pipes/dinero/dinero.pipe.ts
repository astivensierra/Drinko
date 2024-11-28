import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dinero',
  standalone: true,
  pure: true
})
export class DineroPipe implements PipeTransform {

  transform(value: number ): string {
    return value.toLocaleString("en-ES");
  }

}
