import { Component } from '@angular/core';

  import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors,
  } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {}
 function nomeSemNumeros(control: AbstractControl): ValidationErrors | null {

    const valor = control.value;

    if (!valor) return null;

    if (/\d/.test(valor)) {
      return { numeroInvalido: true };
    }

    return null;
  }
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), nomeSemNumeros]),
    email: new FormControl('', [Validators.required, Validators.email]),
    endereco: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
 

