import { NgModule } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { RoleService } from '../roles';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {
    TokensComponent,
    TokensRoutingModule,
    TokenListComponent,
    TokenComponent,
    TokenService,
    TokenListResolve,
    TokenResolve,
    TokenGuard,
    TokenFactory
} from '../tokens';

@NgModule({
    imports: [
        SharedModule,
        SmartadminDatatableModule,
        SmartadminValidationModule,
        SmartadminInputModule,
        TokensRoutingModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    exports: [],
    declarations: [TokensComponent, TokenListComponent, TokenComponent],
    providers: [
        TokenService,
        TokenGuard,
        TokenListResolve,
        TokenResolve,
        TokenFactory,
        RoleService,
        UpperCasePipe
    ]
})
export class TokensModule { }
