<?php

namespace App\Controllers;

use App\Controllers\Controller;

class SearchController extends Controller
{
    public function index($request, $response, $args)
    {
        $query = $request->getParam('query');

        $dir = 'resources/views/';
        $pool = scandir($dir);
        unset($pool[0]);
        unset($pool[1]);
        unset($pool[2]);

        $results = [];

        foreach ($pool as $file) {
            if (is_file($dir . $file)) {
                array_push($results, explode('.', $file)[0]);
            }
        }

        foreach ($results as $result) {
            
            if ($query == $result) {
                return $this->c->view->render($response, 'search.twig', compact('query'));
            }
        }

        return $this->c->view->render($response, 'search.twig');
    }
}

