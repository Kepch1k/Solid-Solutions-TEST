<?php
namespace Application\Core;

class Route
{
    public static function start()
    {
        /**
         * 
         * Set default values;
         * 
         */
        $controller_name = 'Tree';
        $action_name = 'Index';

        $routes = explode('/', $_SERVER['REQUEST_URI']);

        if (!empty($routes[2])) {
            $action_name = $routes[2];
        }

        $action_name = 'action' . ucfirst($action_name);

        $full_controller_class_name = 'Application\\Controllers\\' . ucfirst($controller_name);

        $controller_file = $controller_name . '.php';
        $controller_path = $_SERVER['DOCUMENT_ROOT'] . '/application/controllers/' . ucfirst($controller_file) ;

        if (file_exists($controller_path)) {
            $controller = new $full_controller_class_name;
        }

        $action = $action_name;

        if (method_exists($controller, $action)) {
            if (!empty($routes[3])) {
                $controller->$action($routes[3]);
            } else {
                $controller->$action();
            }
        }
    }
}
