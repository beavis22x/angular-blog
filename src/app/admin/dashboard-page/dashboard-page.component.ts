import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../utils/interfaces/admin-panel.interfaces';
import { Subscription } from 'rxjs';

import { PostsService } from '../../shared/components/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  public posts!: Post[];
  public postsSub!: Subscription;
  public deleteSub!: Subscription;
  public filterStr = '';

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
      this.postsSub = this.postsService.getAll().subscribe(posts => {
        return this.posts = posts;
      })
  }

  public remove(id: any): void {
    this.deleteSub = this.postsService.remove(id).subscribe(posts => {
      this.posts = this.posts.filter(post => post.id != id)
      console.log(this.posts)
    })
  }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe()
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe()
    }
  }
}
