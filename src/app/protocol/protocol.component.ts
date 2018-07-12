import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Protocol } from '../protocol';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {

  protocols: Protocol[];
  displayedColumns = ['time', 'action', 'heroid', 'note'];
  dataSource = new MatTableDataSource();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getProtocol();
  }

  getProtocol(): void {
    this.heroService.getProtocol().subscribe(
      p => {this.protocols = p;
            this.dataSource.data = p;
          });
  }
}
