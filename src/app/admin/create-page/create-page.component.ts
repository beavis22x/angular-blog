import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { PostsService } from '../../shared/components/posts.service';
import { AlertService } from '../shared/Services/alert.service';

import { Post } from '../../utils/interfaces/admin-panel.interfaces';

import { ALERT_MESSAGE_ENUM } from '../../utils/enum/alert-messages.enum';
import { FIELD_FORM_ENUM } from '../../utils/enum/form.enum';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent implements OnInit, OnDestroy{
  public form!: FormGroup;
  public postCreateSub!: Subscription;
  public fieldFormEnum = FIELD_FORM_ENUM;
  public alMessages = ALERT_MESSAGE_ENUM;

  constructor(
    private readonly postsService: PostsService,
    private alertService: AlertService
  ) { }

  public ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    })
  }

  public submit(): void {
    if (this.form.invalid) { return }

    const post: Post = {
      title: this.form.value?.title,
      author: this.form.value?.author,
      text: this.form.value?.text,
      date: new Date()
    }

    this.postCreateSub = this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.alertService.success(this.alMessages.success);
    })
  }

  public checkValid(fieldStr: string): boolean | undefined {
    return (this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }

  public ngOnDestroy(): void {
      this.postCreateSub?.unsubscribe();
  }
}


