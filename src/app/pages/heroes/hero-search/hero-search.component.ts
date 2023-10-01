import { AfterViewInit, Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { HeroService } from '../services/hero.service';
import { Observable, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { Hero } from '../model/hero';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent extends BaseComponent implements AfterViewInit {

  heroes$!: Observable<Hero[]>
  searchValues: FormControl = new FormControl('');

  constructor(
    private heroService: HeroService
  ){
    super();
  }


  ngAfterViewInit(){
    this.heroes$ = this.searchValues.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => this.heroService.searchHeroes(val)),
      tap(res => {
        console.log('RRES: ', res);
      })
    )
  }
}
