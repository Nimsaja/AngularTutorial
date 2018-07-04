import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Protocol } from '../Protocol';
import { Time } from "@angular/common";

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {

  protocol: Protocol;
  protocolString: string

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getProtocol();  
  }

  getProtocol(): void {
    this.heroService.getProtocol().subscribe(
      p => {this.protocol = p;
        this.protocolString = p.time+"-> Action: "+p.action+", Hero ID: "+p.heroid+", Note: "+p.note}
    );
  }

  getProtocolString(): string {
    return this.protocolString;
  }

}
