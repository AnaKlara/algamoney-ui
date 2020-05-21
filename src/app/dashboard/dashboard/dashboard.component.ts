import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { DashboardService } from './../dashboard.service';

/**
 * Dashboard component
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };


  /**
  * Construtor do componente Dashboard
  * @constructor
  */
  constructor(
    private dashboardService: DashboardService,
    private title: Title,
    private decimalPipe: DecimalPipe
    ) { }

    /**
    *
    */
  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
    this.title.setTitle('Algamoney - Dashborad');
  }

  /**
 * Pede o fornecimento de dados para o serviço e mapeia para adequá-los ao componente do gráfico.
 */
  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        console.log(dados);

        this.pieChartData = {
                    labels: dados.map(dado => dado.categoria.nome),
                    datasets: [
                      {
                        data: dados.map(dado => dado.total),
                        backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                            '#DD4477', '#3366CC', '#DC3912']
                      }
                    ]
                  };

      });
  }

  /**
  * Pede o fornecimento de dados para o serviço e mapeia para adequá-los ao componente do gráfico.
  */
  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {
        const diasDoMes = this.configurarDiasMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
        const totaisDespesas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC'
            }, {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        }
      });
  }

  /**
  * Pede o fornecimento de dados para o serviço e mapeia para adequá-los ao componente do gráfico.
  * @param {} dados - Dados do mês
  * @param {} diasDoMes - Lista com os dias do mês
  * @returns {Number} Totais
  */
  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;

          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  /**
  * Faz a captura do dia e mês para a montagem de parâmetros em outras funções.
  */
  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    return dias;
  }


}
