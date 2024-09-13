import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/logowanie/auth.service';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const expectedRole = route.data['expectedRole'];

    return this.authService.getUserRole().pipe(
      map(userRole => {
        if (userRole === expectedRole) {
          return true; 
        }

        this.router.navigate(['/nie-znaleziono-strony']);
        return false;
      })
    );
  }
}