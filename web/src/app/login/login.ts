import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from './actions';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  title = 'Login';
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private store: Store<{ login: number }>) {}

  submitLogin() {
    if (this.loginForm.valid) {
      this.loading = true;

      fetch("http://localhost:3000/login", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
          email: this.loginForm.controls['email'].value, 
          password: this.loginForm.controls['password'].value
        })
      })
      .then((res) => res.json()).then((data) => {
        localStorage.setItem('user_account', JSON.stringify(data.user_account));
        this.loading = false;
        console.log(data.user_account);
        this.store.dispatch(login());
        this.router.navigateByUrl('/home');
      })
      .catch((res) => { 
        console.log(res);
        this.loading = false;
        alert(res);
      });
    }
  }
}
