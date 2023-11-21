import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class canViewLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    var values = JSON.parse(localStorage.getItem("user_account") as string);
    if (values) {
        return this.router.parseUrl('/home');
    }
    return true;
  }
}