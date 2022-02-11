import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { PostsService } from '../shared/components/posts.service';

import { Post } from '../utils/interfaces/admin-panel.interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public posts$!: Observable<Post[]>

  constructor(private postsService: PostsService) {
  }

  public ngOnInit(): void {
    this.posts$ = this.postsService.getAll();
  }
}

