import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'content': ['', Validators.required]
    });
  }

  onSavePost() {
    const postPayload = {
      title: this.postForm.get('title')?.value,
      content: this.postForm.get('content')?.value,
      authorId: "guest"
    };

    this.postService.addPost(postPayload).subscribe(() => {
      this.postService.getPosts();  // Ensure posts are refreshed with correct IDs
      this.router.navigate(['/posts']);
    });
  }

}
