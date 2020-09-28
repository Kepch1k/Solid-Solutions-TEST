<?php
namespace Application\Core;

class View
{    
    /**
     * generate
     * 
     * Draw on page html-template by $template with content in $data and custom html in $content_view
     *
     * @param  mixed $content_view
     * @param  mixed $template
     * @param  mixed $data
     * @return void
     */
    public function generate($content_view, $template, $data = null)
    {
        include 'application/views/' . $template;
    }
}
