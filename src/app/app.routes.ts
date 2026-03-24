import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { ProjectListComponent } from './pages/projects/project-list/project-list.component';
import { ProjectCreateComponent } from './pages/projects/project-create/project-create.component';
import { ProjectDetailsComponent } from './pages/projects/project-details/project-details.component';

import { ArtifactListComponent } from './pages/artifacts/artifact-list/artifact-list.component';
import { ArtifactEditComponent } from './pages/artifacts/artifact-edit/artifact-edit.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: 'projects/create', component: ProjectCreateComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [AuthGuard] },

  { path: 'artifacts', component: ArtifactListComponent, canActivate: [AuthGuard] },
  { path: 'artifacts/:id', component: ArtifactEditComponent, canActivate: [AuthGuard] },
];
