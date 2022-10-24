import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/tusers';
import { HttpDataService } from '../services/http-data.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'store',
    'actions',
  ];

  dataSource = new MatTableDataSource<User>();

  Users!: User[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private httpData: HttpDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers() {
    this.httpData.getUsers().subscribe((data: User[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUser(id: number) {
    this.httpData.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((e: User) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('El usuario fue eliminado con exito!', '', {
        duration: 6000,
      });
    });
  }
}
