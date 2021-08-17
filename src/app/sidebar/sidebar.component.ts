import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    children: any;
    isOpen: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon:'nc-bank', isOpen: false, children:[] },
    { path: '/members', title: 'Members', icon:'nc-single-02', isOpen: false, children:[] },
    { path: '/agripreneurs', title: 'Agripreneurs', icon:'nc-single-02', isOpen: false, children: [] },    
    { 
    	path: '/activity-tracker', 
    	title: 'Activity Tracker', 
    	icon:'nc-tag-content', 
    	isOpen: false,
    	children: [
			{ path: '/activity-tracker', title: 'Dashboard', icon:'nc-single-02', isOpen: false },
			{ path: '/activity-tracker/activities', title: 'Activities', icon:'nc-single-02', isOpen: false },
			{ path: '/activity-tracker/programmes', title: 'Programmes', icon:'nc-single-02', isOpen: false },
			{ path: '/activity-tracker/programme-kpis', title: 'Set KPIs', icon:'nc-single-02', isOpen: false },
			{ path: '/activity-tracker/achievements', title: 'Achievements', icon:'nc-single-02', isOpen: false },
		]
	},    
    { 
    	path: '/services', 
    	title: 'Services', 
    	icon:'nc-single-02', 
    	isOpen: false,
    	children: [
			{ path: '/services/aggregation', title: 'Aggregation', icon:'nc-single-02', isOpen: false },
			{ path: '/services/finance', title: 'Finance', icon:'nc-single-02', isOpen: false },
			{ path: '/services/inputs', title: 'Inputs & PHHs', icon:'nc-single-02', isOpen: false },
			{ path: '/services/mechanization', title: 'Mechanization', icon:'nc-single-02', isOpen: false },
			{ path: '/services/demo-learning', title: 'Demo & Learning', icon:'nc-single-02', isOpen: false }
		]	
    },    
    { path: '/transactions', title: 'Transactions', icon:'nc-credit-card', isOpen: false, children:[] },
    { path: '/events', title: 'Events', icon:'nc-single-02', isOpen: false, children:[]},
    { path: '/notifications', title: 'Notifications', icon:'nc-chat-33', isOpen: false, children:[] },    
    { path: '/users', title: 'Users', icon:'nc-single-02', isOpen: false, children:[] },
    { 
    	path: '/settings', 
    	title: 'Settings', 
    	icon:'nc-settings', 
    	isOpen: false, 
    	children: [
			{ path: '/settings/crops', title: 'Crop Settings', icon:'nc-single-02', isOpen: false },
			{ path: '/settings/farmers-served', title: 'Farmers Served', icon:'nc-single-02', isOpen: false },
			{ path: '/settings/member-types', title: 'Member Types', icon:'nc-single-02', isOpen: false },
			{ path: '/settings/member-categories', title: 'Member Categories', icon:'nc-single-02', isOpen: false },
			{ path: '/settings/message-types', title: 'Message Types', icon:'nc-single-02', isOpen: false },
			{ path: '/settings/service-categories', title: 'Service Categories', icon:'nc-single-02', isOpen: false },
			{ path: '/settings/space-categories', title: 'Space Categories', icon:'nc-single-02', isOpen: false },
			{ path: '/settings/business-categories', title: 'Business Categories', icon:'nc-single-02', isOpen: false }
		]
	},
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    
    toggle(menu:any){
    	let isOpen = !menu.isOpen;
    	for(let i=0;i<this.menuItems.length;i++){
    		this.menuItems[i].isOpen = false; 
    	}
    	menu.isOpen = isOpen;
    }
}
