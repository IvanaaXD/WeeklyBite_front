import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../env/environment";
import { CreatedRecipe, CreateRecipe, GetRecipe } from "./model/recipe.model";
import { Observable } from "rxjs";
import { PagedResponse } from "../shared/paged-response.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient:HttpClient) {}

  private apiUrl = `${environment.apiHost}/api/recipe`;

  add(recipe: CreateRecipe, pictures?: File[]): Observable<CreatedRecipe> {
    const formData = new FormData();
    formData.append('recipe', new Blob([JSON.stringify(recipe)], { type: 'application/json' }));

    if (pictures && pictures.length > 0) {
      pictures.forEach((file: File) => {
        formData.append('pictures', file, file.name);
      });
    }

    return this.httpClient.post<CreatedRecipe>(this.apiUrl, formData);
  }

  update(recipe: CreateRecipe): Observable<CreatedRecipe> {
    return this.httpClient.put<CreatedRecipe>(this.apiUrl, recipe);
  }

  getRecipeById(id: number): Observable<GetRecipe> {
    return this.httpClient.get<GetRecipe>(`${this.apiUrl}/${id}`);
  }

  getTopFive(): Observable<GetRecipe[]> {
    return this.httpClient.get<GetRecipe[]>(this.apiUrl + `/top-five`);
  }

  getFilteredRecipes(filterParams: any, page: number, size: number): Observable<PagedResponse<GetRecipe>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
     const skip = new Set(['page', 'size']); 

    Object.keys(filterParams || {}).forEach(key => {
      if (skip.has(key)) return; 

      const value = filterParams[key];
      if (Array.isArray(value)) { 
        value
          .filter(v => v !== null && v !== undefined && v !== '')
          .forEach(v => params = params.append(key, String(v))); 
      } else if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value)); 
      }
    });

    return this.httpClient.get<PagedResponse<GetRecipe>>(this.apiUrl +'/filter', { params });
  }

  getAll(page: number, size: number): Observable<PagedResponse<GetRecipe>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.httpClient.get<PagedResponse<GetRecipe>>(this.apiUrl + '/paged', { params });
  }
}