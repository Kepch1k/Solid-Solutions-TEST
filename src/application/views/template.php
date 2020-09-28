<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<title>Solid Solution Test</title>
		<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
		<link href="https://getbootstrap.com/docs/3.3/examples/justified-nav/justified-nav.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="/css/style.css" />
		<link rel="canonical" href="https://getbootstrap.com/docs/4.1/examples/product/">
		<link rel="shortcut icon" href="/img/favicon.png" type="image/png">
		<link rel="stylesheet" href="/css/bootstrap/bootstrap.min.css">
		<script src="/js/jquery-3.5.1.min.js" type="text/javascript" defer></script>
		<script src="/js/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
		<script src="/js/bootstrap/bootstrap.min.js"></script>
		<script src="/js/timer.js" type="text/javascript" defer></script>
		<script src="/js/tree_manager.js" type="text/javascript"></script>
		<script src="/js/modalController.js" type="text/javascript" defer></script>
		
	</head>
	<body>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="mainNav" >
			<div class="container">
				<div class="navbar-brand js-scroll-trigger">Tree Builder</div>
			</div>
		</nav>

		<?php include 'application/views/' . $content_view;?>
		
		<footer class="pt-3 text-muted text-center text-small mt-auto">
			<p class="mb-1">© Solid Solutions Test 2020—2020. All rights reserved.</p>
		</footer>

		<!-- Create node modal -->
		<div class="modal fade" id="CreateNodeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Create new node</h5>
					<button id="ExitCreateModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form id="CreateNode" method="post" action="">
						<div class="form-group">
							<label for="node-name" class="col-form-label">Name for node:</label>
							<input type="text" class="form-control" id="node-name" name="node-name">
							<div id="node-name-feedback" class="invalid-feedback">Example invalid custom select feedback</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button id="CloseCreateModalButton" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button id="CreateNodeSubmit" class="btn btn-primary">Submit</button>
				</div>
				</div>
			</div>
		</div>

		<!-- Update node modal -->
		<div class="modal fade" id="UpdateNodeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Update node</h5>
					<button id="ExitUpdateModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form id="UpdateNode" method="post" action="">
						<div class="form-group">
							<label for="node-name" class="col-form-label">Name for node:</label>
							<input type="text" class="form-control" id="node-name" name="node-name">
							<div id="node-name-feedback" class="invalid-feedback">Example invalid custom select feedback</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button id="CloseUpdateModalButton" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button id="UpdateNodeSubmit" class="btn btn-primary">Submit</button>
				</div>
				</div>
			</div>
		</div>

		<!-- Delete node modal -->
		<div class="modal fade" id="DeleteNodeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Delete root node</h5>
					<button id="ExitDeleteModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<span>Are you sure?</span>
				</div>
				<div class="modal-footer">
					<span id="timer">20</span>
					<button id="CloseDeleteModalButton" type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
					<button id="DeleteNodeButton" class="btn btn-primary" type="button">Yes</button>
				</div>
				</div>
			</div>
		</div>

	</body>
</html>
