import { Component, OnInit } from '@angular/core';
import { JwtServiceService } from 'src/app/shared/service/jwt-service.service';
import { TransactionService } from 'src/app/shared/service/transaction.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  dateTransaction: any[] = [];
  transactionsByMonth: any[] = [];
  chart: any;
  adminChart: any;
  filterMode: string = 'Mois';
  expensesByMonth: any;
  isConnected = false;
  hasAdminRole = false;
  switchBtn: boolean;
  constructor(private transaction: TransactionService, private jwt:JwtServiceService) {
    this.isConnected = this.jwt.isConnected();
    this.hasAdminRole = this.jwt.isAdmin();
    this.switchBtn = this.jwt.switchBtn;
  }
  ngOnInit(): void {
    this.initAdminChart();
    this.initChart();
    this.updateAdminChart();
    this.updateChart();
  }
  initChart(){
    this.chart=new Chart('canvas',{
      type:'line',
      data:{
        labels:[],
        dataset:[{
          label:'Expenses',
          data:[],
          borderWidth:2,
          borderColor:'rgb(255,99,132)',
          backgroundColor:'rgb(255, 99, 132, 0.2)',
          tension:0.15
        },
        {
          label: 'Incomes',
          data: [],
          borderWidth: 2,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192, 0.2)',
          tension: 0.15
        }
      ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: true
            },
            beginAtZero: true,
          },
        },
      },
    });
  }
  initAdminChart() {
    this.adminChart = new Chart('adminCanvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Total Transactions',
            data: [],
            borderWidth: 2,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgb(54, 162, 235, 0.2)',
            tension: 0.15
          }
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: true
            },
            beginAtZero: true,
          },
        },
      },
    });
  }
  setFilterMode(mode: string) {
    this.filterMode = mode;
    this.updateChart();
    this.updateAdminChart();
  }
  updateAdminChart() {
      if (this.filterMode === 'Mois') {
        this.transaction.getNumberOfTransactionsByMonth().subscribe((data: any[]) => {
          this.updateAdminGraphData(data);
        });
      } else if (this.filterMode === 'Annee') {
        this.transaction.getNumberOfTransactionsByYear().subscribe((data: any[]) => {
          this.updateAdminGraphData(data);
        });
      }
  }
  updateChart() {
    let userId: any = this.jwt.getConnectedUserId();
      if (this.filterMode === 'Mois') {
        this.transaction.getNumberOfExpensesByMonth(userId).subscribe((expenseData: any[]) => {
          this.transaction.getNumberOfIncomesByMonth(userId).subscribe((incomeData: any[]) => {
            this.updateGraphData(expenseData, incomeData);
          })
        });
      } else if (this.filterMode === 'Annee') {
        this.transaction.getNumberOfExpensesByYear(userId).subscribe((expenseData: any[]) => {
          this.transaction.getNumberOfIncomesByYear(userId).subscribe((incomeData: any[]) => {
            this.updateGraphData(expenseData, incomeData);
          })
        });
    }
  }
  updateAdminGraphData(data: any[]) {
    const labels = [];
    const transactions = [];
    this.adminChart.data.labels = [];
    this.adminChart.data.datasets[0].data = [];
    if (this.filterMode === "Mois") {
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        for (let i = 1; i <= 12; i++) {
            labels.push(monthNames[i - 1]);
        }
        for (let i = 0; i < 12; i++) {
            transactions.push(0);
        }
        data.forEach(d => {
            transactions[d.month - 1] = d.number;
        });
    } else if (this.filterMode === "Annee") {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i < currentYear + 10; i++) {
            labels.push(i.toString());
        }
        for (let i = 0; i < 10; i++) {
            transactions.push(0);
        }
        data.forEach(d => {
            const index = d.year - currentYear;
            if (index >= 0 && index < 10) {
                transactions[index] = d.number;
            }
        });
    }
    this.adminChart.data.labels = labels;
    this.adminChart.data.datasets[0].data = transactions;
    this.adminChart.update();
  }
  updateGraphData(expenseData: any[], incomeData: any[]) {
    const labels = [];
    const expenseTransactions = [];
    const incomeTransactions = [];
    this.chart.data.labels = [];
    this.chart.data.datasets[0].data = [];
    this.chart.data.datasets[1].data = [];
    if (this.filterMode === "Mois") {
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        for (let i = 1; i <= 12; i++) {
            labels.push(monthNames[i - 1]);
        }
        for (let i = 0; i < 12; i++) {
            expenseTransactions.push(0);
            incomeTransactions.push(0);
        }
        expenseData.forEach(d => {
            expenseTransactions[d.month - 1] = d.transactionCount;
        });
        incomeData.forEach(d => {
            incomeTransactions[d.month - 1] = d.transactionCount;
        });
      } else if (this.filterMode === "Annee") {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i < currentYear + 10; i++) {
            labels.push(i.toString());
        }
        for (let i = 0; i < 10; i++) {
            expenseTransactions.push(0);
            incomeTransactions.push(0);
        }
        expenseData.forEach(d => {
            const index = d.year - currentYear;
            if (index >= 0 && index < 10) {
                expenseTransactions[index] = d.transactionCount;
            }
        });
        incomeData.forEach(d => {
            const index = d.year - currentYear;
            if (index >= 0 && index < 10) {
                incomeTransactions[index] = d.transactionCount;
            }
        });
    }
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = expenseTransactions;
    this.chart.data.datasets[1].data = incomeTransactions;
    this.chart.update();
    }
}
