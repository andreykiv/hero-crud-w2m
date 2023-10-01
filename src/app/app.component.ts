import { Component } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$!: Observable<boolean>;
  title = 'super-heroes-app';

  constructor(
    private spinnerService: SpinnerService
  ){
    this.loading$ = this.spinnerService.isLoading$;
   }
}
