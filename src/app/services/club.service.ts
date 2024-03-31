import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IClub } from '../common/IClub';
import { PagedResponse } from '../common/IPagedResponse';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  constructor(private http: HttpClient) {}

  getAllClubs(skip: number, take: number) {
    var params = {
      skip,
      take,
    };
    return this.http.get<PagedResponse<IClub>>(
      `${environment.API_URL}/api/clubs`,
      { params }
    );
  }

  remove(id: number): any {
    return this.http.delete(`${environment.API_URL}/api/club/${id}`);
  }

  save(data: IClub, isNew?: boolean): any {
    return isNew
      ? this.http.post<number>(`${environment.API_URL}/api/club`, data)
      : this.http.put<number>(
          `${environment.API_URL}/api/club/${data.id}`,
          data
        );
  }
}
