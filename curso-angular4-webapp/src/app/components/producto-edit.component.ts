import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ProductoService} from '../services/producto.service';
import { Producto } from '../models/producto';
import {GLOBAL} from '../services/global';


@Component({
  selector: 'producto-edit',
  templateUrl: '../views/productos-add.html',
  providers:[ProductoService]
})

export class ProductoEditComponent {
	
 	public titulo: string;
 	public producto: Producto;
 	public filesToUpload;
  public resultUpload;
  public is_edit;
 	

 	constructor (
 		private _productoService:ProductoService,
 		private _route: ActivatedRoute,
 		private _router: Router
 		){
 		this.titulo = 'Editar Producto';
 		this.producto = new Producto (0,'','',0,'');

 	}	

  ngOnInit() {
    this.getProducto();
    this.is_edit = true;
  }

  onSubmit(){

    console.log (this.producto);
    
    

    if (this.filesToUpload && this.filesToUpload.length >= 1) {

      this._productoService.makeFileRequest (GLOBAL.url+'upload-file',[],this.filesToUpload).then((result)=>{
      
      console.log (result);
      this.resultUpload = result;
      this.producto.imagen = this.resultUpload.filename;

      this.updateProducto();
    
      }, (error) => {
    
    console.log (error);
  
    });

    



    } else {
      this.updateProducto();
  }
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
    
  updateProducto(){
    this._route.params.forEach((params:Params) => {
    let id = params ['id'];
    console.log ("onSubmit ");
    console.log (id);

        this._productoService.editProducto(id, this.producto).subscribe(
          res => {
            if (res.code == 200){
              console.log ("Navegación correcta!");
              this._router.navigate(['/producto',id]);
            }else{
                    console.log(res);
            }
          },
          error => {
            
            console.log(<any>error);
          }


         );
    });  
  }

  

  fileChangeEvent(fileInput: any){

    this.filesToUpload=<Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);


  }  
  

  
}