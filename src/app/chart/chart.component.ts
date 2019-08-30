import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

// declare var require: any;
// const Boost = require('highcharts/modules/boost');
// const noData = require('highcharts/modules/no-data-to-display');
// const More = require('highcharts/highcharts-more');

// Boost(Highcharts);
// noData(Highcharts);
// More(Highcharts);
// noData(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

  constructor() { }

  ngOnInit() { }

}
