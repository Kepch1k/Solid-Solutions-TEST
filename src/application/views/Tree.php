<div class="container">
    <div id="Tree-root">
        <?php   
            $nodes = $data->contain;
            if(count($nodes) == 0){
                ?>
                    <script id="tempScript">
                    TreeNode.drawCreateButton();
                    document.querySelector('#tempScript').remove();
                </script>
                <?php
            }
            foreach ($nodes as $node) {
                $parentId = (empty($node["parent_node_id"]))?"empty":$node["parent_node_id"];
                ?>
                <script id="tempScript">
                    TreeNode.addNode('<?=$node["name"]?>',<?=$node["id"]?>,('<?=$parentId?>'=="empty")?null:('<?=$parentId?>'));
                    document.querySelector('#tempScript').remove();
                </script>
                <?php
            }
        ?>
    </div>
</div>
