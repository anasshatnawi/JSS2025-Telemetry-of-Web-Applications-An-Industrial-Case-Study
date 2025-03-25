import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewPostComponent } from './new-post/new-post.component';
import { NewUserComponent } from './new-user/new-user.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { UserAvailabilitySchedulerComponent } from './user-availability-scheduler/user-availability-scheduler.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserSearchComponent } from './user-search/user-search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';


const appRoutes: Routes = [
  {
    path: 'posts',
    component: PostListComponent
  },
  {
    path: 'new-post',
    component: NewPostComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  { path: 'users/:id', component: UserProfileComponent }, // NEW Dynamic Route
  {
    path: 'new-user',
    component: NewUserComponent
  },
  {
    path: 'user-search',
    component: UserSearchComponent
  },
  {
    path: 'user-availability-schedule',
    component: UserAvailabilitySchedulerComponent
  },
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostListItemComponent,
    HeaderComponent,
    NewPostComponent,
    NewUserComponent,
    UserListComponent,
    UserListItemComponent,
    UserProfileComponent,
    UserSearchComponent,
    UserAvailabilitySchedulerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PostService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
