<?php

class Page{

	public static $scripts = [];

	public static function addScript($url){
		self::$scripts[] = $url;
	}

	public static function printHead(){
		?>
		<!doctype html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>Just For Us | A Division of I & O Wellness</title>
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
			<link rel="stylesheet" href="styles/main.css" />
		</head>
		<body data-bs-spy="scroll" data-bs-target="#mainNav" data-bs-offset="80" tabindex="0">
			<!-- Navbar -->
			<nav id="mainNav" class="navbar navbar-expand-lg fixed-top shadow-sm">
				<div class="container">
					<a class="navbar-brand d-flex align-items-center" href="#top">
						<img src="imgs/logo-notext.png" alt="Just For Us logo" class="img-fluid" />
						<span class="fw-bold" style="color: var(--jfu-blue);">
							Just For Us
							<small class="d-block text-muted" style="font-size: 0.7rem;">An I&amp;O Wellness Center Community</small>
						</span>
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarContent"
						aria-controls="navbarContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarContent">
						<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a class="nav-link" href="#inspiration"><i class="fa-solid fa-heart me-1"></i>Inspiration</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#mission"><i class="fa-solid fa-bullseye me-1"></i>Mission</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#who-we-serve"><i class="fa-solid fa-users me-1"></i>Who We Serve</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#founder"><i class="fa-solid fa-person-rays me-1"></i>Founder</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#contact"><i class="fa-solid fa-envelope me-1"></i>Contact</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		<?php
	}

	public static function printFoot(){
		foreach(self::$scripts as $src){ ?><script src="<?php echo $src; ?>"></script><?php }
		?>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
		</body>
		</html>
		<?php
	}

}