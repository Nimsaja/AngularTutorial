import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Protocol } from '../protocol';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {

  protocols: Protocol[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getProtocol();
  }

  getProtocol(): void {
    this.heroService.getProtocol().subscribe(
      p => this.protocols = p);
  }
}
