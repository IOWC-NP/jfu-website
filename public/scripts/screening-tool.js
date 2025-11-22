class ScreeningModal{

	// User Data
	static user_data = {};

	// Button handlers
	static continue_fn = ()=>{};
	static back_fn_stack = [];

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

	static screening_questions = [{
		q: "Demo Question 1",
		opts: [{
			a: "Yes",
			urgent_flag: false,
			score: 2
		},{
			a: "No",
			urgent_flag: false,
			score: 2
		}]
	},{
		q: "Demo Question 2",
		opts: [{
			a: "Yes",
			urgent_flag: true,
			score: 2
		},{
			a: "No",
			urgent_flag: false,
			score: 2
		}]
	}];

	// Starting point: Open the modal
	static open(){
		this.user_data = {};

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
			this.continue_fn();
		});

		// Handle back btn
		this.back_btn_ele.addEventListener('click', e=>{
			e.preventDefault();
			if(this.back_fn_stack.length){
				let fn = this.back_fn_stack.pop();
				fn();
			}
		});

		// Show the modal
		this.modal_instance = new bootstrap.Modal(this.modal_ele, {backdrop: 'static'});
		this.modal_instance.show();
		this.pageWelcome();
	}

	// The first page: Asks is user has a Client ID
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
			this.modal_footer_ele.style.display = null;
			this.back_fn_stack.push(()=>this.pageWelcome());
			this.pageGetClientId();
		});
		this.modal_body_ele.querySelector('.opt2').addEventListener('click', e=>{
			e.preventDefault();
			this.modal_footer_ele.style.display = null;
			this.back_fn_stack.push(()=>this.pageWelcome());
			this.pageGetContactInfo();
		});
	}

	// Branch: Gathers and validates user's ClientID
	static pageGetClientId(){
		this.modal_body_ele.innerHTML = `
			<h2 class="section-title text-center">Let's get you verified</h2>
			<p class='mb-3' style='max-width: 400px; margin: 0 auto;'>Enter your <b>Client ID</b> and your <b>Last Name</b> to continue. If you don't have it, press the <b>Back Button</b> to return to the previous screen.</p>
			
			<div class='alert alert-danger errordiv' style='display:none;max-width: 400px; margin: 0 auto;'></div>

			<div class="mb-3" style='max-width: 400px; margin: 0 auto;'>
				<label class="form-label">Client ID</label>
				<input type="text" class="form-control clientid">
			</div>

			<div class="mb-3" style='max-width: 400px; margin: 0 auto;'>
				<label class="form-label">Last Name</label>
				<input type="text" class="form-control lastname">
			</div>
		`;

		let error_div = this.modal_body_ele.querySelector('.errordiv');
		let clientid_input = this.modal_body_ele.querySelector('.clientid');
		let lastname_input = this.modal_body_ele.querySelector('.lastname');
		clientid_input.value = this.user_data?.client_id ?? '';
		lastname_input.value = this.user_data?.last_name ?? '';

		this.continue_fn = async () => {
			try{
				await this.#validateUser(clientid_input.value, lastname_input.value);
			}catch(e){
				console.log(e);
				error_div.innerHTML = e.message;
				error_div.style.display = null;
				return;
			}
			this.user_data.client_id = clientid_input.value;
			this.user_data.last_name = lastname_input.value;
			this.back_fn_stack.push(()=>pageGetClientId());
			this.initScreening();
		};
	}

	// Branch: Gather contact info, generate Client ID
	static pageGetContactInfo(){
		this.modal_body_ele.innerHTML = `
			<h2 class="section-title text-center">Let's get your contact info</h2>
			<p class='mb-3' style='max-width: 400px; margin: 0 auto;'>Enter your contact info so we know how to get in touch with you.</p>
			
			<div class='alert alert-danger errordiv' style='display:none;max-width: 400px; margin: 0 auto;'></div>

			<div class="mb-3" style='max-width: 400px; margin: 0 auto;'>
				<label class="form-label">First Name</label>
				<input type="text" class="form-control firstname">
			</div>

			<div class="mb-3" style='max-width: 400px; margin: 0 auto;'>
				<label class="form-label">Last Name</label>
				<input type="text" class="form-control lastname">
			</div>

			<div class="mb-3" style='max-width: 400px; margin: 0 auto;'>
				<label class="form-label">Phone Number</label>
				<input type="text" class="form-control phone">
			</div>

			<div class="mb-3" style='max-width: 400px; margin: 0 auto;'>
				<label class="form-label">Email</label>
				<input type="text" class="form-control email">
			</div>

			<div class="mb-3" style='max-width: 400px; margin: 0 auto;'>
				<label class="form-label">State of Residence</label>
				<select class="form-select state">
					<option value="">Select one...</option>
					<option value="AL">Alabama</option>
					<option value="AK">Alaska</option>
					<option value="AZ">Arizona</option>
					<option value="AR">Arkansas</option>
					<option value="CA">California</option>
					<option value="CO">Colorado</option>
					<option value="CT">Connecticut</option>
					<option value="DE">Delaware</option>
					<option value="DC">District Of Columbia</option>
					<option value="FL">Florida</option>
					<option value="GA">Georgia</option>
					<option value="HI">Hawaii</option>
					<option value="ID">Idaho</option>
					<option value="IL">Illinois</option>
					<option value="IN">Indiana</option>
					<option value="IA">Iowa</option>
					<option value="KS">Kansas</option>
					<option value="KY">Kentucky</option>
					<option value="LA">Louisiana</option>
					<option value="ME">Maine</option>
					<option value="MD">Maryland</option>
					<option value="MA">Massachusetts</option>
					<option value="MI">Michigan</option>
					<option value="MN">Minnesota</option>
					<option value="MS">Mississippi</option>
					<option value="MO">Missouri</option>
					<option value="MT">Montana</option>
					<option value="NE">Nebraska</option>
					<option value="NV">Nevada</option>
					<option value="NH">New Hampshire</option>
					<option value="NJ">New Jersey</option>
					<option value="NM">New Mexico</option>
					<option value="NY">New York</option>
					<option value="NC">North Carolina</option>
					<option value="ND">North Dakota</option>
					<option value="OH">Ohio</option>
					<option value="OK">Oklahoma</option>
					<option value="OR">Oregon</option>
					<option value="PA">Pennsylvania</option>
					<option value="RI">Rhode Island</option>
					<option value="SC">South Carolina</option>
					<option value="SD">South Dakota</option>
					<option value="TN">Tennessee</option>
					<option value="TX">Texas</option>
					<option value="UT">Utah</option>
					<option value="VT">Vermont</option>
					<option value="VA">Virginia</option>
					<option value="WA">Washington</option>
					<option value="WV">West Virginia</option>
					<option value="WI">Wisconsin</option>
					<option value="WY">Wyoming</option>
				</select>
			</div>
		`;

		let error_div = this.modal_body_ele.querySelector('.errordiv');
		let firstname_input = this.modal_body_ele.querySelector('.firstname');
		let lastname_input = this.modal_body_ele.querySelector('.lastname');
		let phone_input = this.modal_body_ele.querySelector('.phone');
		let email_input = this.modal_body_ele.querySelector('.email');
		let state_input = this.modal_body_ele.querySelector('.state');
		
		firstname_input.value = this.user_data?.first_name ?? '';
		lastname_input.value = this.user_data?.last_name ?? '';
		phone_input.value = this.user_data?.phone ?? '';
		email_input.value = this.user_data?.email ?? '';
		state_input.value = this.user_data?.state ?? '';

		this.continue_fn = async () => {
			try{
				let clientId = await this.#createUser(firstname_input.value, lastname_input.value, phone_input.value.replaceAll(/[^\d]/g, ''), email_input.value, state_input.value);
				this.user_data.client_id = clientId;
			}catch(e){
				error_div.innerHTML = e.message;
				error_div.style.display = null;
				return;
			}
			this.user_data.first_name = firstname_input.value;
			this.user_data.last_name = lastname_input.value;
			this.user_data.phone = phone_input.value.replaceAll(/[^\d]/g, '');
			this.user_data.email = email_input.value;
			this.user_data.state = state_input.value;
			this.back_fn_stack.push(()=>pageGetContactInfo()());
			this.initScreening();
		};
	}

	// Initiate Screening
	static initScreening(){
		let q_index = 0;
		let showQuestion = (idx) => {

		};
		this.modal_body_ele.innerHTML = `screening...`;
	}

	// Validate a user's last name and Client ID
	static async #validateUser(clientId, lastName){
		if(!clientId || !lastName){
			throw new Error("Please enter both your client ID and your Last Name.");
		}
		await new Promise(d=>setTimeout(d, 1000)); // simulate ajax call
		return true;
	}

	// Create a user and return a Client ID
	static async #createUser(firstname, lastname, phone, email, state){
		console.log(firstname, lastname, phone, email, state);
		if(!firstname || !lastname || !phone || !email || !state){
			throw new Error("All fields are required!");
		}

		if(phone.length !== 10){
			throw new Error("Please provide a valid 10-digit phone number.");
		}

		if(!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
			throw new Error("Please provide a valid email address.");
		}

		await new Promise(d=>setTimeout(d, 1000)); // simulate ajax call
		return 'ABC123';
	}

}

document.querySelectorAll('.screening-tool-trigger').forEach(btn=>{
	btn.addEventListener('click', function(e){
		e.preventDefault();
		ScreeningModal.open();
	});
});