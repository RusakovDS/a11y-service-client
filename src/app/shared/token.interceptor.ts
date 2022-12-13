import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthQuery, AuthStore } from "../modules/auth/state";
import { Injectable } from "@angular/core";
import { AuthService } from "../modules/auth/auth.service";
import { catchError } from "rxjs/operators";
import { resetStores } from "@datorama/akita";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authStore: AuthStore,
    private authQuery: AuthQuery,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authQuery.hasToken) {
      const request = this.setAuthorizationHeader(req);
      return next.handle(request).pipe(
        catchError((error: HttpResponse<any>) => {
          if (error.status === 401 && !error.url.includes("auth/login")) {
            this.authService.refreshToken().subscribe(
              (success) => {
                return next
                  .handle(this.setAuthorizationHeader(req))
                  .subscribe(() => location.reload());
              },
              (err) => {
                if (
                  err.status === 400 &&
                  err.error.message === "Token does not exists"
                ) {
                  resetStores();
                  return next.handle(req);
                }
              }
            );
          } else {
            return throwError(error);
          }
        })
      );
    }
    return next.handle(req);
  }

  setAuthorizationHeader(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authStore.getValue().accessToken}`,
      },
    });
  }
}
