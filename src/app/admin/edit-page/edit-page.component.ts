import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription, switchMap } from 'rxjs';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PostsService } from '../../shared/components/posts.service';
import { AlertService } from '../shared/Services/alert.service';

import { FormConfigs, Post } from '../../utils/interfaces/admin-panel.interfaces';

import { ALERT_MESSAGE_ENUM } from '../../utils/enum/alert-messages.enum';

import { FIELD_FORM_ENUM } from '../../utils/enum/form.enum';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription = new Subscription();
  public post!: Post;
  public submitted = false;
  public form!: FormGroup;
  public fieldFormEnum = FIELD_FORM_ENUM;
  public alMessages = ALERT_MESSAGE_ENUM;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService
  ) {
  }

  public ngOnInit(): void {
    this.initEditPost();
  }

  private initEditPost(): void {
    this.subscriptions.add(this.route.params.pipe(
      switchMap(({ id }: Params) => {
        return this.postsService.getById(id);
      }))
      .subscribe((post: Post) => {
        this.post = post;
        this.initForm(post);

        this.cd.markForCheck();
      }));
  }

  private initForm(post: Post): void {
    this.form = new FormGroup({
      title: new FormControl(post.title, Validators.required),
      text: new FormControl(post.text, Validators.required)
    })
  }

  public submit(): void {
    if (this.form.invalid) {
      return
    }

    this.submitted = true;
    this.subscriptions.add(this.postsService.update({
      ...this.post,
      text: this.form.value?.text,
      title: this.form.value?.title
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.warning(this.alMessages.warning);

      this.cd.markForCheck();
    }));
  }

  public checkValid(fieldStr: string): boolean | undefined {
    return (this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
