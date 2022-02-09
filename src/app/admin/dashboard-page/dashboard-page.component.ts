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
  public filterStr = '';

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
      this.postsSub = this.postsService.getAll().subscribe(posts => {
        this.posts = posts;
      })
  }

  public remove(id: any): void { }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe()
    }
  }
}
