import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { AuthQuery } from "../state";
import { AuthService } from "../auth.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.hasError("notSame") &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  loading = false;
  hide = true;
  error = "";

  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authQuery: AuthQuery
  ) {
    // Redirect to home if already logged in
    this.authQuery.isLogin$.subscribe((isLogin) => {
      if (isLogin) {
        this.router.navigate(["/"]);
      }
    });
  }

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.registerForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: [""],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  errorHandling(control: string, error: string) {
    return this.registerForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const formValues = this.registerForm.value;
    this.authService.register(formValues).subscribe(
      () => {
        this.router.navigate(["/auth/login"], {
          queryParams: { userCreated: true },
        });
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
