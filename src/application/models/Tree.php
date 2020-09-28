<?php
namespace Application\Models;

use Application\Core\Model;

class Tree extends Model
{    
    /**
     * getTree
     *
     *  return to us all nodes
     * 
     * @return array
     */
    public function getTree()
    {
        $q = "SELECT * 
        FROM `tree_nodes`";
        $nodes = $this->dbSelectArray($q);
        return $nodes;
    }
    
    /**
     * insertNode
     * 
     * @param  mixed $name
     * @param  mixed $parentId
     * @return int
     */
    public function insertNode($name, $parentId = NULL)
    {
        $prev_node_id = $this->getLastInsertId();
        $last_parameter = ($parentId != "empty")?", $parentId":", NULL";
        $q = 'INSERT INTO `tree_nodes` (`id`, `name`, `parent_node_id`) VALUES (NULL, "'.$name.'"'.$last_parameter.');';
        $this->dbQuery($q);
        $node_id = $this->getLastInsertId();
        if($prev_node_id == $node_id){
            return "Error";
        }
        return $node_id;
    }
    
    /**
     * deleteNode
     *
     * @param  mixed $id
     * @return int
     */
    public function deleteNode($id)
    {
        $q = 'SELECT count(*) as countRecords FROM `tree_nodes` WHERE id = '.$id.';';
        $count = $this->dbSelectRow($q);
        if($count["countRecords"] == 0 ){
            return "Error";
        }
        $q = 'DELETE FROM `tree_nodes` WHERE id = '.$id.';';
        $this->dbQuery($q);
        $q = 'SELECT count(*) as countRecords FROM `tree_nodes` WHERE id = '.$id.';';
        $count = $this->dbSelectRow($q);
        return $count["countRecords"];
    }
}
