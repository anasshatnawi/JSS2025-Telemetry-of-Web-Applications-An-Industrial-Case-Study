import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent {
  @Input() user: User;
  constructor(private router: Router) { }

  navigateToUserProfile() {
    if (this.user && this.user.id) {
      this.router.navigate(['/users', this.user.id]); // ✅ Navigate to profile
    } else {
      console.error("User ID is missing, cannot navigate!");
    }
  }
}
