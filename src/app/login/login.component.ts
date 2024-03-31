import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { SVGIcon, eyeIcon } from '@progress/kendo-svg-icons';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @ViewChild('password') public passwordbox: TextBoxComponent | undefined;

  public eye: SVGIcon = eyeIcon;
  public form: FormGroup;
  public returnUrl: string = '';
  public loadingPanelVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public ngAfterViewInit(): void {
    if (this.passwordbox)
      this.passwordbox.input.nativeElement.type = 'password';
  }

  public async submit(): Promise<void> {
    this.form.markAllAsTouched();
    // Check for errors
    if (this.form.invalid) return;
    this.loadingPanelVisible = true;

    this.authService
      .login(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: () => {
          this.showError();
          this.loadingPanelVisible = false;
        },
        complete: () => {
          this.loadingPanelVisible = false;
        },
      });
  }

  public toggleVisibility(): void {
    if (this.passwordbox) {
      const inputEl = this.passwordbox.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    }
  }

  public showError(): void {
    this.notificationService.show({
      content: 'Login Invaid',
      cssClass: 'button-notification',
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'error', icon: true },
      hideAfter: 2000,
    });
  }
}
