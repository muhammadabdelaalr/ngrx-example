import { Injectable, Signal, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  isLoading = signal(false);

  showLoading() {
    this.isLoading.set(true);
  }

  hideLoading() {
    this.isLoading.set(false);
  }
}
