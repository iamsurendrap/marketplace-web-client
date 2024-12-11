import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Ad } from '../../models/ad.model';
import { loadAdById, updateAd } from '../../store/actions/ad-item.actions';
import { selectAdLoading, selectSelectedAd } from '../../store/selectors/ad-item.selectors';
import { Category } from 'src/app/store/category/category.model';
import * as fromCategory from '../../../../store/category/category.selectors';
import { selectAuthLoading } from 'src/app/store/authentication/auth.selectors';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit {
  detailsForm!: FormGroup;
  uploadedFiles: any[] = [];
  responsiveOptions: any[];
  categories$: Observable<Category[]>;
  adId!: string;
  isUserLoading$: Observable<boolean>;
  isupdatingLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categories$ = this.store.select(fromCategory.selectAllCategories);

    this.isUserLoading$ = this.store.select(selectAuthLoading);
    this.isupdatingLoading$ = this.store.select(selectAdLoading);
    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
      { breakpoint: '768px', numVisible: 2, numScroll: 2 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ];
  }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      category: ['', Validators.required],
      price: [null, Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.adId = params.get('id')!;
      this.store.dispatch(loadAdById({ id: this.adId }));
      this.store.select(selectSelectedAd).subscribe((ad) => {
        if (ad) {
          this.detailsForm.patchValue({
            title: ad.title,
            description: ad.description,
            category: ad.category,
            price: ad.price,
          });

          this.uploadedFiles = ad.imageURLs.map((url) => ({
            name: url.split('/').pop(),
            objectURL: url,
          }));
        }
      });
    });
  }

  getFormControl(name: string): AbstractControl | null {
    return this.detailsForm.get(name);
  }

  onSelectFiles(event: any) {
    for (let file of event.files) {
      if (!this.uploadedFiles.some(f => f.name === file.name)) {
        this.uploadedFiles.push({
          name: file.name,
          size: file.size,
          objectURL: file.objectURL || URL.createObjectURL(file),
          originalFile: file
        });
      }
    }
  }

  onRemoveFile(event: any) {
    this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== event.file.name);
  }

  onSubmit() {
    const newFiles = this.uploadedFiles.filter(file => file.originalFile instanceof File).map(file => file.originalFile);

    const listing = {
      _id: this.adId,
      title: this.detailsForm.value.title,
      description: this.detailsForm.value.description,
      category: this.detailsForm.value.category,
      price: this.detailsForm.value.price,
      imageURLs: this.uploadedFiles.filter(file => typeof file.objectURL === 'string').map(file => file.objectURL),
      newFiles: newFiles
    };

    this.store.dispatch(updateAd({ listing }));
  }


  canProceedToNextStep(currentStep: number): boolean {
    if (currentStep === 0) {
      return this.detailsForm.valid;
    }
    if (currentStep === 1) {
      return this.uploadedFiles.length > 0;
    }
    return true;
  }
}
