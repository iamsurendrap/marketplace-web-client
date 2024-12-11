import { Component, Input, OnInit } from '@angular/core';
import { AuthDialogService } from '../../../services/auth-dialog.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../store/authentication/auth.actions';
import * as AuthSelectors from '../../../store/authentication/auth.selectors';
import { User } from '../../../store/authentication/user.model';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  @Input() isLoginView: boolean = true;

  displayDialog: boolean = false;
  user$: Observable<User | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  registerForm!: FormGroup;

  email: string = '';
  password: string = '';

  constructor(
    private authDialogService: AuthDialogService,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
  }

  ngOnInit() {
    this.authDialogService.openDialog$.subscribe((dialogState) => {
      this.displayDialog = dialogState.show;
      this.isLoginView = dialogState.isLoginView;
    });

    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, ]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  private clarkuEmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      if (email && !email.toLowerCase().endsWith('@clarku.edu')) {
        return { clarkuEmail: true };
      }
      return null;
    };
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      this.store.dispatch(AuthActions.signup({ firstName, lastName, email, password }));
    }
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  toggleAuthView() {
    this.isLoginView = !this.isLoginView;
    if (!this.isLoginView) {
      this.registerForm.reset();
    }
  }

  onLogin() {
    this.store.dispatch(AuthActions.login({ email: this.email, password: this.password }));
  }

  closeDialog() {
    this.authDialogService.closeDialog();
  }
}
