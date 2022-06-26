import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ISignUp } from 'src/app/models/signup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  IsAdmin : any;
  @ViewChild('surname') surnameInput: ElementRef;
  @ViewChild('firstname') firstnameInput: ElementRef;
  @ViewChild('phone') phoneInput: ElementRef;
  @ViewChild('email') emailInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;
  role: any;
  errorString = '';
  user: ISignUp;
  constructor(private router: Router, private loginService: AuthService) { }

  ngOnInit() {
    // if header role is not admin then navigate to /.
    if (this.loginService.getRole() !== 'Admin') {
      this.router.navigate(['/']);
    }
    if(this.loginService.getRole() === 'Admin'){
      this.IsAdmin = true;
    }
  }
  login() {
    let surname = this.surnameInput.nativeElement.value;
    let firstname = this.firstnameInput.nativeElement.value;
    let phone = this.phoneInput.nativeElement.value;
    let email = this.emailInput.nativeElement.value;
    let password = this.passwordInput.nativeElement.value;

    if (email === '' || password === '') {
      alert('Please Fill Out all fields');
    }
    this.user = {
      Surname: surname,
      Firstname: firstname,
      Phone: phone,
      Email: email,
      Password: password,
      Role: this.role
    };
    
    this.loginService.PostUser(this.user).subscribe(
      (res: any) => {
        this.errorString = 'Email Successfully Registered';
      },
      (err: any) => {
        this.errorString = err.error;
      }
    );
    }
    onChange(deviceValue : any) {
      this.role = (deviceValue.target.value);
  }
}
