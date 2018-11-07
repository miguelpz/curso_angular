<?php

require_once 'vendor/autoload.php';

$app = new \Slim\Slim();
$db = new mysqli('localhost', 'root','','curso_angular4');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

$app->get("/pruebas", function() use ($app, $db){
	//echo "Hola mundo desde Slim PHPPPP";
	//var_dump($db);
});

//LISTAR TODOS LOS PRODUCTOS

$app->get('/productos', function() use ($db,$app){
	$sql = 'SELECT * FROM productos ORDER BY id DESC;';
	$query = $db->query($sql);

	$productos = array();
	while ($producto = $query->fetch_assoc()){
		$productos[]=$producto;
	}

	$result=array (
		'status' => 'success',
		'code' => '200',
		'data' => $productos
	);

	
	echo json_encode ($result);
});

//DEVOLVER UN SOLO PRODUCTO

$app->get('/producto/:id', function($id) use ($db,$app){
	$sql = 'SELECT * FROM productos WHERE id='.$id;
	$query = $db->query($sql);

	$result=array (
		'status' => 'error ',
		'code' => '404',
		'data' => 'Producto no disponible'
	);

	if ($query->num_rows ==1){
		
		$producto= $query->fetch_assoc();
		$result=array (
		'status' => 'success ',
		'code' => '200',
		'data' => $producto
		);
	}

	echo json_encode ($result);
});

// ELIMINAR PRODUCTO

$app->get('/delete_producto/:id', function($id) use ($db,$app){
	$sql = 'DELETE FROM productos WHERE id='.$id;
	$query = $db->query($sql);

	$result=array (
		'status' => 'error ',
		'code' => '404',
		'data' => 'Producto no eliminado!!'
	);

	if ($query){
		
		$result=array (
			'status' => 'success ',
			'code' => '200',
			'data' => "'Producto elminado!!"
		);
	}

	echo json_encode ($result);
});


//MODIFICAR UN PRODUCTO

$app->post('/update_producto/:id', function($id) use ($db,$app){
	$json = $app -> request ->post ('json');
 	$data = json_decode($json,true);
    
    $sql = "UPDATE productos SET ".
    		"nombre='{$data["nombre"]}', ".
    		"description='{$data["description"]}', ";

    if (isset($data['imagen'])){
    	$sql.="imagen='{$data["imagen"]}', ";
	}
    		


    $sql.= "precio='{$data["precio"]}' WHERE id = {$id};";

    		//echo ($sql);

    $query = $db->query($sql);

    if ($query){
    	$result=array (
		'status' => 'success ',
		'code' => '200',
		'data' => 'Producto actualizado!!'
		);
	}else{
    	$result=array (
		'status' => 'error ',
		'code' => '404',
		'data' => 'Producto no actualizado!!'	
		);
	}

    

	echo json_encode ($result);
});


//SUBIR UNA IMAGEN

$app->post("/upload-file", function() use($app,$db){

	$result=array (
		'status' => 'error ',
		'code' => '404',
		'data' => 'El archivo no se ha subido de ninguna manera!!'
		);

	    

	if (isset($_FILES['uploads'])){

        

		$piramideUploader = new PiramideUploader();
		$upload = $piramideUploader -> upload('image',"uploads","uploads",array('image/jpeg','image/png','image/gif'));
		$file = $piramideUploader->getInfofile();
		$file_name=$file['complete_name'];

		//var_dump($file);

		if (isset($upload) && $upload["uploaded"] == False){
			
			$result=array (
			'status' => 'error',
			'code' => '404',
			'data' => 'El archivo no se ha subido!!'
			);

		}else{

			$result=array (
			'status' => 'success',
			'code' => '200',
			'data' => 'El archivo se ha subido!!',
			'filename' => $file_name
			);



		}


	}

	echo json_encode ($result);

});


// INSERTAR PRODUCTOS

$app->post("/productos", function() use($app,$db){
 	$json = $app -> request ->post ('json');
 	$data = json_decode($json,true);

    if(!isset($data['imagen'])){
 		$data['imagen']=null;
 	}

 	if(!isset($data['description'])){
 		$data['description']=null;
 	}

 	if(!isset($data['nombre'])){
 		$data['nombre']=null;
 	}

 	if(!isset($data['precio'])){
 		$data['precio']=null;
 	} 	

    if(!isset($data['imagen'])){
 		$data['imagen']=null;
 	}

    $query = "INSERT INTO productos VALUES(NULL,".
    		 "'{$data['nombre']}',".
    		 "'{$data['description']}',".
    		 "'{$data['precio']}',".
    		 "'{$data['imagen']}'".
    		 ");";
    		
    		 //var_dump($query);

    $insert = $db->query($query);

    $result = array (
    	'status' => 'error',
    	'code' => 404,
    	'message' => 'Producto No se ha creado'
	);

	if ($insert){
		$result = array (
    	'status' => 'success',
    	'code' => 200,
    	'message' => 'Producto creado correctamente'
		);
	}

	echo json_encode($result);

});
$app->post("/productos2", function() use($app,$db){
 	$json = $app -> request ->post ('producto');
 	


 	



});



$app->run();