import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ZgloszenieService } from '../../services/zgloszenie/zgloszenie.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ZgloszenieDTO } from '../../dto/ZgloszenieDTO';
import { AuthService } from '../../services/logowanie/auth.service';

@Component({
  selector: 'app-utworz-zgloszenie',
  standalone: true,
  imports: [FormsModule, MatFormField, MatLabel, ReactiveFormsModule],
  templateUrl: './utworz-zgloszenie.component.html',
  styleUrl: './utworz-zgloszenie.component.css'
})
export class UtworzZgloszenieComponent {
  form: FormGroup;
  email: string = '';

  constructor(private fb: FormBuilder, private router: Router, private zgloszenieService: ZgloszenieService, private authService: AuthService) {
    this.form = this.fb.group({
      tytul: [''],
      tresc: ['']
    });
  }

  wyslij() {
    const formData = this.form.value;
    this.email = this.authService.getUserEmail()!;
    const zgloszenie: ZgloszenieDTO = {
      email: this.email,
      tytul: formData.tytul,
      tresc: formData.tresc
    }
    this.zgloszenieService.utworzZgloszenie(zgloszenie).subscribe(
      (res: any) => {
        this.router.navigate(['/zgloszenia/moje']);
      },
      (error) => {
        console.log(error, "errors")
      }
    )
  }

  wroc() {
    this.router.navigate(['/zgloszenia/moje']);
  }
}
