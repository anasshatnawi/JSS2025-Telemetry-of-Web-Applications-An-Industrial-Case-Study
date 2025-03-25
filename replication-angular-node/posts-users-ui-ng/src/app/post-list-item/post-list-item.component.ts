import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent {
  @Input() post: Post;

  constructor(private postService: PostService) { }

  onLoveIt() {
    // console.log("Liking post with ID:", this.post.id);
    if (this.post.id) {
      this.postService.likePost(this.post.id).subscribe(updatedPost => {
        this.post.loveIts = updatedPost.loveIts; // Update UI without fetching all posts
      });
    } else {
      console.error("Post ID is missing!");
    }
  }

  onNotLoveIt() {
    // console.log("Disliking post with ID:", this.post.id);
    if (this.post.id) {
      this.postService.dislikePost(this.post.id).subscribe(updatedPost => {
        this.post.loveIts = updatedPost.loveIts; // Update UI without fetching all posts
      });
    } else {
      console.error("Post ID is missing!");
    }
  }

  onDelete() {
    if (this.post.id) {
      this.postService.deletePost(this.post.id).subscribe(() => {
        this.postService.getPosts(); // Only refresh posts when deleting
      });
    }
  }
}