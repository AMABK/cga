import {Injectable} from '@angular/core';
import {IDEWsServerPort} from './IDE-env-injection';

@Injectable({
    providedIn: 'root'
})
export class ElementSelectionService {
	private wsSocket:WebSocket = null;
	private elementSelected:{[id:string]:boolean}={};
	
	constructor(){
		try{
			this.wsSocket = new WebSocket('ws://localhost:'+IDEWsServerPort+'/');
			this.wsSocket.addEventListener('message', (event:any) => {
				const message:string=event.data;
				if(!message.startsWith(CMD_SELECT))
					return;
		    	console.log('Message from server:', message);
		    	this.select(message.substr(CMD_SELECT.length));
			});
		}catch(e){			
			console.log(e);
		}
	}
	
	public select(selection:string,event?:any){
		if(!event || (!event.shiftKey && !event.ctrlKey) )
			this.clear();
		if(!selection)
			return;
		const selectionList:string[]=selection.split(',');
		selectionList.forEach( (id:string) => {
			this.elementSelected[id]=true;			
		});
		if(event){
			event.stopPropagation();
			let toBeSync:string=CMD_SELECT;
			// notify IDE via web socket
			if(event.shiftKey || event.ctrlKey){
				for(const id in this.elementSelected)
					if(this.elementSelected[id]){
						if(toBeSync!==CMD_SELECT)
							toBeSync+=",";
						toBeSync+=id;
					}
			}else
				toBeSync+=selection;
			this.wsSocket.send(toBeSync);
		}
	}
	
	public getStyles(id:string):{ [key: string]: string }{
		let styles: { [key: string]: string } ={};
		if(this.elementSelected[id])
			styles["border"]="solid 2px red";
		return styles;
	}
	
	public clear():void{
		this.elementSelected={};
	}
}

export const  CMD_SELECT:string="SELECT~";