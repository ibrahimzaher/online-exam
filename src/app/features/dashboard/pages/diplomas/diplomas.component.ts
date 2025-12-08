import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressSpinner } from 'primeng/progressspinner';
import { loadDiplomasLoading } from '../../../../core/store/ui/ui.constant';
import { selectLoadingKey } from '../../../../core/store/ui/ui.reducer';
import { EmptyListComponent } from '../../components/empty-list/empty-list.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DashboardPageActions } from '../../store/dashboard/dashboard.actions';
import { selectSubjects } from '../../store/dashboard/dashboard.reducer';
import { DiplomaComponent } from './diploma/diploma.component';

@Component({
  selector: 'app-diplomas',
  imports: [HeaderComponent, ProgressSpinner, DiplomaComponent, EmptyListComponent],
  templateUrl: './diplomas.component.html',
  styleUrl: './diplomas.component.css',
})
export class DiplomasComponent {
  private readonly store = inject(Store);
  subjects = this.store.selectSignal(selectSubjects);
  loading = this.store.selectSignal(selectLoadingKey(loadDiplomasLoading));
  ngOnInit(): void {
    if (this.subjects().length === 0) this.store.dispatch(DashboardPageActions.loadDiplomas());
  }
}
