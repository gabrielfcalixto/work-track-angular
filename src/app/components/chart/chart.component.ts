import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() chartData: any;
  @Input() chartOptions: any;
  @Input() chartType: 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'mixed' = 'pie';
  @Input() darkMode: boolean = false;

  defaultOptions: any;

  ngOnInit() {
    const textColor = this.darkMode ? 'var(--primary-text)' : 'var(--secondary-text)';
    const gridColor = this.darkMode ? 'var(--surface-d)' : 'var(--surface-e)';

    // Configuração aprimorada para gráficos, removendo as grades
    this.defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top', // Melhor localização da legenda
          labels: {
            color: textColor,
            font: {
              family: 'Arial, sans-serif', // Fonte mais limpa
              size: 14
            }
          }
        },
        tooltip: {
          backgroundColor: this.darkMode ? 'rgba(0, 0, 0, 0.7)' : 'var(--surface-b)', // Tooltip com fundo mais legível
          titleColor: textColor,
          bodyColor: textColor,
          callbacks: {
            label: (context: any) => `${context.label}: ${context.raw}%`, // Formatação de label mais amigável
          }
        },
        datalabels: {
          display: true,
          color: textColor,
          font: {
            weight: 'bold',
            size: 14
          },
          formatter: (value: any) => `${value}%`, // Exibição de valores com porcentagem
        }
      },
      animation: {
        duration: 1000, // Animação mais suave
        easing: 'easeOutBounce', // Efeito de animação mais interessante
      },
      scales: {
        // Removendo as grades, deixando os eixos sem grid
        x: {
          display: false, // Desabilitar exibição do eixo X
        },
        y: {
          display: false, // Desabilitar exibição do eixo Y
        }
      }
    };

    // Mesclar as opções padrão com as opções passadas via @Input()
    this.chartOptions = { ...this.defaultOptions, ...this.chartOptions };
  }
}
