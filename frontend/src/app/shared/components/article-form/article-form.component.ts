import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { McBackendErrorMessagesComponent } from "../mc-backend-error-messages/mc-backend-error-messages.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [McBackendErrorMessagesComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css'
})
export class ArticleFormComponent implements OnInit{
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorsInterface | null = null;
  
  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: ''
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    if(!this.initialValues) {
      throw new Error('Inputs are not provided');
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    })
  }

  onSubmit(): void {
    const articleFormValues: ArticleFormValuesInterface = {
      ...this.form.getRawValue(),
      tagList: this.form.getRawValue().tagList.split(' ')
    }
    this.articleSubmit.emit(articleFormValues);
  }
}
