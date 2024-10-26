document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const formHTML = `
        <span class="close-icon"><ion-icon name="close-outline"></ion-icon></span>
        <div class="form-container login">
            <h1>Login</h1>
            <form>
              <div class="form-group">
                <span class="icon"><ion-icon name="mail-outline"></ion-icon></span>
                <input type="email" id="loginEmail" name="email" placeholder="" required>
                <label for="email">Email</label>
              </div>
              <div class="form-group">
                <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type="password" id="loginPassword" name="password" placeholder="" required>
                <label for="password">Password</label>
              </div>
                <div class="remember-forgot">
                    <label>
                        <input type="checkbox" name="remember" value="remember">Remember me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>
              <button type="submit" class="submit-button">Login</button>
              <p>Don't have an account? <a href="#" class="register-link">Sign up</a></p>
            </form>
        </div>
        <div class="form-container register">
            <h1>Registration</h1>
            <form>
              <div class="form-group">
                <span class="icon"><ion-icon name="person-circle-outline"></ion-icon></span>
                <input type="text" id="name" name="name" placeholder="" required>
                <label for="name">Username</label>
              </div>
              <div class="form-group">
                <span class="icon"><ion-icon name="mail-outline"></ion-icon></span>
                <input type="email" id="registerEmail" name="email" placeholder="" required>
                <label for="email">Email</label>
              </div>
              <div class="form-group">
                <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type="password" id="registerPassword" name="password" placeholder="" required>
                <label for="password">Password</label>
              </div>
              <button type="submit" class="submit-button">Sign Up</button>
              <p>Already have an account? <a href="#" class="login-link">Sign in</a></p>
            </form>
        </div>
    `;
    wrapper.innerHTML = formHTML;
});
