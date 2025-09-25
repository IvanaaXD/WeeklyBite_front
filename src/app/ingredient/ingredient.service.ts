import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../env/environment";
import { Observable } from "rxjs";
import { GetIngredient, CreateIngredient, IngredientWithQuantityDTO } from "./model/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient:HttpClient) {}

  private apiUrl = `${environment.apiHost}/api/ingredients`;

  add(ingredient: CreateIngredient): Observable<GetIngredient> {
    return this.httpClient.post<GetIngredient>(this.apiUrl, ingredient);
  }

  getIngredientsByWeek(weekId: number): Observable<IngredientWithQuantityDTO[]> {
    return this.httpClient.get<IngredientWithQuantityDTO[]>(`${this.apiUrl}/${weekId}`);
  }
}