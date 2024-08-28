import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable()

export class HttpService {
  private baseUrl = 'https://httpbin.org/status';

  private http = inject(HttpClient);

  getStatus(status: number) {
    return this.http.get(`${this.baseUrl}/${status}`);
  }

}
