import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {Data} from './data.model';

interface DataType {
  date: any;
  value: any;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {

  @ViewChild('chart')
  private chartContainer: ElementRef;

  @Input()
  data: Data[];

  margin = {top: 10, right: 30, bottom: 30, left: 30};

  constructor() {
  }

  ngOnChanges(): void {
    if (!this.data) {
      return;
    }

    this.createChart();
  }

  createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = Object.assign(
      this.data.map(({violatedRules, timestamp}) => ({
        date: new Date(timestamp),
        value: violatedRules
      })), {y: 'Violations'});

    const svg = d3.select(element)
      .append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', 500)
      .append('g')
      .attr('transform',
        `translate(${this.margin.left},${this.margin.top})`);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const xAxis = g => g
      .attr('transform', `translate(0,${contentHeight})`)
      .call(d3.axisBottom(x).ticks(contentWidth / 80).tickSizeOuter(0));

    const yAxis = g => g
      // .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text(data.y));

    const x = d3
      .scaleTime()
      .rangeRound([0, contentWidth])
      .domain([data[0].date, data[data.length - 1].date]).nice();

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) + 5]).nice()
      .rangeRound([contentHeight, this.margin.top]);

    svg.append('g')
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    // Add the line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', d3.line<DataType>()
        .x((d: any) => x(d.date))
        .y((d: any) => y(d.value))
      );

    // Add the line
    svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('text-anchor', 'middle')
      .selectAll('text1')
      .data(data)
      .join('text')
      .text(d => d.value)
      .attr('dy', '0.35em')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.value))
      .clone(true).lower()
      .attr('fill', 'none')
      .attr('stroke', '#eeeeee')
      .attr('stroke-width', 6);


  }
}
