import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'TitleCase'})
export class TitleCase implements PipeTransform {
    public transform(input:string): string{
        if (!input) {
            return '';
        } else {
        	input = input.toLocaleLowerCase();
            return input.replace(/\b\w/g, first => first.toLocaleUpperCase()) 
        }
    } 
}