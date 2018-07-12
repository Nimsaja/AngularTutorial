import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HeroService } from '../hero.service';
import { Protocol } from '../protocol';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['time', 'action', 'heroid', 'note'];
  dataSource = new MatTableDataSource();
  count: number;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getProtocol();
  }

  getProtocol(): void {
    this.heroService.getProtocol().subscribe(
      p => {this.dataSource.data = p;
            this.count = this.dataSource.data.length;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
