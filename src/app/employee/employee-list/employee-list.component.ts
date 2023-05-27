import { Component, OnInit } from '@angular/core';
import 'chartjs-plugin-datalabels';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { LabelItem } from 'chart.js';
import { EmployeeService } from 'src/app/_services/employee.service';
import {
  EmployeeTotalWorkingHours,
  EmployeeData,
  Employee,
} from 'src/app/_models/employee';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeTotalWorkingHours[] = [];
  employeesData: EmployeeData[] = [];

  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataset = context.dataset;
            const label = context.label || '';
            const value = Number(dataset.data[context.dataIndex]);
            const total = dataset.data.reduce(
              (previousValue, currentValue) =>
                Number(previousValue) + Number(currentValue)
            ) as number;
            const percentage = ((value / total) * 100).toFixed(2);
            return `Precentage : (${percentage}%) - (${value} hours)`;
          },
        },
      },
    },
  };

  chartType: ChartType = 'pie';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getAll().subscribe((data) => {
      this.setEmployeeData(data);
      this.getEmployeeWorkingHours();
      this.sortedEmployeeByTotalHours();
      this.getDataForChart();
    });
  }

  getDataForChart() {
    this.chartData = [
      {
        data: this.employees.map((employee) => employee.totalWorkHours),
        label: 'Total Work Hours',
      },
    ];
    this.chartLabels = this.employees.map((employee) => employee.name);
  }
  setEmployeeData(data: Employee[]) {
    for (const emp of data) {
      const { EmployeeName } = emp;
      const employeeObj = this.employeesData.find(
        (obj) => obj.employeeName === EmployeeName
      );
      if (employeeObj) {
        employeeObj.attendence.push({
          id: emp.Id,
          starTimeUtc: emp.StarTimeUtc,
          endTimeUtc: emp.EndTimeUtc,
          entryNotes: emp.EntryNotes,
        });
      } else {
        this.employeesData.push({
          employeeName: EmployeeName,
          deletedOn: emp.DeletedOn,
          attendence: [
            {
              id: emp.Id,
              starTimeUtc: emp.StarTimeUtc,
              endTimeUtc: emp.EndTimeUtc,
              entryNotes: emp.EntryNotes,
            },
          ],
        });
      }
    }
  }
  getEmployeeWorkingHours() {
    for (const employee of this.employeesData) {
      let totalWorkHours = 0;
      let sumHours = 0;
      for (const attendance of employee.attendence) {
        const startTime = new Date(attendance.starTimeUtc);
        const endTime = new Date(attendance.endTimeUtc);
        const workHours =
          (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        sumHours += workHours;
      }
      totalWorkHours = Math.floor(sumHours);
      const name = employee.employeeName;
      this.employees.push({ name, totalWorkHours });
    }
  }
  sortedEmployeeByTotalHours() {
    this.employees.sort((a, b) =>
      b.totalWorkHours && a.totalWorkHours
        ? b.totalWorkHours - a.totalWorkHours
        : -1
    );
  }
}
