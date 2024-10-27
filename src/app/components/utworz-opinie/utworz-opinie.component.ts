import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { AuthService } from '../../services/logowanie/auth.service';
import { OpiniaService } from '../../services/opinia/opinia.service';
import { Router } from '@angular/router';
import { OpiniaDTO } from '../../dto/OpiniaDTO';


@Component({
  selector: 'app-utworz-opinie',
  standalone: true,
  imports: [FormsModule, MatFormField, MatLabel, ReactiveFormsModule, MatOption, NgFor, MatSelect],
  templateUrl: './utworz-opinie.component.html',
  styleUrl: './utworz-opinie.component.css'
})
export class UtworzOpinieComponent implements OnInit{
  opiniaForm: FormGroup;
  oceny = [1, 2, 3, 4, 5]; 

  constructor(private fb: FormBuilder, private authService: AuthService,private opiniaService: OpiniaService, private router: Router) {
    this.opiniaForm = this.fb.group({
      ocena: [null, Validators.required],
      opis: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  wyslij() {
    const formData = this.opiniaForm.value;
    const opinia: OpiniaDTO = {
      autorId: + this.authService.getUserId()!,
      ocena: formData.ocena,
      opis: formData.opis
    }
    this.opiniaService.utworzOpinie(opinia).subscribe(
      (res: any) => {
        this.router.navigate(['/moje']);
      },
      (error) => {
        console.log(error, "errors")
      }
    )
  }

  wroc() {
    this.router.navigate(['/moje']);
  }
}
