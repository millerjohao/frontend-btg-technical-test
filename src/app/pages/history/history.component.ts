import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogicAppService } from '../../services/logic-app.service';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { ICustomer } from '../core/interfaces/customer-model.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITransaction } from '../core/interfaces/transaction-model.interface';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [LogicAppService],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit, AfterViewInit {
  logicAppService = inject(LogicAppService);
  transactions: ITransaction[] = [];
  loading = true;
  error = false;
  displayedColumns: string[] = [
    'transactionType',
    'fundName',
    'amount',
    'transactionDate',
  ];
  currentCustomer: ICustomer;
  public transactionsList = new MatTableDataSource<ITransaction>([]);
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  constructor() {
    this.currentCustomer = this.logicAppService.getCustomerFromLocalStorage();
  }

  ngAfterViewInit(): void {
    this.transactionsList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.logicAppService.getTransactions(this.currentCustomer.id).subscribe({
      next: (res: any) => {
        this.transactions = res;
        this.transactionsList.data = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
