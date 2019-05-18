import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UniversidadesServices {

    constructor(private http: Http) {

    }

    consultarUniversidades(name = '', country='') {
        let url = 'http://universities.hipolabs.com/search?name=' + name + '&country=' + country.toString().trim().replace(' ', '%20') + '';
        console.log(url);
        return this.http.get(url).pipe(map(res => res.json()));
    }


    consultarPais(latitude: any, longitude: any) {
        let url = `http://api.geonames.org/findNearbyPlaceNameJSON?username=davidz1113&lat=${latitude}&lng=${longitude}`;

        return this.http.get(url).pipe(map(res => res.json()));
    }

}