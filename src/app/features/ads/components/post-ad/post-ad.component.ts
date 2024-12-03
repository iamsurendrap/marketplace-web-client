import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/store/category/category.model';
import * as fromCategory from '../../../../store/category/category.selectors';
import * as categoryActions from '../../../../store/category/category.actions';
import { CarouselResponsiveOptions } from 'primeng/carousel';
import * as ListingActions from '../../../../store/post-ad/post-ad.actions'
import { Owner } from '../../models/ad.model';


@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.scss']
})
export class PostAdComponent implements OnInit {
  detailsForm!: FormGroup;
  uploadedFiles: any[] = [];

  galleriaResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  categories$: Observable<Category[]>;
  responsiveOptions: CarouselResponsiveOptions[];

  constructor(private fb: FormBuilder, private store: Store) {
    this.categories$ = this.store.select(fromCategory.selectAllCategories);
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

  }

  ngOnInit() {
    this.detailsForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      category: ['', Validators.required],
      price: [null, Validators.required]
    });

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
    console.log('Current uploaded files:', this.uploadedFiles);
  }



  onRemoveFile(event: any) {
    this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== event.file.name);
    console.log('Files after removal:', this.uploadedFiles);
  }

  // This method can be called when navigating between steps
  onStepChange(event: any) {
    console.log('Step changed. Current files:', this.uploadedFiles);
  }


  getCategoryName(categoryId: number): string {
    return 'Category Name';
  }

  onSubmit() {
    if (this.detailsForm.valid && this.uploadedFiles.length > 0) {
      const listing = {
        ...this.detailsForm.value,
      };
      listing.owner = "6710321e0ff66d29ce4f8370";
      const files = this.uploadedFiles.map(file => file.originalFile);
      console.log('Dispatching createListing action', { listing, files });
      this.store.dispatch(ListingActions.createListing({ listing, files }));
    } else {
      console.log('Form is invalid or no files uploaded');
    }
  }

  // Helper method to safely get form control
  getFormControl(name: string): AbstractControl | null {
    return this.detailsForm.get(name);
  }

  onCategoryChange(event: any) {
    console.log('Selected category:', event.value);
    // You can perform any additional actions here when the category changes
  }


  canProceedToNextStep(currentStep: number): boolean {
    switch (currentStep) {
      case 0: // Details step
        return this.detailsForm.valid;
      case 1: // Images step
        return this.uploadedFiles.length > 0;
      default:
        return true;
    }
  }
}
