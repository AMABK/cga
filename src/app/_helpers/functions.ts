import {TitleCase} from './../pipes/title-case';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export class Functions {

    public static alertDelete(title:string,message:string): any{
        return Swal.fire({
            title: title,
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        });
	}

    public static alertSuccess(title:string,message:string): any{
    	return Swal.fire(title, message, 'success');
    }

    public static alertError(title:string,message:string): any{
    	return Swal.fire(title, message, 'error');
    }

    public static alertInfo(title:string,message:string): any{
    	return Swal.fire(title, message, 'info');
    }

    public static randomWord(m: number){
		m = m || 9;
		let s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
		return s;
	}

    public static randomNumber(m: number){
		m = m || 9;
		let s = '', r = '0123456789';
		for (let i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
		return s;
	}

    public static isValidEmail(email)
    {
        let re = /\S+@\S+\.\S+/;
        return email? re.test(email) : false;
    }

    public static addRow(array,blankRow,toastr) {
		array.push(blankRow);
		toastr.success('New row added successfully', 'Add Success');
		return true;
	}

    public static deleteRow(array,index,toastr) {
		if(array.length==1) {
			toastr.error("Cannot delete this row", 'Warning');
			return false;
		} else {
			array.splice(index, 1);
			toastr.success('This row deleted successfully', 'Delete Success');
		    return true;
		}
	}

    public getYearsBefore(limit): number[] {
    	let years = [];
	    let max = new Date().getFullYear();
	    let min = max - limit;

	    for (let i = max; i >= min; i--) {
	      years.push(i)
	    }
	    return years;
  	}
    public getMonths(){
      let longMonth= ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
      let shortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
      return longMonth;
    }
    public getWeeks(){
      let weeks= ["Week 1","Week 2","Week 3","Week 4","Week 5"];
      return weeks;
    }
    public static objectify(data:any,key): any{
    	let obj = {};
		if(Array.isArray(data) && data.length>0)
		{
	    	for(var i in data){
	    		var index = (String(data[i][key])).trim();
	    		if(index!='')
	    		{
	    			obj[index] = data[i];
	    		}
	    	}
		}
		return obj;
    }

    public static handleError(err:any, defaultMessage:string){
    	let titleCase: TitleCase;
    	let errorMessage = defaultMessage;
    	let errors = err.error?.error?.details || [];
		let messages = [];

		for(let i = 0; i<errors.length; i++){
			let msg = errors[i];
			let title = ((msg?.path || '').replace('/','') || '').toUpperCase().trim();
			title = (title!=''? title + ': ' : '') + (msg?.message || '');
			title = title.replace(' instance','');
			title = title.replace('Details:','');
			title = title.replace('(value: null).','');
			messages.push(title);
		}

		let longMessage = messages.join('<br/><br/>');

      	switch(err.error?.error?.statusCode || err.status){
      		case 0: errorMessage = 'Connection error! Please try later.'; break;
      		case 401: errorMessage = err.error?.error?.message || err.message; break;      		
      		case 404: errorMessage = err.error?.error?.message || 'Service requested is not available'; break;
      		case 422: errorMessage = longMessage; break;
      		case 500: errorMessage = longMessage; break;
      		default: errorMessage = defaultMessage; break;
      	}

      	return errorMessage;
    }
}
