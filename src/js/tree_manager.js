class TreeNode {

    static draw(name, id = 1, parentId = null) {
        let plusIcon = document.createElement('i');
        plusIcon.className="fa fa-plus";
        plusIcon.setAttribute("aria-hidden", "true");
        plusIcon.setAttribute("data-toggle", "modal");
        plusIcon.setAttribute("data-target", "#CreateNodeModal");
        let minusIcon = document.createElement('i');
        minusIcon.className="fa fa-minus";
        minusIcon.setAttribute("aria-hidden", "true");
        minusIcon.setAttribute("data-toggle", "modal");
        minusIcon.setAttribute("data-target", "#DeleteNodeModal");

        plusIcon.addEventListener("click",()=>{window.nodeToAddChildren = id});
        minusIcon.addEventListener("click",()=>{window.nodeToDelete = id});

        if(!!parentId){
            let parent = document.querySelector(`#tree-node-${parentId}`);
            parent = (!!parent)?parent:document.querySelector("#Root-tree-node");
            let listElement = document.createElement('li');
            let expand = document.createElement('span');
            let content = document.createElement('span');
            content.setAttribute("class", `Content`);
            expand.setAttribute("class", `Expand`);
            let listElementContent = document.createElement('span');
            let list = ([...parent.childNodes].length > 4) ? [...parent.childNodes][4] : document.createElement('ul');
            list.setAttribute("class", `NodeContainer`);
            listElement.setAttribute("class", `Tree-node-content Node IsLast ExpandOpen`);

            content.innerText = `${name}`;

            listElementContent.appendChild(expand);
            listElementContent.appendChild(content);
            
            listElementContent.setAttribute("id", `tree-node-${id}`);
            
            listElement.appendChild(listElementContent);
            listElementContent.appendChild(plusIcon);
            listElementContent.appendChild(minusIcon);

            list.appendChild(listElement);
            parent.appendChild(list);

        }else{
            if(!document.querySelector("#Root-tree-node")){

                let tree_root = document.querySelector("#Tree-root");
                let list = document.createElement('ul');
                list.setAttribute("class", `NodeContainer`);
                let listElement = document.createElement('li');
                let expand = document.createElement('span');
                let content = document.createElement('span');
                expand.setAttribute("class", `Expand`);
                content.setAttribute("class", `Content`);
                let listElementContent = document.createElement('span');

                listElement.setAttribute("class", `Tree-node-content Node IsRoot IsLast ExpandOpen`);

                content.innerText = `${name}`;

                listElementContent.appendChild(expand);
                listElementContent.appendChild(content);

                listElementContent.setAttribute("id", "Root-tree-node");
            
                listElement.appendChild(listElementContent);
                listElementContent.appendChild(plusIcon);
                listElementContent.appendChild(minusIcon);
                
                list.appendChild(listElement);
                tree_root.appendChild(list);
        
            }
        }
    }
  
    static deleteNode(id) {
        let nodeToDelete = document.querySelector(`#tree-node-${id}`);
        if(!nodeToDelete){
            document.querySelector("#Root-tree-node").parentNode.parentNode.remove();
            TreeNode.drawCreateButton();
        }else{
            document.querySelector(`#tree-node-${id}`).parentNode.remove();
        }
    }
  
    static addNode(name, id = 1, parent = null){
        TreeNode.draw(name, id, parent);
    }

    static drawCreateButton(){
        let createRootButton = document.createElement('button');
        createRootButton.setAttribute("type", `button`);
        createRootButton.setAttribute("class", `btn btn-primary`);
        createRootButton.setAttribute("id", `createRootButton`);
        createRootButton.innerText = "Create Root";
        createRootButton.addEventListener("click",()=>{
            jQuery.ajax({
                url: "http://testsolid/tree/insert",
                type: "POST",
                data: {name:"Root", parentId: "empty"},
                dataType: "json",
                success: function(result) {
                    if (result){ 
                        TreeNode.addNode("Root", (+result['data']['createdId']),null);
                        document.querySelector(`#createRootButton`).remove();
                        console.log(result);
                    }
                    return false;
                }
            });
        });
        document.querySelector(`#Tree-root`).appendChild(createRootButton);;
    }

}