import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userRole: 'comum' | 'gestor' | 'admin' = 'comum';  // Exemplo: ajustar conforme o login

  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };



  taskData = {
    labels: ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'],
    datasets: [
      {
        label: 'Tarefas Concluídas',
        data: [12, 19, 3],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }
    ]
  };

  taskStatusData = {
    labels: ['Concluídas', 'Em Progresso', 'Pendentes'],
    datasets: [
      {
        data: [10, 5, 2],
        backgroundColor: ['#66BB6A', '#FFA726', '#FF6384']
      }
    ]
  };

  ultimosLancamentos = [
    { atividade: 'Implementação de API', horas: 4, data: '10/03/2025' },
    { atividade: 'Reunião com Cliente', horas: 2, data: '09/03/2025' },
    { atividade: 'Correção de Bugs', horas: 3, data: '08/03/2025' }
  ];


  projectProgressData = {
    labels: ['Projeto A', 'Projeto B', 'Projeto C'],
    datasets: [
      {
        label: 'Progresso',
        data: [60, 80, 40],
        borderColor: '#42A5F5'
      }
    ]
  };

  taskAllocationData = {
    labels: ['Backend', 'Frontend', 'DevOps', 'Testes'],
    datasets: [
      {
        data: [25, 35, 20, 20],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350']
      }
    ]
  };

  userActivityData = {
    labels: ['Criar', 'Editar', 'Excluir', 'Visualizar'],
    datasets: [
      {
        label: 'Atividades',
        data: [10, 5, 2, 20],
        backgroundColor: '#42A5F5'
      }
    ]
  };

  systemUsageData = {
    labels: ['Módulo 1', 'Módulo 2', 'Módulo 3'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };



  ngOnInit() {
    // Simulando tipo de usuário
    this.userRole = 'comum';  // Pode ser 'comum', 'gestor' ou 'admin'
  }
}
