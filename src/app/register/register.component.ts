import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { SVGIcon, eyeIcon } from '@progress/kendo-svg-icons';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('password') public passwordbox: TextBoxComponent | undefined;
  @ViewChild('confirmPassword') public confirmPasswordbox:
    | TextBoxComponent
    | undefined;

  public eye: SVGIcon = eyeIcon;
  public form: FormGroup;
  public returnUrl: string = '';

  private confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return this.form?.value.password === control.value
      ? null
      : { PasswordNoMatch: true };
  };

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.confirmPasswordValidator,
      ]),
    });
  }

  public ngAfterViewInit(): void {
    if (this.passwordbox)
      this.passwordbox.input.nativeElement.type = 'password';

    if (this.confirmPasswordbox)
      this.confirmPasswordbox.input.nativeElement.type = 'password';
  }

  public toggleVisibility(element: string): void {
    if (element === 'password' && this.passwordbox) {
      const inputEl = this.passwordbox.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    }

    if (element === 'confirmPassword' && this.confirmPasswordbox) {
      const inputEl = this.confirmPasswordbox.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    }
  }

  public showError(errorMessage: string): void {
    this.notificationService.show({
      content: errorMessage,
      cssClass: 'button-notification',
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'error', icon: true },
      hideAfter: 2000,
    });
  }

  public async submit(): Promise<void> {
    this.form.markAllAsTouched();
    // Check for errors
    if (this.form.invalid) return;

    this.authService
      .register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.authService
            .login(this.form.value)
            .pipe(first())
            .subscribe({
              next: () => {
                this.router.navigateByUrl(this.returnUrl);
              },
              error: (error) => this.showError(error.errors[0]),
            });
        },
        error: (res) => {
          var message = 'Could not log you on at this time';
          if ('error' in res) {
            console.log(res.error);
          }
          this.showError(message);
        },
      });
  }
}
