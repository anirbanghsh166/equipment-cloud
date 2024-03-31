import { Routes } from '@angular/router';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'equipmentList', component: EquipmentListComponent },
    { path: 'add-equipment', component: AddEquipmentComponent}
]
