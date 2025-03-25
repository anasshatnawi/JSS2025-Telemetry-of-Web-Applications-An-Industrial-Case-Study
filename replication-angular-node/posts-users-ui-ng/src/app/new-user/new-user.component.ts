import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm!: FormGroup;
  agreementLevels: number[] = [0, 20, 40, 60, 80, 100];  // Predefined levels
  avatarPreview: string | null = null;  // Avatar preview image

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'birthday': ['', Validators.required],
      'telephone': ['', Validators.required],
      'country': ['', Validators.required],
      'bio': '',
      'favoriteNumber': '',
      'favoriteColor': '',
      'agreementLevel': new FormControl(50),
      'avatarImage': '',
      'newsletter': false
    });
  }

  onSaveUser() {
    const newUser = new User(
      this.userForm.value.firstName,
      this.userForm.value.lastName,
      this.userForm.value.gender,
      this.userForm.value.email,
      this.userForm.value.password,
      new Date(this.userForm.value.birthday),
      this.userForm.value.telephone,
      this.userForm.value.country,
      this.userForm.value.bio,
      this.userForm.value.favoriteNumber,
      this.userForm.value.favoriteColor,
      this.avatarPreview, // Pass avatar preview
      this.userForm.value.agreementLevel,
      this.userForm.value.newsletter
    );

    this.userService.addUser(newUser).subscribe({
      next: (createdUser) => {
        // console.log("User created successfully!", createdUser);
        this.userService.getUsers();  // Refresh the user list

        if (createdUser.id) {
          this.router.navigate(['/users', createdUser.id]);  // ✅ Navigate using the generated ID
        } else {
          console.error("Received user without an ID:", createdUser);
        }
      },
      error: (err) => console.error("Failed to create user:", err)
    })
  }

  // Handle file selection and preview
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {

      // const MAX_SIZE_MB = 5;
      // if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      //   alert("Image size exceeds 5MB. Please choose a smaller file.");
      //   return;
      // }
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}
