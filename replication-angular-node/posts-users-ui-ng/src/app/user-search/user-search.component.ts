import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  searchEntry: string;
  searchedUsers: User[] = [];
  searchForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      'userSearch': ['', Validators.required]
    });

    // Debounce input to avoid unnecessary API calls
    this.searchForm.get('userSearch')?.valueChanges
      .pipe(
        debounceTime(300), // Wait for 300ms after the last keystroke
        distinctUntilChanged() // Avoid duplicate searches for the same term
      )
      .subscribe(value => {
        this.searchEntry = value.trim();
        this.onUsersSearchChange();
      });
  }

  onUsersSearchChange() {
    this.searchEntry = this.searchForm.get('userSearch').value;

    if (this.searchEntry)
      this.userService.searchUsersByEmail(this.searchEntry).subscribe(searchedUsers => {
        this.searchedUsers = searchedUsers;
      });
    else
      this.searchedUsers = [];
  }

  clearSearch() {
    this.searchEntry = '';
    this.searchForm.reset();
    this.searchedUsers = [];
  }

  navigateToUserProfile(user: User) {
    if (user.id) {
      this.router.navigate(['/users', user.id]); // ✅ Ensure ID is passed
    } else {
      console.error("User ID is missing, cannot navigate!");
    }
  }
}
