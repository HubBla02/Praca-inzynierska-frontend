import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RejestracjaDto } from '../../dto/RejestracjaDto';
import { KontoService } from '../../services/konto/konto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-rejestracja',
  standalone: true,
  imports: [RouterModule, 
    ReactiveFormsModule, 
    NgIf,     
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,],
  templateUrl: './rejestracja.component.html',
  styleUrl: './rejestracja.component.css'
})
export class RejestracjaComponent {
  form: FormGroup;
  showTermsError: boolean = false;
  user: RejestracjaDto = {
    email: '',
    haslo: '',
    powtorzHaslo: '',
    dataUrodzenia: new Date(),
    imie: '',
    nazwisko : '',
    rolaId: 1
  }

  constructor(private fb: FormBuilder, private kontoService: KontoService, private router: Router, private snackbar: MatSnackBar){
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      haslo: new FormControl('', [Validators.required, Validators.minLength(6)]),
      pHaslo: new FormControl('', Validators.required),
      imie: new FormControl('', Validators.required),
      nazwisko: new FormControl('', Validators.required),
      dUrodzenia: new FormControl(null, [Validators.required, this.ageValidator]),
      terms: new FormControl(false, Validators.requiredTrue),
    }, { validators: this.passwordMatchValidator });
  }

  ageValidator(control: FormControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18 ? null : { ageInvalid: true };
  }
  
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('haslo')?.value;
    const confirmPassword = formGroup.get('pHaslo')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  

  onSubmit(){
    console.log(this.form.value.dUrodzenia);
    if (!this.form.invalid){
      this.user.email = this.form.value.email;
      this.user.haslo = this.form.value.haslo;
      this.user.powtorzHaslo = this.form.value.pHaslo;
      this.user.dataUrodzenia = this.form.value.dUrodzenia;
      this.user.imie = this.form.value.imie;
      this.user.nazwisko = this.form.value.nazwisko;
      this.kontoService.zarejestruj(this.user).subscribe({
        next: (response) => {
          this.snackbar.open('Sukces!', 'OK', {
            duration: 1000
          });
          this.router.navigate(['/logowanie']);
        },
        error: (error) => {
          console.error('Error during registration:', error);
        }
      });
    }
    else {
      this.showTermsError = !this.form.get('terms')?.value;
    }
  }

}
