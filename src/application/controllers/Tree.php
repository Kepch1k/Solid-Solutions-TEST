<?php
namespace Application\Controllers;

use Application\Core\Controller;
use Application\Core\View;
use Application\Core\Route;
use Application\Models\Tree as TreeModel;

class Tree extends Controller
{
    public function __construct()
    {
        $this->model = new TreeModel();
        $this->view = new View();
    }

    public function actionIndex()
    {
        $data = (object) [];
       
        $data->contain = $this->model->getTree();

        $this->view->generate('tree.php', 'template.php', $data);
       
    }

    public function actionInsert()
    {
        $response = array();
        $name = $_POST['name'];
        $parentId = $_POST['parentId'];
        $data = (object) [];
       
        $result = $this->model->insertNode($name, $parentId);

        if(is_numeric($result)){
            $response["status"] = "success";
            $response["data"] = array();
            $response["data"]["createdId"] = $result;
            $response["code"] = 200;
            http_response_code(200);
        }else{
            http_response_code(500);
            $response["status"] = "Error";
        }

        header('Content-Type: text/json; charset=utf-8');
        echo json_encode($response);
       
    }

    public function actionUpdate()
    {
        $response = array();
        $name = $_POST['name'];
        $id = $_POST['id'];
        $data = (object) [];
       
        $result = $this->model->updateNode($name, $id);

        if(is_numeric($result)){
            $response["status"] = "success";
            $response["data"] = array();
            $response["data"]["id"] = $result;
            $response["code"] = 200;
            http_response_code(200);
        }else{
            http_response_code(500);
            $response["status"] = "Error";
        }

        header('Content-Type: text/json; charset=utf-8');
        echo json_encode($response);
       
    }

    public function actionDelete()
    {
        $id = $_POST['id'];
        $contRecordsAfterDelete = $this->model->deleteNode($id);
        $response = array();

        if(is_numeric($contRecordsAfterDelete) && ($contRecordsAfterDelete == 0)){
            $response["status"] = "success";
            $response["data"] = array();
            $response["data"]["deletedId"] = $id;
            $response["code"] = 200;
            http_response_code(200);
        }else{
            http_response_code(500);
            $response["status"] = "Error";
        }

        header('Content-Type: text/json; charset=utf-8');
        echo json_encode($response);
       
    }
}