let deleteNodeModal = document.querySelector("#DeleteNodeModal");

let closeDeleteModalButton = document.querySelector("#CloseDeleteModalButton");
let deleteNodeButton = document.querySelector("#DeleteNodeButton");
let exitDeleteModalButton = document.querySelector("#ExitDeleteModalButton");

let closeCreateModalButton = document.querySelector("#CloseCreateModalButton");
let exitCreateModalButton = document.querySelector("#ExitCreateModalButton");
let createNodeSubmit = document.querySelector("#CreateNodeSubmit");

let closeUpdateModalButton = document.querySelector("#CloseUpdateModalButton");
let exitUpdateModalButton = document.querySelector("#ExitUpdateModalButton");
let updateNodeSubmit = document.querySelector("#UpdateNodeSubmit");

let { closeTimer } = window;
const config = { attributes: true, childList: false, subtree: false };

const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if ((mutation.type === 'attributes') && (mutation.attributeName == 'class')) {
            if ([...document.querySelector("#DeleteNodeModal").classList].includes("show")) {
                closeTimer.start();
            }
        }
    }
};

const observer = new MutationObserver(callback);

observer.observe(deleteNodeModal, config);

deleteNodeButton.addEventListener("click", () => {
    const { nodeToDelete } = window;
    jQuery.ajax({
        url: "http://testsolid/tree/delete",
        type: "POST",
        data: { id: nodeToDelete },
        dataType: "json",
        success: function(result) {
            if (result) {
                TreeNode.deleteNode((+result["data"]["deletedId"]));
            }
            return false;
        }
    });

    window.nodeToDelete = null;
    closeTimer.stop();
    closeDeleteModalButton.click();
})

closeDeleteModalButton.addEventListener("click", () => {
    closeTimer.stop();
})

exitDeleteModalButton.addEventListener("click", () => {
    closeTimer.stop();
})

createNodeSubmit.addEventListener("click", () => {
    const node_name = document.querySelector("#CreateNode div input");
    const node_name_feedback = document.querySelector("#CreateNode div div");

    const { value } = node_name;
    node_name.classList.remove("is-invalid");
    let hasError = false
    if (!!value) {
        if (value.length > 100) {
            node_name_feedback.innerText = "Name must be less then 100 characters";
            hasError = true;
        }
        if (!value.trim().length > 0) {
            node_name_feedback.innerText = "Use characters other than whitespace";
            hasError = true;
        }
    } else {
        node_name_feedback.innerText = "Fill this field";
        hasError = true;
    }
    if (hasError) {
        node_name.classList.add("is-invalid");
    } else {
        const { nodeToAddChildren } = window;

        jQuery.ajax({
            url: "http://testsolid/tree/insert",
            type: "POST",
            data: { name: value, parentId: nodeToAddChildren },
            dataType: "json",
            success: function(result) {
                if (result) {
                    TreeNode.addNode(value, (+result['data']['createdId']), nodeToAddChildren);
                }
                return false;
            }
        });
        node_name.value = "";
        closeCreateModalButton.click();
    }
})

closeCreateModalButton.addEventListener("click", () => {
    window.nodeToAddChildren = null;
})

exitCreateModalButton.addEventListener("click", () => {
    window.nodeToAddChildren = null;
})

updateNodeSubmit.addEventListener("click", () => {
    const node_name = document.querySelector("#UpdateNode div input");
    const node_name_feedback = document.querySelector("#UpdateNode div div");

    const { value } = node_name;
    node_name.classList.remove("is-invalid");
    let hasError = false
    if (!!value) {
        if (value.length > 100) {
            node_name_feedback.innerText = "Name must be less then 100 characters";
            hasError = true;
        }
        if (!value.trim().length > 0) {
            node_name_feedback.innerText = "Use characters other than whitespace";
            hasError = true;
        }
    } else {
        node_name_feedback.innerText = "Fill this field";
        hasError = true;
    }
    if (hasError) {
        node_name.classList.add("is-invalid");
    } else {
        const { nodeToUpdate } = window;

        jQuery.ajax({
            url: "http://testsolid/tree/update",
            type: "POST",
            data: { name: value, id: nodeToUpdate },
            dataType: "json",
            success: function(result) {
                if (result) {
                    TreeNode.updateNode(value, (+result['data']['id']));
                }
                return false;
            }
        });
        node_name.value = "";
        closeUpdateModalButton.click();
    }
})

closeUpdateModalButton.addEventListener("click", () => {
    window.nodeToUpdate = null;
})

exitUpdateModalButton.addEventListener("click", () => {
    window.nodeToUpdate = null;
})