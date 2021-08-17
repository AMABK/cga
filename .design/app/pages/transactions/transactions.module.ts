import {SharedModule} from './../../shared/shared.module';
import {TransactionsComponent} from './transactions.component';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { NgModule } from '@angular/core';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

@NgModule({
  declarations: [TransactionsComponent, TransactionDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
