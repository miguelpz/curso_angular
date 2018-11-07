import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ProductoService} from '../services/producto.service';
import { Producto } from '../models/producto';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'producto-add',
  templateUrl: '../views/productos-add.html',
  providers:[ProductoService]
})

export class ProductoAddComponent {
	
 	public titulo: string;
 	public producto: Producto;
 	public filesToUpload;
  	public resultUpload;
  	
 	

 	constructor (
 		private _productoService:ProductoService,
 		private _route: ActivatedRoute,
 		private _router: Router
 		){
 		this.titulo = 'Crear un nuevo producto';
 		this.producto = new Producto (0,'','',0,'');

 	}	
    
  ngOnInit(){
  	
  		console.log ('Modulo cargado producto-add.component.ts');
  }

  onSubmit(){
  	console.log (this.producto);
  	console.log ("DEPURAR RESPUESTA");
  	

  	if (this.filesToUpload && this.filesToUpload.length >= 1) {

  		this._productoService.makeFileRequest (GLOBAL.url+'upload-file',[],this.filesToUpload).then((result)=>{
  		
  		console.log (result);
  		this.resultUpload = result;
  		this.producto.imagen = this.resultUpload.filename;

  		this.saveProducto();
  	
  		}, (error) => {
 		
 		console.log (error);
 	
 		});

 		



  	} else {
  		this.saveProducto();
	}
}

  saveProducto(){
  	console.log ("PRODUCTO CON IMAGEN");
  	console.log (this.producto);

  	this._productoService.addProducto(this.producto).subscribe(
  		res => {
  			if (res.code == 200){
  				this._router.navigate(['/home']);
  			}else{
  				console.log("FUNCIONA CON ERRORES");
  				console.log(res);
  			}
  		},
  		error => {
  			console.log("ERRORES CRITITOS");
  			console.log(<any>error);
  		}


  	);
	
  }

  

  fileChangeEvent(fileInput: any){

  	this.filesToUpload=<Array<File>>fileInput.target.files;
  	console.log(this.filesToUpload);


  }
}