import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth'; // Asegúrate que la ruta sea correcta
import { Logo } from '../../../shared/components/logo/logo';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Logo],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['20111193035', [Validators.required]],
    password: ['61a77b6fda77c3a2d6b28930546c86d7f749ccf0bd4bad1e1192f13bb59f0f30', [Validators.required]]
  });

  errorMessage: string = '';
  isLoading: boolean = false;

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.authService.login(username.trim(), password.trim()).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);

        // 1. ALMACENAR EL TOKEN
        // Verificamos si viene 'access_token' (estándar OAuth) o 'token'
        const token = res.access_token || res.token;

        if (token) {
            localStorage.setItem('auth_token_efact', token);
            // Opcional: Guardar expiración si la necesitas
            // localStorage.setItem('expires_in', res.expires_in);
        }

        this.isLoading = false;

        // 2. REDIRIGIR AL DASHBOARD
        this.router.navigate(['/documents/dashboard']);
      },
      error: (err) => {
        console.error('Error login:', err);
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = 'Credenciales incorrectas.';
        } else {
          this.errorMessage = 'Error de conexión con el servidor.';
        }
      }
    });
  }
}
