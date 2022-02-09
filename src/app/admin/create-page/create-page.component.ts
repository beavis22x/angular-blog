import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormConfigs, Post } from '../../utils/interfaces/admin-panel.interfaces';
import { PostsService } from '../../shared/components/posts.service';
import { FIELD_FORM_CONSTS } from '../../utils/constants/form.consts';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent implements OnInit{
  public form!: FormGroup;
  public fieldFormConsts: FormConfigs = FIELD_FORM_CONSTS;

  constructor(private readonly postsService: PostsService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    })
  }

  public submit(): void {
    if (this.form.invalid) { return }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    }

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
    })
  }

  validCheck(fieldStr: string): boolean | undefined {
    return (this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid)
  }
}


