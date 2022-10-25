import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/tusers';
import { HttpDataService } from '../services/http-data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  myForm!: FormGroup;

  constructor(

    private fb: FormBuilder,
    private httpdataService: HttpDataService,
    private snackBar: MatSnackBar,
    private router: Router
  )
   {}

  ngOnInit(): void {

    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(60)]],
      store: ['', [Validators.required]],
    });
  }

    saveUser(): void {
    const user: User = {
      id: 0,
      name: this.myForm.get('name')!.value,
      store: this.myForm.get('store')!.value,
    };
    this.httpdataService.addUser(user).subscribe({
      next: (data) => {
        this.snackBar.open('El usuario fue registrado con exito!', '', {
          duration: 6000,
        });
        this.router.navigate(['/UserList']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
