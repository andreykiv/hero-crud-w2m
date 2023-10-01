import { Component } from '@angular/core';
import { ColumnDef } from 'src/app/shared/components/table/table.component';
import { Hero } from './model/hero';
import { Router } from '@angular/router';
import { HeroService } from './services/hero.service';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent extends BaseComponent {

  heroes$: Observable<Hero[]>


  public columns: ColumnDef[] = [
    {
      header: 'Actions',
      field: 'action',
      type: 'action'
    },
    {
      header: 'Name',
      field: 'name',
      type: '',
    },
    {
      header: 'Location',
      field: 'location',
      type: '',
    },    {
      header: 'Age',
      field: 'age',
      type: '',
    }
  ]

  constructor(
    private router: Router,
    private heroService: HeroService,
    public dialog: MatDialog
    ){
      super();
      this.heroes$ = this.heroService.getHeroes();
  }


  handleAddNewClicked(){
    this.router.navigateByUrl(`/detail/`)
  }

  handleEditClicked($event: Hero){
    this.router.navigateByUrl(`/detail/${$event.id}`)
  }

  handleDeleteClicked($event: Hero){
    this.openDialog(+$event.id)
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return
      }

      this.addSubscription(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.heroService.deleteHero(id).subscribe(_ =>{
          this.heroes$ = this.heroService.getHeroes();
        })
      )

    });
  }

}
