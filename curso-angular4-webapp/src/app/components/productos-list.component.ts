import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ProductoService} from '../services/producto.service';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Component({
  selector: 'productos-list',
  templateUrl: '../views/productos-list.html',
  providers:[ProductoService]
})

export class ProductosListComponent {
	
 	public titulo: string;
 	public productos: Producto[];
  public confirmado;

 	constructor (
 		private _route: ActivatedRoute,
 		private _router: Router,
 		private _productoService: ProductoService
 	){
 		this.titulo = 'Listado de productos';
    this.confirmado = null;

 	}	
    
    ngOnInit(){
  	
  		console.log ("Se ha cargado el componente app.component.ts");
      this.getProductos();
  		
  }

  borrarConfirm (id){
    this.confirmado = id;
  }

  cancelarConfirm (id){
    this.confirmado = null;
  }

  getProductos() {
    this._productoService.getProductos().subscribe(
        result => {
          if (result.code !=200){
            console.log(result);
          }else{
            this.productos= result.data;
          }

        },
        error => {
          console.log (<any>error);

        }

      );
  }

  onDeleteProducto (id) {
    this._productoService.deleteProducto(id).subscribe (
        response =>{
          if (response.code == 200) {
          this.getProductos();
          } 
        },
        error => {
          console.log (<any>error);
        }
    );
  }
}