import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pageTitle' })
export class PageTitle implements PipeTransform {
  transform(value: string) {
    return value.replace('Page', '');
  }
}
