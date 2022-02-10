import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostsService } from '../../shared/components/posts.service';
import { Subscription, switchMap } from 'rxjs';
import { FormConfigs, Post } from '../../utils/interfaces/admin-panel.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FIELD_FORM_CONSTS } from '../../utils/constants/form.consts';
import { Alert, AlertService } from '../shared/Services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit, OnDestroy{
  public subscriptions: Subscription = new Subscription();
  public post!: Post;
  public submitted = false;
  public form!: FormGroup;
  public fieldFormConsts: FormConfigs = FIELD_FORM_CONSTS;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const postSubscr$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      }))
      .subscribe( (post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
        this.subscriptions.add(postSubscr$);
        this.cd.markForCheck();
      })
  }

  validCheck(fieldStr: string): boolean | undefined {
    return (this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }

  submit() {
    if (this.form.invalid) { return }

    this.submitted = true;
    const updSubscr$ = this.postsService.update({
      ...this.post,
      text: this?.form?.value?.text,
      title: this?.form?.value?.title
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.success('Пост был изменен');
    })
    this.subscriptions.add(updSubscr$);
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
