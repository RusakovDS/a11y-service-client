import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Rule} from '../../state';
import {MatPaginator} from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-tests-violated-rules',
  templateUrl: './tests-violated-rules.component.html',
  styleUrls: ['./tests-violated-rules.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      // transition('* => expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> collapsed, void => expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),

    ]),
  ],
})
export class TestsViolatedRulesComponent implements OnInit {

  dataSource: MatTableDataSource<Rule>;
  @Input() data: [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['id', 'impact', 'description', 'help', 'helpUrl'];
  expandedElement: any;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    console.log('OnInit');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
