import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent extends BaseComponent implements OnInit  {
  form!: FormGroup;
  title!: string;
  id!: string | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ){
    super();
    this.form = this.buildForm();

    this.id = this.route.snapshot.paramMap.get('id');
    this.title = this.id ? 'Hero details:' : 'Add new hero'
  }

  ngOnInit(): void {
    if(this.id){
      this.addSubscription(
        this.heroService.getHero(+this.id).subscribe(res => {
          this.form.patchValue({...res})
        })
      )
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      age: ['',],
    });
  }

  onSubmit(){
    // to fix bug of last character in lowercase
    this.form.patchValue({...this.form.value, name: this.form.get('name')?.value.toUpperCase()})

    const addHero$ = this.heroService.addHero(this.form.value).pipe(finalize(() => this.location.back()));
    const updateHero$ = this.id ? this.heroService.updateHero({id: +this.id, ...this.form.value}).pipe(finalize(() => this.location.back())) : null;

    if (this.id && updateHero$){
      this.addSubscription(
        updateHero$.subscribe(next => {
          console.log('Next when updatedHero: ', next)
        })
      )

    } else {
      addHero$.subscribe(next => {
        console.log('Next when addHero: ', next)
      })
    }
  }

}
