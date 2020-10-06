class TreeNode {

    static draw(name, id = 1, parentId = null) {
        let plusIcon = document.createElement('i');
        plusIcon.className = "fa fa-plus";
        plusIcon.setAttribute("aria-hidden", "true");
        plusIcon.setAttribute("data-toggle", "modal");
        plusIcon.setAttribute("data-target", "#CreateNodeModal");
        let minusIcon = document.createElement('i');
        minusIcon.className = "fa fa-minus";

        plusIcon.addEventListener("click", () => { window.nodeToAddChildren = id });
        minusIcon.addEventListener("click", () => { window.nodeToDelete = id });

        if (!!parentId) {
            let parent = document.querySelector(`#tree-node-${parentId}`);
            let listElement = document.createElement('li');
            let expand = document.createElement('span');
            let content = document.createElement('span');

            parent = (!!parent) ? parent : document.querySelector("#Root-tree-node");

            content.setAttribute("class", `Content`);
            content.setAttribute("aria-hidden", "true");
            content.setAttribute("data-toggle", "modal");
            content.setAttribute("data-target", "#UpdateNodeModal");
            content.addEventListener("click", () => {
                window.nodeToUpdate = id;
                document.querySelector("#UpdateNode div input").value = name;
            });

            expand.setAttribute("class", `Expand`);
            expand.addEventListener("click", () => {
                if ([...listElement.classList].includes("ExpandOpen")) {
                    listElement.classList.remove("ExpandOpen");
                    listElement.classList.add("ExpandClosed");
                } else if ([...listElement.classList].includes("ExpandClosed")) {
                    listElement.classList.add("ExpandOpen");
                    listElement.classList.remove("ExpandClosed");
                }
            });

            let listElementContent = document.createElement('span');
            let list = ([...parent.childNodes].length > 4) ? [...parent.childNodes][4] : document.createElement('ul');
            list.setAttribute("class", `NodeContainer`);

            parent.parentNode.classList.add("ExpandOpen");
            parent.parentNode.classList.remove("ExpandLeaf");

            listElement.setAttribute("class", `Tree-node-content Node ExpandLeaf`);

            content.innerText = `${name}`;

            listElementContent.appendChild(expand);
            listElementContent.appendChild(content);

            listElementContent.setAttribute("id", `tree-node-${id}`);

            listElement.appendChild(listElementContent);
            listElementContent.appendChild(plusIcon);
            minusIcon.addEventListener("click", () => { document.querySelector("#DeleteNodeButton").click(); });


            listElementContent.appendChild(minusIcon);

            list.appendChild(listElement);
            let countOfListElements = [...list.childNodes].length;
            if (countOfListElements > 1) {
                list.childNodes[countOfListElements - 2].classList.remove("IsLast");
            }
            list.childNodes[countOfListElements - 1].classList.add("IsLast");
            parent.appendChild(list);

        } else {
            if (!document.querySelector("#Root-tree-node")) {

                let tree_root = document.querySelector("#Tree-root");
                let list = document.createElement('ul');
                let listElement = document.createElement('li');
                let expand = document.createElement('span');
                let content = document.createElement('span');
                let listElementContent = document.createElement('span');
                list.setAttribute("class", `NodeContainer`);
                expand.setAttribute("class", `Expand`);
                content.setAttribute("class", `Content`);

                expand.addEventListener("click", () => {
                    if ([...listElement.classList].includes("ExpandOpen")) {
                        listElement.classList.remove("ExpandOpen");
                        listElement.classList.add("ExpandClosed");
                    } else if ([...listElement.classList].includes("ExpandClosed")) {
                        listElement.classList.add("ExpandOpen");
                        listElement.classList.remove("ExpandClosed");
                    }
                });

                listElement.setAttribute("class", `Tree-node-content Node IsRoot IsLast ExpandLeaf`);

                content.innerText = `${name}`;

                listElementContent.appendChild(expand);
                listElementContent.appendChild(content);

                listElementContent.setAttribute("id", "Root-tree-node");

                listElement.appendChild(listElementContent);
                listElementContent.appendChild(plusIcon);
                minusIcon.setAttribute("aria-hidden", "true");
                minusIcon.setAttribute("data-toggle", "modal");
                minusIcon.setAttribute("data-target", "#DeleteNodeModal");
                listElementContent.appendChild(minusIcon);

                list.appendChild(listElement);
                tree_root.appendChild(list);

            }
        }
    }

    static deleteNode(id) {
        let nodeToDelete = document.querySelector(`#tree-node-${id}`);
        if (!nodeToDelete) {
            document.querySelector("#Root-tree-node").parentNode.parentNode.remove();
            TreeNode.drawCreateButton();
        } else {
            let list = document.querySelector(`#tree-node-${id}`).parentNode.parentNode;
            document.querySelector(`#tree-node-${id}`).parentNode.remove();
            if ([...list.childNodes].length == 0) {
                list.parentNode.parentNode.classList.remove("ExpandOpen");
                list.parentNode.parentNode.classList.remove("ExpandClosed");
                list.parentNode.parentNode.classList.add("ExpandLeaf");
            }
        }
    }

    static addNode(name, id = 1, parent = null) {
        TreeNode.draw(name, id, parent);
    }

    static updateNode(name, id = 1) {
        document.querySelector(`#tree-node-${id} span.Content`).innerText = name;
    }

    static drawCreateButton() {
        let createRootButton = document.createElement('button');
        createRootButton.setAttribute("type", `button`);
        createRootButton.setAttribute("class", `btn btn-primary`);
        createRootButton.setAttribute("id", `createRootButton`);
        createRootButton.innerText = "Create Root";
        createRootButton.addEventListener("click", () => {
            jQuery.ajax({
                url: "http://"+window.location.hostname+"/tree/insert",
                type: "POST",
                data: { name: "Root", parentId: "empty" },
                dataType: "json",
                success: function(result) {
                    if (result) {
                        TreeNode.addNode("Root", (+result['data']['createdId']), null);
                        document.querySelector(`#createRootButton`).remove();
                    }
                    return false;
                }
            });
        });
        document.querySelector(`#Tree-root`).appendChild(createRootButton);;
    }

}