import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ad-details-form',
  templateUrl: './ad-details-form.component.html',
  styleUrls: ['./ad-details-form.component.scss']
})
export class AdDetailsFormComponent implements OnInit {
  @Input() adDetails: { title: string; description: string; category: string } | null = null;
  @Output() submitDetails = new EventEmitter<{ title: string; description: string; category: string }>();

  detailsForm: FormGroup;
  categories: any[] = []; // You should populate this with your actual categories

  constructor(private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.adDetails) {
      this.detailsForm.patchValue(this.adDetails);
    }
    // Populate categories here, e.g., from a service
    this.categories = [
      { name: 'Electronics', value: 'electronics' },
      { name: 'Furniture', value: 'furniture' },
      { name: 'Clothing', value: 'clothing' }
    ];
  }

  onSubmit() {
    if (this.detailsForm.valid) {
      this.submitDetails.emit(this.detailsForm.value);
    }
  }
}