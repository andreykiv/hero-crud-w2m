import { Component } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { Observable, delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  loading$!: Observable<boolean>;
  title = 'super-heroes-app';

  constructor(
    private spinnerService: SpinnerService
  ){
    // to prevent expressionchangedafterithasbeencheckederror
    this.loading$ = this.spinnerService.isLoading$.pipe(delay(0));
  }
}
