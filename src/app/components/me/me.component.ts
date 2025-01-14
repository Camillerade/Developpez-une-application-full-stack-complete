import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  public user: User | undefined;

  constructor(private router: Router,
              private sessionService: SessionService,
              private matSnackBar: MatSnackBar,
              private userService: UserService) {
  }

  public ngOnInit(): void {
    const userId = this.sessionService.getUserId();
    if (userId !== undefined) {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      });
    }
  }

  public back(): void {
    window.history.back();
  }

  public delete(): void {
    if (this.user) {
      this.userService.deleteUser(this.user.id).subscribe(
        () => {
          this.matSnackBar.open('User deleted successfully', 'Close', {
            duration: 3000,
          });
          this.sessionService.logOut();
          this.router.navigate(['/']);
        },
        error => {
          this.matSnackBar.open('Failed to delete user', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
