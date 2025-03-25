import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = [];
  usersSubscription: Subscription

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.usersSubscription = this.userService.userSubject.subscribe(
      (users) => this.users = users
    );
    this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

}
