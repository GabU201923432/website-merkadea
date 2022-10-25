import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/tusers';
import { HttpDataService } from '../services/http-data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  myForm!: FormGroup;
  user!: User;
  idUser: any;

  constructor(

    private fb: FormBuilder,
    private httpDataService: HttpDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loadUser();
  }

  loadUser() {
    this.idUser = this.route.snapshot.paramMap.get('id');
    this.httpDataService.getUserId(this.idUser).subscribe((data) => {
      this.user = data;
      this.myForm = this.fb.group({
        id: this.idUser,
        name: [
          this.user.name,
          [Validators.required, Validators.maxLength(60)],
        ],
        store: [this.user.store, [Validators.required]],
      });
    });
  }

  updateUser(): void {
    const user: User = {
      id: this.idUser,
      name: this.myForm.get('name')!.value,
      store: this.myForm.get('store')!.value,

    };
    this.httpDataService
      .updateUser(this.idUser, user)
      .subscribe({
        next: (data) => {
          this.snackBar.open('El usuario fue actualizado con exito!', '', {
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
