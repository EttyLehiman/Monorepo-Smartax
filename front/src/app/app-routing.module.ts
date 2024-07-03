import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ClientNavbarComponent } from './pages/client/client-navbar/client-navbar.component';
import { CommunicationLogsComponent } from './pages/client/communication-logs/communication-logs.component';
// import { ClientTaskManagementComponent } from './pages/client/task-management/task-management.component';
import { BillingsComponent } from './pages/client/billings/billings.component';
import { ClientManagementComponent } from './pages/client/client-management/client-management.component';
import { UploadDocComponent } from './pages/client/upload-doc/upload-doc.component';
import { ForgotPasswordComponent } from './forget-password/forget-password.component';
import { RestartPasswordComponent } from './restart-password/restart-password.component';
import { AuthGuard } from './auth.guard';
import { ClientProfileComponent } from './pages/client/client-profile/client-profile.component';
import { ReportsComponent } from './reports/reports.component';
import { TaskReportComponent } from './task-report/task-report.component';
import { TaskInListComponent } from './task-in-list/task-in-list.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { ClientSearchComponent } from './pages/client/client-search/client-search.component';
import { TaskComponent } from './task/task.component';
import { CommunicationClientComponent } from './pages/client/communication-client/communication-client.component';


export const icons = {
  home: 'pi pi-home',
  register: 'pi pi-user-plus',
  employees: 'pi pi-briefcase',
  reports: 'pi pi-file',
  tasks: 'pi pi-list',
  clients: 'pi pi-users',
  admin: 'pi pi-cog',
  user: 'pi pi-user'
};
// Define the routes for the application
export const routes: Routes = [

  {
    path: 'home', component: HomeComponent,
    data: { authType: 10, forToolbar: false, label: 'Home', icon: icons.home }
  }, // Route for the home page
  {
    path: 'login', component: LoginComponent,
    data: { authType: 10, forToolbar: false, label: 'Login', icon: '' }
  }, // Route for the login page
  /*for develope:*/
  {
    path: 'register', component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { authType: 10, forToolbar: false, label: 'Register', icon: icons.register }
  }, // Route for the registration page
  /*for use:*/
  {
    path: 'register-employee', component: RegisterComponent,
    canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'Add Emplyee', icon: icons.register }
  },
  {
    path: 'user', component: BoardUserComponent,
    canActivate: [AuthGuard],
    data: { authType: 3, forToolbar: true, label: 'User', icon: icons.user }
  }, // Route for the user board page, requires authentication with the 'user' role
  {
    path: 'mod', component: BoardModeratorComponent,
    canActivate: [AuthGuard],
    data: { authType: 6, forToolbar: false, label: 'Mod', icon: '' }
  }, // Route for the moderator board page, requires authentication with the 'moderator' role
  {
    path: 'admin', component: BoardAdminComponent,
    canActivate: [AuthGuard],
    data: { authType: 3, forToolbar: true, label: 'Admin', icon: icons.admin }
  },
  {
    path: 'task', component: TaskManagementComponent,
   
    children: [{
      path: 'task-in-list', component: TaskInListComponent }], 
     canActivate: [AuthGuard],
    data: { authType: 6, forToolbar: true, label: 'Task/:id', icon: icons.tasks }
  },
  {
    path: 'forget-password', component: ForgotPasswordComponent,
    data: { authType: 6, forToolbar: false, label: 'Forget-Password', icon: '' }
  },
  {
    path: 'restartPassword', component: RestartPasswordComponent,
    data: { forToolbar: false, label: 'Restart-Password', icon: '' }
  },
  {
    path: 'reports', component: ReportsComponent,
    canActivate: [AuthGuard],
    data: { authType: 3, forToolbar: true, label: 'Reports', icon: icons.reports },
    children: [
      { path: 'task-report', component: TaskReportComponent }
    ]
  },
  {
    path: 'employeesTable', component: EmployeesTableComponent,
    canActivate: [AuthGuard],
    data: { authType: 3, forToolbar: true, label: 'Employees', icon: icons.employees }
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
    data: { forToolbar: false, label: '#', icon: '' }
  }
  ,

  {
    path: 'communicationLogs', component: CommunicationLogsComponent,
    data: { authType: 10, forToolbar: false, label: 'communication Logs', icon: icons.home }
  },

  {
    path: 'clientSearch',
    component: ClientSearchComponent,
    data: { authType: 10, forToolbar: false, label: 'Client Search', icon: icons.home }
  },
  {
    path: 'clientSearch/clientManagement',
    component: ClientManagementComponent,
    data: { authType: 10, forToolbar: false, label: 'Client Management', icon: icons.home },
    children: [
      { path: 'clientProfile', component: ClientProfileComponent },
      {
        path: 'clientNavbar',
        component: ClientNavbarComponent,
        children: [
          { path: 'CommunicationClient', component: CommunicationClientComponent },
          { path: 'uploadDoc', component: UploadDocComponent },
          { path: 'taskManagement', component: TaskManagementComponent },
          { path: 'billings', component: BillingsComponent }
        ]
      }
    ]

  },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import the routes and configure the router module
  exports: [RouterModule] // Export the router module so it can be used in other modules
})
export class AppRoutingModule { } // Define the routing module for the application