import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() chartData: any;
  @Input() chartOptions: any;
  @Input() chartType: 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'mixed' = 'bar';
  @Input() darkMode: boolean = false;

  defaultOptions: any;

  ngOnInit() {
    const textColor = this.darkMode ? '#ebedef' : '#495057';
    const gridColor = this.darkMode ? '#333' : '#ebedef';

    // Configuração padrão para gráficos
    this.defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => ` ${context.label}: ${context.raw}%`,
          }
        },
        datalabels: {
          display: true,
          color: textColor,
          formatter: (value: any) => `${value}%`
        }
      },
      animation: {
        duration: 800,
        easing: 'easeInOutQuad'
      },
      scales: {
        x: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        },
        y: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        }
      }
    };

    // Mesclar as opções padrão com as opções passadas via @Input()
    this.chartOptions = { ...this.defaultOptions, ...this.chartOptions };
  }
}
