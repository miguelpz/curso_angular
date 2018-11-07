import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ProductoService} from '../services/producto.service';
import { Producto } from '../models/producto';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'producto-detail',
  templateUrl: '../views/producto-detail.html',
  providers:[ProductoService]
})

export class ProductoDetailComponent {
	public producto: Producto;

 	constructor (
 		private _route: ActivatedRoute,
 		private _router: Router,
 		private _productoService: ProductoService
 	){
 		
 	}	
    
    ngOnInit(){
  	
  		console.log ("Se ha cargado el componente producto-detail-component");
      this.getProducto();
  	}

    getProducto() {
        this._route.params.forEach((params:Params) => {
        let id = params ['id'];
      
        this._productoService.getProducto(id).subscribe(
          res => {
            if (res.code == 200) {
              this.producto = res.data;            
            } else {
              this._router.navigate(['/productos']);
            }
          },
          error => {
            console.log (<any>error);
          }
        );  
      });
    }
}