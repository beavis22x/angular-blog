import { Pipe, PipeTransform } from '@angular/core';

import { Post } from '../../utils/interfaces/admin-panel.interfaces';

@Pipe({
  name: 'searchPosts',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim) {
      return posts
    }

    return posts
    // posts.filter((post) => {
    //   post.title.toLowerCase().includes(search.toLowerCase())
    // })
  }
}

