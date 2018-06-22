import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  foundHeroes$: Observable<Hero[]>;
  arrowKeyLocation = 0;
  selectedHero: Hero;
  heroes: Hero[];
  private arrayIndex = 0;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService, private router: Router) { }
  
  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }
  
  keydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 38: this.arrowKeyLocation--;
               break;
      case 40: this.arrowKeyLocation++;
               break;
    }
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      
      // ignore new term if same as previous term
      distinctUntilChanged(),
      
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.foundHeroes$ = this.heroService.searchHeroes(term)),
    );
  }
  
  getHeroInList(pos: number): void {
    console.log("getHeroInList "+pos);
    
    
    this.foundHeroes$.subscribe(heroes=>{
        this.router.navigateByUrl("/detail/"+heroes.slice(pos,pos+1)[0].id);
        });
    
  }

}
