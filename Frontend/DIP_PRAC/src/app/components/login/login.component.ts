import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorString = '';
  role :any;
  user: ILogin;
  @ViewChild('email') emailInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;
  constructor(private router: Router, private loginService: AuthService) { }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

  }
  login() {
    let email = this.emailInput.nativeElement.value;
    let password = this.passwordInput.nativeElement.value;

    if (email === '' || password === '') {
      alert('Please Fill Out all fields');
    }
    this.user = {
      Email: email,
      Password: password,
    };
    
    this.loginService.Login(this.user).subscribe(
      (res: any) => {
        this.loginService.setToken(res['token']);

      this.role=(res['owner']['Role']);
      this.loginService.setRole(this.role);

        this.router.navigate(['/']);
      },
      (err: any) => {
        this.errorString = this.errorString = err.error;
      }
    );
  }
  
}