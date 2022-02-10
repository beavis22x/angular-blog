import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../utils/interfaces/admin-panel.interfaces';
import { PostsService } from '../shared/components/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  posts$!: Observable<Post[]>

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.posts$ = this.postsService.getAll();
  }
}

