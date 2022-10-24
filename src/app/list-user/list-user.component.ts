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

  User!:User[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private httpData: HttpDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsers();

  ngOnInit(): void {

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
