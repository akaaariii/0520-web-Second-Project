const body = document.body;

//Add SignIn Modal
const stringSignInModal = (`
    <div class="modal" tabindex="-1" id="modalLogIn">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">SIGN IN</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="userEmail">Email address</label>
                        <input type="email" class="form-control" id="userEmail" >
                    </div>
                    <div class="form-group">
                        <label for="userPassword">Password</label>
                        <input type="password" class="form-control" id="userPassword">
                    </div>
                    <div class="form-group text-center">
                        <button type="button" onclick="login()" class="btn btn-block btn-success">CONTINUE</button>
                    </div>
                </form>
                <hr>
                <div class="text-center">
                    <p>Don't have an account?</p>
                    <a class="btn btn-secondary" href="#" data-toggle="modal" data-target="#modalSignUp" >Create your account</a>
                </div>
                </div>
            </div>
        </div>
    </div>`);
body.appendChild(createElementFromHTML(stringSignInModal));

//Add SignUp Modal
const stringSignUpModal = (`
<div class="modal" tabindex="-1" id="modalSignUp">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">SIGN UP</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="inputFirstName">First name *</label>
                        <input name="firstName" type="text" class="form-control" id="inputFirstName" >
                    </div>
                    <div class="form-group">
                        <label for="inputLastName">Last name *</label>
                        <input name="lastName" type="text" class="form-control" id="inputLastName" >
                    </div>
                    <div class="form-group">
                        <label for="inputEmail">Email</label>
                        <input name="email" type="email" class="form-control" id="inputEmail" >
                    </div>
                    <div class="form-group">
                        <label for="inputPhone">Phone number</label>
                        <input name="phone" type="text" class="form-control" id="inputPhone" >
                    </div>
                    <div class="form-group">
                        <label for="inputPassword2">Password</label>
                        <input type="password" class="form-control" id="inputPassword2">
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Receive promotional emails</label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-block btn-success">Sign Up</button>
            </div>
        </div>
    </div>
</div>`);
body.appendChild(createElementFromHTML(stringSignUpModal));


function checkUserLogged(){
    // check if there is some email registered in the cookie
    let cookieInfo = document.cookie;
    let dropdownMenu = document.querySelector('#checkSignin');
    if(cookieInfo !== null){
        let emailCookie = cookieInfo.split('=')[1];
        let username = emailCookie.split('@')[0].toUpperCase();
        // show the dropdown button
        dropdownMenu.innerHTML = (`
            <div class="dropdown">
                <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user-alt"></i><span> MY ACCOUNT</span>
                </button>
                <div class="dropdown-menu pb-0" aria-labelledby="dropdownMenuButton">
                    <p class="mb-2" style="text-align: center;">Welcome ${username}</p>
                    <a class="dropdown-item" style="text-align: center; type="button" onclick="logout()" href="#">SIGN OUT</a>
                 </div>
            </div>   
        `);
    }
}

function logout(emailCookie){
    // 1. delete email registered in the cookie
    document.cookie = `user_email=${emailCookie}; expires=${new Date(2020,1,1).toUTCString()}`;

    // 2. reload the page
    console.log(document.cookie);
    if(document.cookie === ''){
        location.reload();
    }
    
}


function login(){
    let email = $('#userEmail').val();
    // let password = $('#userPassword').val();
    let d = new Date();
    let minutes = 30;
    d.setTime(d.getTime() + (minutes * 60 * 1000));

    // 2. register the cookie with user email
    document.cookie = `user_email=${email}; expires=${d.toUTCString()}`;
    
    // 3. close the modal
    $('#modalLogIn').modal('hide');
    checkUserLogged();
}


function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
}


    // 1. check validation
    // const ERROR_MESSAGE = {
    //     requiredEmail : 'email is required',
    //     validEmail : 'email is not valid',
    //     requiredPassword : 'password is required'
    // }
    // const emailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const small = document.createElement('small');
    // small.classList.add('text-danger');
    // if(email === ''){
    //     small.textContent = ERROR_MESSAGE.requiredEmail;
    // } else if (!emailformat.test(email)){
    //     small.textContent = ERROR_MESSAGE.validEmail;
    // } else {
    //     small.classList.remove('text-danger');
    //     small.classList.add('text-success');
    //     small.textContent = "ok";
    // }

    // if(password === ''){
    //     small.textContent = ERROR_MESSAGE.requiredPassword;
    // } else {
    //     small.classList.remove('text-danger');
    //     small.classList.add('text-success');
    //     small.textContent = "ok";
    // }
