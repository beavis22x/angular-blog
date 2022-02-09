import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../utils/interfaces/admin-panel.interfaces';
import { Subscription } from 'rxjs';

import { PostsService } from '../../shared/components/posts.service';
import { RouteConfigs } from '../../utils/interfaces/route.interfaces';
import { ROUTE_CONFIGS } from '../../utils/constants/route.consts';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  public posts: Post[] = [];
  public postsSub!: Subscription;
  public deleteSub!: Subscription;
  public filterStr = '';
  public routeConfig: RouteConfigs = ROUTE_CONFIGS;

  constructor(private readonly postsService: PostsService,
              private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
      this.postsSub = this.postsService.getAll().subscribe(posts => {
         this.posts = posts;
         this.cd.markForCheck()
      })
  }

  public remove(id: string | undefined): void {
    this.deleteSub = this.postsService.remove(id).subscribe(posts => {
      this.posts = this.posts.filter(post => post.id != id)
      this.cd.markForCheck()
    })
  }

  ngOnDestroy(): void {
      this.postsSub?.unsubscribe()
      this.deleteSub?.unsubscribe()
  }
}
