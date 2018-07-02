import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  scoreMap: Map<number, number>;
  hoverid: number;
  showScore = false;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  fetchScore(): void {
    if (this.showScore === false) {
      this.scoreMap = this.heroService.getScores();
    }
    this.showScore = !this.showScore;
  }

  getScore(hero: Hero): string {
    if (this.scoreMap.has(hero.id)) {
      return this.scoreMap.get(hero.id).toString();
    } else {
      return 'NaN';
    }
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero(name)  // handler creates a Hero-like object from the name
      .subscribe(hero => {                      // When addHero saves successfully, the subscribe callback receives the new hero
        this.heroes.push(hero);                 // and pushes it into to the heroes list for display
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero)
      .subscribe(_ => this.getHeroes());

  }

  moveUp(hero: Hero): void {
    const pos: number = this.heroes.indexOf(hero);

    if (pos > 0) {
      this.heroes.splice(pos - 1, 0, this.heroes.splice(pos, 1)[0]);
      this.heroService.switchHero(hero, this.heroes.indexOf(hero)).subscribe();
    }
  }

  moveDown(hero: Hero): void {
    const pos: number = this.heroes.indexOf(hero);

    if (pos < this.heroes.length) {
      this.heroes.splice(pos + 1, 0, this.heroes.splice(pos, 1)[0]);
      this.heroService.switchHero(hero, this.heroes.indexOf(hero)).subscribe();
    }
  }

}
