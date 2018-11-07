import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: '../views/home.html'
})

export class HomeComponent {
	
 	public titulo = "Titulo de Home";
	

	ngOnInit(){
  	console.log ("Se ha cargado el componente app.component.ts");
  }
}