import {DemoLearningComponent} from './demo-learning/demo-learning.component';
import {MechanizationServicesComponent} from './mechanization-services/mechanization-services.component';
import {FinanceServicesComponent} from './finance-services/finance-services.component';
import {InputServicesComponent} from './input-services/input-services.component';
import {AggregationServicesComponent} from './aggregation-services/aggregation-services.component';
import {AuthGuard} from './../../_services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddAggregationComponent} from "./aggregation-services/add-aggregation/add-aggregation.component";
import {AddDemoLearningComponent} from "./demo-learning/add-demo-learning/add-demo-learning.component";
import {AddMechanizationComponent} from "./mechanization-services/add-mechanization/add-mechanization.component";
import {AddInputComponent} from "./input-services/add-input/add-input.component";
import {AddFinanceComponent} from "./finance-services/add-finance/add-finance.component";


const routes: Routes = [
	{ path: 'aggregation',component: AggregationServicesComponent,canActivate:[AuthGuard] },
	{ path: 'aggregation-add', component: AddAggregationComponent, canActivate:[AuthGuard]},
    { path: 'aggregation-edit/:id', component: AddAggregationComponent, canActivate:[AuthGuard]},
  	{ path: 'finance',component: FinanceServicesComponent,canActivate:[AuthGuard]},
  	{ path: 'finance-add', component: AddFinanceComponent, canActivate:[AuthGuard] },
    { path: 'finance-edit/:id', component: AddFinanceComponent, canActivate:[AuthGuard] },  	
	{ path: 'inputs',component: InputServicesComponent, canActivate:[AuthGuard] },
	{ path: 'inputs-add', component: AddInputComponent, canActivate:[AuthGuard] },
    { path: 'inputs-edit/:id', component: AddInputComponent, canActivate:[AuthGuard] },
	{ path: 'mechanization',component: MechanizationServicesComponent, canActivate:[AuthGuard]},
	{ path: 'mechanization-add', component: AddMechanizationComponent, canActivate:[AuthGuard] },
    { path: 'mechanization-edit/:id', component: AddMechanizationComponent, canActivate:[AuthGuard] },
	{ path: 'demo-learning', component: DemoLearningComponent, canActivate:[AuthGuard] },
	{ path: 'demo-learning-add', component: AddDemoLearningComponent, canActivate:[AuthGuard] },
    { path: 'demo-learning-edit/:id', component: AddDemoLearningComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
