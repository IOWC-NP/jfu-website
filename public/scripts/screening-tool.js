class ScreeningModal{

	// Button handlers
	static continueFn = ()=>{};
	static backFn = ()=>{};

	// ID Strings
	static modal_id = 'jfu_screening_modal';
	static continue_btn_id = 'jfu_screening_modal_continue_btn';
	static back_btn_id = 'jfu_screening_modal_back_btn';
	static modal_body_id = 'jfu_screening_modal_body';
	static modal_footer_id = 'jfu_screening_modal_footer';

	// DOM elements
	static modal_instance = null;
	static modal_ele = null;
	static modal_footer_ele = null;
	static back_btn_ele = null;
	static continue_btn_ele = null;
	static modal_body_ele = null;

	// Modal HTML
	static modal_html = `<div class="modal modal-xl" tabindex="-1" id="${this.modal_id}">
		<div class="modal-dialog">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Get Started with JFU</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body" id="${this.modal_body_id}"></div>
			<div class="modal-footer" id="${this.modal_footer_id}">
				<button type="button" class="btn btn-secondary" id="${this.back_btn_id}">Back</button>
				<button type="button" class="btn btn-primary" id="${this.continue_btn_id}">Continue</button>
			</div>
			</div>
		</div>
	</div>`;

	// Starting point: Open the modal
	static open(){
		// Remove any existing modal in the DOM
		if(this.modal_ele) this.modal_ele.remove();

		// Add the modal code to the DOM
		document.body.insertAdjacentHTML('beforeend', this.modal_html);
		this.modal_ele = document.querySelector(`#${this.modal_id}`);
		this.back_btn_ele = document.querySelector(`#${this.back_btn_id}`);
		this.continue_btn_ele = document.querySelector(`#${this.continue_btn_id}`);
		this.modal_body_ele = document.querySelector(`#${this.modal_body_id}`);
		this.modal_footer_ele = document.querySelector(`#${this.modal_footer_id}`);

		// Handle continue btn
		this.continue_btn_ele.addEventListener('click', e=>{
			e.preventDefault();
			this.continueFn();
		});

		// Handle back btn
		this.back_btn_ele.addEventListener('click', e=>{
			e.preventDefault();
			this.backFn();
		});

		// Show the modal
		this.modal_instance = new bootstrap.Modal(this.modal_ele, {backdrop: 'static'});
		this.modal_instance.show();
		this.pageWelcome();
	}

	static pageWelcome(){
		this.modal_footer_ele.style.display = 'none';
		this.modal_body_ele.innerHTML = `<center>
			<img src='imgs/logo-with-rocks.png' class='img-fluid' style='width: 100%; max-width: 300px' />
			<h2 class="section-title">We're so glad you're here!</h2>
			<p>Do you have a Client ID?</p>
			<button type="button" class="btn btn-outline-primary w-100 mb-2 d-block opt1" style='max-width: 400px'>Yes! I have a Client ID!</button>
			<button type="button" class="btn btn-outline-primary w-100 d-block opt2" style='max-width: 400px'>I don't have or know my Client ID.</button>
		</center>`;
		this.modal_body_ele.querySelector('.opt1').addEventListener('click', e=>{
			e.preventDefault();
			e.pageGetClientId();
		});
		this.modal_body_ele.querySelector('.opt2').addEventListener('click', e=>{
			e.preventDefault();
			e.pageGetContactInfo();
		});
	}

}

document.querySelectorAll('.screening-tool-trigger').forEach(btn=>{
	btn.addEventListener('click', function(e){
		e.preventDefault();
		ScreeningModal.open();
	});
});