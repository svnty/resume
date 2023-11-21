import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class CanActivateApp implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    var values = JSON.parse(localStorage.getItem("user_account") as string);
    if (values) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}