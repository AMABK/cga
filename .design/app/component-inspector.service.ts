import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {IDEWsServerPort} from './IDE-env-injection';

@Injectable({
    providedIn: 'root'
})
export class ComponentInspectorService {
	private wsSocket:WebSocket = null;
	private elementSelected:{[id:string]:boolean}={};
	private compForEdit:any=null;
	private compId:number=null;
	
	constructor(){
		try{
			this.wsSocket = new WebSocket('ws://localhost:'+IDEWsServerPort+'/');
			this.wsSocket.addEventListener('message', (event:any) => {
		    	const message:string= event.data;
		    	console.log('Message from server:'+message);
		    	if(this.compForEdit && message.startsWith(CMD_SET)){
		    		const content:string=message.substr(CMD_SET.length);
		    		const id:number=parseInt(content.substring(0,content.indexOf("~")));
		    		if(id===this.compId){
		    			const comp:any=JSON.parse(content.substr(content.indexOf("~")+1));
		    			Object.assign(this.compForEdit,comp);
		    		}
		    	}
			});
		}catch(e){	
			console.log(e);
		}
	}
	
	public getComp(comp:any){
		if(!comp)
			return;
		try{
			this.compForEdit=comp;
			this.compId=new Date().getTime();
			const getCircularReplacer = () => {
  				const seen = new WeakSet();
  				return (key:any, value:any) => {
  	      			if(value instanceof HttpClient || value instanceof FormControl || value instanceof MatDialog ||
  	      				value instanceof Router)
  	      				return;
  	      			if(key==="__elementSelectionService" || key==="__componentInspectorService")
  	      				return;
    				if (typeof value === "object" && value !== null) {
      					if (seen.has(value)) 
        					return;
      					seen.add(value);
    				}
    				return value;
  				};
			};
			const json:string=JSON.stringify(comp, getCircularReplacer());
			if(this.wsSocket.readyState===WebSocket.OPEN)
				this.wsSocket.send(CMD_GET+json);
			else if(this.wsSocket.readyState===WebSocket.CONNECTING)
				this.wsSocket.onopen =(ev: any) => {
				this.wsSocket.send(CMD_GET+this.compId+'~'+json);				
				};
			}catch(e){
				console.log(e);
			}
		}
}

export const  CMD_SET:string="SET~";
export const CMD_GET:string="GET~";