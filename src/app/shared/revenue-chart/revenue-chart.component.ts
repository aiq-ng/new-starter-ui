import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
})
export class RevenueChartComponent implements AfterViewInit {
  @ViewChild('revenueChart') revenueChartRef!: ElementRef;

  ngAfterViewInit(): void {
    const ctx = this.revenueChartRef.nativeElement;

    // Updated Data: Points placed between days
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = {
      labels: ['Mon', '', '', 'Tue', '', '', 'Wed', '', '', 'Thu', '', '', 'Fri', '', '', 'Sat', '', '', 'Sun'],
      datasets: [
        {
          label: 'Revenue',
          data: [
            20, 30, 40, // Mon to Tue
            50, 55, 45, // Tue to Wed
            70, 65, 60, // Wed to Thu
            90, 85, 92, // Thu to Fri
            25, 30, 28, // Fri to Sat
            80, 75, 85, // Sat to Sun
          ],
          backgroundColor: 'rgba(244, 63, 94, 0.2)',
          borderColor: '#f43f5e',
          borderWidth: 2,
          pointRadius: 0, // Hide points
          fill: true,
          tension: 0, // Sharp edges
        },
      ],
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#ffffff',
            titleColor: '#000000',
            titleFont: { weight: 'bold', size: 14 },
            bodyColor: '#f43f5e',
            bodyFont: { weight: 'bold', size: 14 },
            displayColors: false,
            callbacks: {
              title: (tooltipItems: any) => {
                const index = tooltipItems[0].dataIndex;
                const day = labels[Math.floor(index / 3)];
                return `${day}, 24 Nov`; 
              },
              label: (tooltipItem: any) => {
                const revenue = tooltipItem.raw;
                return `₦${revenue}k`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              callback: (val: any, index: number) =>
                index % 3 === 0 ? labels[Math.floor(index / 3)] : '',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20,
              callback: (value: any) => `₦${value}k`,
            },
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
      },
      plugins: [
        {
          id: 'dashedLineOnHover',
          afterDraw: (chart: any) => {
            const ctx = chart.ctx;
            const activePoint = chart.tooltip?.dataPoints?.[0];
            if (activePoint) {
              const x = activePoint.element.x;
              const topY = chart.scales.y.top;
              const bottomY = chart.scales.y.bottom;

              // Red Dashed Line
              ctx.save();
              ctx.beginPath();
              ctx.setLineDash([5, 5]);
              ctx.moveTo(x, topY);
              ctx.lineTo(x, bottomY);
              ctx.strokeStyle = '#f43f5e';
              ctx.lineWidth = 1.5;
              ctx.stroke();
              ctx.restore();
            }
          },
        },
      ],
    };

    new Chart(ctx, config as any);
  }
}
