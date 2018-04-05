<?php

namespace App\Controllers;

use App\Controllers\Controller;

class SiteController extends Controller
{
    public function home($request, $response, $args)
    {
        return $this->c->view->render($response, 'home.twig');
    }

    public function about($request, $response, $args)
    {
        $team = json_decode(file_get_contents('resources/content/team.json'));

        return $this->c->view->render($response, 'about.twig', compact('team'));
    }

    public function portfolio($request, $response, $args)
    {
        $portfolio = json_decode(file_get_contents('resources/content/portfolio.json'));

        return $this->c->view->render($response, 'portfolio.twig', compact('portfolio'));
    }

    public function careers($request, $response, $args)
    {
        $carousel = json_decode(file_get_contents('resources/content/carousel.json'));

        return $this->c->view->render($response, 'careers.twig', compact('carousel'));
    }

    public function careersPost($request, $response, $args)
    {
        $params = $request->getParams();

        $this->c->mail->from($request->getParam('email'), $request->getParam('name'))
              ->to([
                    [
                        'name' => 'Landscape Effects',
                        'email' => 'jason@landscapefx.com',
                    ]
              ])
              ->attatchments($_FILES)
              ->subject('A new resume from ' . $request->getParam('name'))
              ->send('mail/mail.twig', compact('params'));
    }

    public function contact($request, $response, $args)
    {
        return $this->c->view->render($response, 'contact.twig');
    }

    public function contactPost($request, $response, $args)
    {
        $params = $request->getParams();

        $this->c->mail->from($request->getParam('email'), $request->getParam('name'))
              ->to([
                    [
                        'name' => 'Landscape Effects',
                        'email' => 'contact@landscapefx.com',
                    ]
              ])
              ->subject('A new message from ' . $request->getParam('name'))
              ->send('mail/mail.twig', compact('params'));
    }
}
