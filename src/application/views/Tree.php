<ul class="NodeContainer">
    <li class="Node IsRoot IsLast ExpandOpen">
        <div class="Expand"></div>
        <div class="Content">Root</div>
        <ul class="NodeContainer">
            <li class="Node ExpandOpen">
                <div class="Expand"></div>
                <div class="Content">Item 1<br>Multiline test</div>
                <ul class="NodeContainer">
                    <li class="Node ExpandLeaf IsLast">
                        <div class="Expand"></div>
                        <div class="Content">Item 1.1</div>
                    </li>
                </ul>
                </li>
                <li class="Node ExpandLeaf IsLast">
                <div class="Expand"></div>
                <div class="Content">Item 2</div>
            </li>
        </ul>
    </li>
</ul>
<!-- <i class="fa fa-caret-right" aria-hidden="true"></i> <i class="fa fa-caret-down" aria-hidden="true"></i> -->
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