import { Component } from '@angular/core';
import { Uzytkownik } from '../../dto/Uzytkownik';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { UzytkownikService } from '../../services/uzytkownik/uzytkownik.service';

@Component({
  selector: 'app-uzytkownicy',
  standalone: true,
  templateUrl: './uzytkownicy.component.html',
  styleUrls: ['./uzytkownicy.component.css'],
  imports: [NgFor, NgIf, DatePipe],
})
export class UzytkownicyComponent {
  users: Uzytkownik[] = [];
  userblock: Uzytkownik | null = null;
  userAdmin: Uzytkownik | null = null;

  showDeleteModal: boolean = false; 
  userIdToDelete: number | null = null;

  constructor(private userService: UzytkownikService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data: Uzytkownik[]) => {
        this.users = data;
        this.sort();
      },
      (error: any) => {
        console.error('Error loading users', error);
      }
    );
  }

  sort(){
    this.users.sort((a, b) => a.id - b.id);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers();
        this.userService.emitUserChanged();
      },
      (error) => {
        console.error('Error while deleting user', error);
      }
    )
  }

  toggleAdmin(userId: number){
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.userAdmin = user;
        if (this.userAdmin !== null){
          if (this.userAdmin.rolaId === 1){
            this.userAdmin.rolaId = 2
          }
          else {
            this.userAdmin.rolaId = 1;
          }
          this.userService.updateUser(userId, this.userAdmin).subscribe(
            () => {
              this.loadUsers();
              this.userService.emitUserChanged();
            },
            (error) => {
              console.error("Error while completing edition.")
            }
          )
        }
      },
      (error) => {
        console.error("Error editing user.")
      }
    )
  }

  toggleBlock(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.userblock = user;
        if (this.userblock !== null){
          if (this.userblock.czyZablokowany === true){
            this.userblock.czyZablokowany = false
          }
          else {
            this.userblock.czyZablokowany = true;
            this.userblock.czyTrzezwy = false;
          }
          this.userService.updateUser(userId, this.userblock).subscribe(
            () => {
              this.loadUsers();
              this.userService.emitUserChanged();
            },
            (error) => {
              console.error("Error while completing edition.")
            }
          )
        }
      },
      (error) => {
        console.error("Error editing user.")
      }
    )
  }

  openDeleteModal(userId: number) {
    this.userIdToDelete = userId;
    this.showDeleteModal = true;
  
  
  }

  closeDeleteModal() {
    if (this.userIdToDelete !== null){
      this.userIdToDelete = null;
    }
    this.showDeleteModal = false; 
  }

  confirmDelete(){
    this.showDeleteModal = false; 
    this.deleteUser(this.userIdToDelete!);
  }

}

