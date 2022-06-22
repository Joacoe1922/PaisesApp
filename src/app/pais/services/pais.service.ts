import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private apiUrlV2: string = 'https://restcountries.com/v2'; 

  get httpParams() {
    return new HttpParams()
      .set('fields', 'name,capital,alpha3Code,flags,population');
  }

  constructor( private http: HttpClient) { }
  
  buscarPais( termino: string ): Observable<Country[]> {
    const url = `${ this.apiUrlV2 }/name/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }

  buscarCapital( termino: string ): Observable<Country[]> {
    const url = `${ this.apiUrlV2 }/capital/${ termino }`
    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }

  
  getPaisPorId( id: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/alpha/${ id }`
    return this.http.get<Country[]>( url );
  }

  buscarRegion( region: string): Observable<Country[]> {    
    const url = `${ this.apiUrlV2 }/regionalbloc/${ region }`
    return this.http.get<Country[]>( url, { params: this.httpParams } )
      .pipe(
        tap( console.log )
      )
  }
}
