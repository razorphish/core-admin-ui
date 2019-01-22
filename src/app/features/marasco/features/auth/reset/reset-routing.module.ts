import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetComponent } from "./reset.component";
import { ResetGuard } from './reset.guard';

const routes: Routes = [{
    path: '',
    component: ResetComponent,
    canActivate: [ResetGuard]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ResetRoutingModule { }
