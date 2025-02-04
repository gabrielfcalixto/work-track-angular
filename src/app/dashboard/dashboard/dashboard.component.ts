import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  filter: string = '';

  projects = [
    { name: 'Projeto A', status: 'Em andamento', progress: 50 },
    { name: 'Projeto B', status: 'Concluído', progress: 100 },
    { name: 'Projeto C', status: 'Atrasado', progress: 30 }
  ];

  activities = [
    { name: 'Tarefa 1', project: 'Projeto A', status: 'Concluído', dueDate: new Date() },
    { name: 'Tarefa 2', project: 'Projeto B', status: 'Em andamento', dueDate: new Date() },
    { name: 'Tarefa 3', project: 'Projeto C', status: 'Atrasado', dueDate: new Date() }
  ];

  chartData = {
    labels: ['Projeto A', 'Projeto B', 'Projeto C'],
    datasets: [
      {
        data: [50, 100, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
}
