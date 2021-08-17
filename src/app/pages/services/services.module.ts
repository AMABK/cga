import {SharedModule} from './../../shared/shared.module';
import {DemoLearningComponent} from './demo-learning/demo-learning.component';
import {AggregationServicesComponent} from './aggregation-services/aggregation-services.component';
import {MechanizationServicesComponent} from './mechanization-services/mechanization-services.component';
import {InputServicesComponent} from './input-services/input-services.component';
import {FinanceServicesComponent} from './finance-services/finance-services.component';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { NgModule } from '@angular/core';
import { AddInputComponent } from './input-services/add-input/add-input.component';
import { AddMechanizationComponent } from './mechanization-services/add-mechanization/add-mechanization.component';
import { AddFinanceComponent } from './finance-services/add-finance/add-finance.component';
import { AddAggregationComponent} from './aggregation-services/add-aggregation/add-aggregation.component';
import {AddDemoLearningComponent} from './demo-learning/add-demo-learning/add-demo-learning.component';

@NgModule({
  declarations: [
    AggregationServicesComponent,
    FinanceServicesComponent,
    InputServicesComponent,
    MechanizationServicesComponent,
    DemoLearningComponent,
    AddAggregationComponent,
    AddInputComponent,
    AddMechanizationComponent,
    AddFinanceComponent,
    AddDemoLearningComponent 
    ],
  imports: [
    CommonModule,
    SharedModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
