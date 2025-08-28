import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../env/environment";
import { Observable } from "rxjs";
import { GetIngredient, CreateIngredient } from "./ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient:HttpClient) {}

  private apiUrl = `${environment.apiHost}/api/ingredient`;

  add(ingredient: CreateIngredient): Observable<GetIngredient> {
    return this.httpClient.post<GetIngredient>(this.apiUrl, ingredient);
  }
}