import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { PostsService } from '../../shared/components/posts.service';
import { AlertService } from '../shared/Services/alert.service';

import { Post } from '../../utils/interfaces/admin-panel.interfaces';
import { RouteConfigs } from '../../utils/interfaces/route.interfaces';

import { ALERT_MESSAGE_ENUM } from '../../utils/enum/alert-messages.enum';

import { ROUTE_CONFIGS } from '../../utils/constants/route.consts';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public subscriptions: Subscription = new Subscription();
  public filterStr = '';
  public routeConfig: RouteConfigs = ROUTE_CONFIGS;
  public alMessages = ALERT_MESSAGE_ENUM;

  constructor(
    private readonly postsService: PostsService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService
  ) {
  }

  public ngOnInit(): void {
    this.postsInit();
  }

  private postsInit(): void {
    this.subscriptions.add(this.postsService.getAll().subscribe((posts: Post[]) => {
        this.posts = posts;

        this.cd.markForCheck();
      }))
  }

  public remove(id: string | undefined): void {
    this.subscriptions.add(this.postsService.remove(id).subscribe((): void => {
      this.posts = this.posts.filter(post => post.id != id);
      this.alertService.danger(this.alMessages.danger);

      this.cd.markForCheck();
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
