import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import { shared_classes } from '../../../api/model/shared.models'
import Address = shared_classes.Address;

@Injectable({
  providedIn: 'root'
})
export class ApiInterfaceService {

  http: HttpClient;
  api: string = environment.apiURL;
  addressURL: string = '/address'

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getAllAddress(): Array<any> {

    this.http.get<Array<Address>>(this.api);

    return null;
  }

}
