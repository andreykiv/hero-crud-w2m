import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from 'src/app/pages/heroes/model/hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 16, name: 'Superman', location: 'Smallville', age: 45 },
      { id: 17, name: 'Dynama', location: 'Gotham', age: 54 },
      { id: 18, name: 'Dr. IQ', location: 'Metropolis', age: 343 },
      { id: 19, name: 'Magma', location: 'Asgard', age: 23 },
      { id: 20, name: 'Tornado', location: 'Valhalla', age: 18 },
      { id: 20, name: 'Thor', location: 'Ragnarok', age: 18 },
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
