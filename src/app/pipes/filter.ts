import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'RandomSearch',
})
export class RandomSearch implements PipeTransform {
	/**
	   * Transform
	   *
	   * @param {any[]} items
	   * @param {string} searchText
	   * @returns {any[]}
	   */
	  transform(items: any[], term: string): any[] {
	    if (!items) {
	      return [];
	    }
	    if (!term) {
	      return items;
	    }
	    term = term.toLocaleLowerCase();

	    return items.filter(item =>
		    Object.keys(item).some(
		      k =>
		        item[k] != null &&
		        item[k]
		          .toString()
		          .toLowerCase()
		          .includes(term.toLowerCase())
		    )
		);
	  }
}

@Pipe({
    name: 'KeyFilter'
})
export class KeyFilter implements PipeTransform {
    transform(items: any[], field : string, value): any[] {
      if (!items) return [];
      if (!value || value.length === 0) return items;
      return items.filter(it => (it[field] == value || (Array.isArray(it[field]) && it[field].indexOf(value)>-1)));
    }
}