export class Post {
  id: string;
  title: string;
  content: string;
  loveIts: number;
  authorId: string;
  createdAt: Date;

  constructor(title: string, content: string, authorId?: string) {
    this.title = title;
    this.content = content;
    this.authorId = authorId || "guest";
    this.id = '';
    this.loveIts = 0;
    this.createdAt = new Date();
  }

}