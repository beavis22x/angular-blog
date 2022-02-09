import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostsService } from '../../shared/components/posts.service';
import { Subscription, switchMap } from 'rxjs';
import { FormConfigs, Post } from '../../utils/interfaces/admin-panel.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FIELD_FORM_CONSTS } from '../../utils/constants/form.consts';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit, OnDestroy{
  public subscription!: Subscription;
  public form!: FormGroup;
  public fieldFormConsts: FormConfigs = FIELD_FORM_CONSTS;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      }))
      .subscribe( (post: Post) => {
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
        this.cd.markForCheck();
      })
  }

  validCheck(fieldStr: string): boolean | undefined {
    return (this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid)
  }

  submit() {

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
