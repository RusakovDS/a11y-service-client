import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthQuery } from "../state";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authQuery: AuthQuery,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // Redirect to home if already logged in
    this.authQuery.isLogin$.subscribe((isLogin) => (this.loading = isLogin));
  }

  ngOnInit(): void {
    this.reactiveForm();

    const userCreated = this.route.snapshot.queryParams.userCreated || false;
    if (userCreated) {
      this.snackBar.open("User was created!", "OK", {
        duration: 5000,
      });
    }

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || "/";
  }

  reactiveForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  errorHandling(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const formValues = this.loginForm.value;
    this.authService.login(formValues).subscribe(
      () => {
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        console.log(error);
        this.error = error;
        this.loading = false;
      }
    );
  }
}
