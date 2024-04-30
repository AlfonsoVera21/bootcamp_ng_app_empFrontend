import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empleado, IDataEmpleado } from './interface/IDataEmpleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  apiUrl: string = environment.apiUrl;
  empleadoUrl: string = `${this.apiUrl}/empleado`;
  resultado: Empleado[] = [];
  totalRegistros: number =0;
  registrosPorPagina: number = 0;

  constructor(private http:HttpClient) { }

  listarEmpleado(pagina:number =0, size:number=4){
    const params = new HttpParams()
                  .set('PagesNumber',pagina)
                  .set('PageSize',size)
    this.http.get<IDataEmpleado>(this.empleadoUrl,{params:params})
                .subscribe(resp => {
                  this.resultado = resp.resultado;
                  this.totalRegistros = resp.totalRegistros;
                  this.registrosPorPagina = resp.pageSize;
                })
  }
}
