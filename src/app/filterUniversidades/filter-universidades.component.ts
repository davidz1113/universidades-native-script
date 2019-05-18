import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { Router } from '@angular/router';
import { TextField } from 'tns-core-modules/ui/text-field';
import { UniversidadesServices } from '../servicios/universidades.services';
import { getCurrentLocation, isEnabled, enableLocationRequest, watchLocation, distance, clearWatch } from 'nativescript-geolocation';
import * as Dialogs from 'tns-core-modules/ui/dialogs';

@Component({
    selector: 'app-filter-universidades',
    moduleId: module.id,
    templateUrl: './filter-universidades.component.html'
})
export class FilterUniversidadesComponent implements OnInit {
    items: any[] = [];
    ubicacion: string;
    ngOnInit() {
        this.permitirLocalizacion();
    }

    constructor(private page: Page, private _universidadService: UniversidadesServices) {

    }

    buscar() {
        let textFilter = this.page.getViewById<TextField>('textFilter');
        this._universidadService.consultarUniversidades(textFilter.text, this.ubicacion).subscribe(
            response => {
                this.items = response;
            },
            error => {
                console.log("Error en el servidor al consultar los datos.", error);
            }
        )
    }

    buscarUbicacion() {


        getCurrentLocation({ desiredAccuracy: 3 }).then(
            location => {
                let latitude = location.latitude;
                let longitude = location.longitude;
                this._universidadService.consultarPais(latitude, longitude).subscribe(
                    response => {
                        let options: Dialogs.PromptOptions = {
                            title: "Su ubicación actual:" + response.geonames[0].countryName,
                            okButtonText: "Utilizar mi ubicación actual",
                            cancelButtonText: "Buscar por todo el mundo",
                        }

                        Dialogs.prompt(options).then((result: Dialogs.PromptResult) => {
                            if (result.result) {
                                this.ubicacion = response.geonames[0].countryName;
                                console.log(this.ubicacion);
                            } else {
                                this.ubicacion = '';
                                console.log('cancel');
                            }
                        });

                    },
                    error => {
                        console.log("error al obtener la ubicacion actual", error);
                    }
                );
            },
            err => {
                console.log("error al obtener la ubicacion");
            }
        )
    }


    permitirLocalizacion() {
        if (!isEnabled) {
            enableLocationRequest();
        }
    }
}