import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Post } from '../../../utils/interfaces/admin-panel.interfaces';
import { RouteConfigs } from '../../../utils/interfaces/route.interfaces';
import { ROUTE_CONFIGS } from '../../../utils/constants/route.consts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post!: Post;
  public routeConf: RouteConfigs = ROUTE_CONFIGS;
}
