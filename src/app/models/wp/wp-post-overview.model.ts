import { IPostOverview } from './post-overview.interface';

export class WpPostOverview {

  constructor(private post: IPostOverview) {
  }

  get(property: string) {
    if (this.post[property]) {
      return this.post[property];
    }
  }

  id(): string {
    if (this.post.id) {
      return this.post.id;
    }
  }

  slug(): string {
    if (this.post.slug) {
      return this.post.slug;
    }
  }

  date(): string {
    if (this.post.date) {
      return this.post.date;
    }
  } 
  
  link(): string {
    if (this.post.link) {
      return this.post.link;
    }
  } 
  
  type(): string {
    if (this.post.type) {
      return this.post.type;
    }
  }  

  title(): string {
    if (this.post.title) {
      return this.post.title;
    }
  }

  featuredMediaSrc(): string {
    if (this.post.featured_media_src) {
      return this.post.featured_media_src;
    }
  }
  
}