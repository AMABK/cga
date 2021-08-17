import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
@Directive({
    selector: '[onReturn]'
})
export class OnReturnDirective {    
    private el: ElementRef;   
    @Input() onReturn: string;
    constructor(private _el: ElementRef,public renderer: Renderer2) {
        this.el = this._el;
    }  
    @HostListener('keydown', ['$event']) onKeyDown(el:any) {
        if ((el.which == 13 || el.keyCode == 13)) { 
        	let els: any = document.querySelectorAll("input[type=text]");
        	el.preventDefault();
        	let x:any, nextEl:any; 
        	for (let i=0, len=els.length; i<len; i++){
	        	x = els[i];
	        	if (el.target == x && (nextEl = els[i+1] ) ){
	        		if (nextEl.focus) { 
	        			nextEl.focus();
	        		}
	        	}
        	}
        }
    } 
}