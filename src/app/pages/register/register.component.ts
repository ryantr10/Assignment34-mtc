import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form = {
    name: '',
    email: '',
    password: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.register(this.form).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully';
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed';
        console.error(error);
      }
    });
  }
}
