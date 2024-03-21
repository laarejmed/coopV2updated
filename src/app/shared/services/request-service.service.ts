import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {RequestModel} from '../models/request-model';
import { StatusModel } from '../models/status-model';

@Injectable({
  providedIn: 'root',
})
export class RequestServiceService {
  readonly baseUrl = environment.apiUrl;

  request: RequestModel;
  progressNumber : number;

  constructor(private http: HttpClient) {
    this.request = new RequestModel();
    this.progressNumber = 0;
  }

  setRequest(request: RequestModel): Observable<RequestModel> {
    return this.http.post<RequestModel>(this.baseUrl + 'request/add', request);
  }

  getRequests(pageNumber: number, pageSize: number): Observable<GetRequestResponse> {
    return this.http.get<GetRequestResponse>(this.baseUrl + 'request?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  getRequestsByUser(userId: string, pageNumber: number, pageSize: number): Observable<GetRequestResponse> {
    return this.http.get<GetRequestResponse>(this.baseUrl + 'request/user/' + userId + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  searchRequest(value: string): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(this.baseUrl + `request/${value}`);
  }
  FilterRequest(value: StatusModel, pageNumber: number, pageSize: number): Observable<GetRequestResponse> {
    return this.http.get<GetRequestResponse>(this.baseUrl + 'request/filter/' + value + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  validateRequests(requestList: Array<number>): Observable<RequestModel[]> {
    return this.http.post<RequestModel[]>(
      this.baseUrl + 'request/validate',
      requestList
    );
  }

  rejectRequests(requestList: Array<number>): Observable<RequestModel[]> {
    return this.http.post<RequestModel[]>(
      this.baseUrl + `request/reject`,
      requestList
    );
  }

  deleteRequests(requestList: Array<number>): Observable<RequestModel[]> {
    return this.http.post<RequestModel[]>(
      this.baseUrl + 'request/delete',
      requestList
    );
  }
  setProgressNumber(count: number) {
    this.progressNumber = count;
  }
  getProgressNumber() {
    return this.progressNumber;
  }
  getProgressRequests(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `request/progress/list`);
  }
}

interface GetRequestResponse {
  response: {
    request: RequestModel[];
  },
  pagination: {
    pageNumber: number,
    pageSize: number,
    totalRecords: number
  };
}

