import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  isLoading: boolean = false;

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }
}
