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
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" >
                    </div>
                    <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="form-group text-center">
                        <button type="button" class="btn btn-block btn-success">CONTINUE</button>
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

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
}