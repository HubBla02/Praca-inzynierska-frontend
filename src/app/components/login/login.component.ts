import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/logowanie/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string | null = null;    
  constructor(private fb: FormBuilder, private authService: AuthService, 
    private router: Router ){
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      haslo: new FormControl('', Validators.required)
    });
    
  }

  onSubmit() {
    if (!this.form.invalid) {
      const { email, haslo } = this.form.value;

      this.authService.login({ email, haslo }).subscribe({
        next: (response) => {
          console.log('Otrzymana odpowiedź:', response);
          this.router.navigate(['/przegladaj']); 
        },
        error: (err) => {
          if (err.status === 401) {
            this.errorMessage = "Niepoprawny email lub hasło.";
          } else {
            this.errorMessage = 'Wystąpił błąd. Spróbuj ponownie później.';
          }
          console.error(err);
        }
      });
    }
  }
}