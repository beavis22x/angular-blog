import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { PostsService } from '../shared/components/posts.service';
import { Post } from '../utils/interfaces/admin-panel.interfaces';
import { RouteConfigs } from '../utils/interfaces/route.interfaces';
import { ROUTE_CONFIGS } from '../utils/constants/route.consts';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent implements OnInit{
  public post$!: Observable<Post>;
  public routeConf: RouteConfigs = ROUTE_CONFIGS;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params.id)
    }))
  }
}
