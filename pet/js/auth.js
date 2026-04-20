class Auth{

/* INIT */
static init(){

  let users = Storage.getArray('users'); // ✅ safe

  let adminExists = users.some(u => u.role === 'admin');

  if(!adminExists){
    users.push({
      u:"admin",
      p:"1234",
      role:"admin",
      name:"Admin",
      surname:"",
      location:""
    });
  }

  Storage.set('users', users);
}

/* LOGIN UI */
static show(){
  app.innerHTML = `
  <div class="form-box">

    <div class="form-logo">🐾 PetCity</div>

    <h2>Login</h2>

    <input id="username" placeholder="Username" 
      onkeypress="if(event.key==='Enter') Auth.login()">

    <div class="password-box">
      <input id="password" type="password" placeholder="Password"
        onkeypress="if(event.key==='Enter') Auth.login()">
      <span onclick="Auth.togglePassword()">👁️</span>
    </div>

    <button onclick="Auth.login()">Login</button>

  </div>`;
  setTimeout(() => {
  document.getElementById("username").focus();
}, 100);
}

/* SIGNUP UI */
static signupShow(){
  app.innerHTML = `
  <div class="form-box">

    <div class="form-logo">🐾 PetCity</div>

    <h2>Create Account</h2>

    <input id="name" placeholder="Name"
      onkeypress="if(event.key==='Enter') Auth.register()">

    <input id="surname" placeholder="Surname"
      onkeypress="if(event.key==='Enter') Auth.register()">

    <input id="age" type="number" placeholder="Age"
      onkeypress="if(event.key==='Enter') Auth.register()">

    <select id="gender"
      onkeypress="if(event.key==='Enter') Auth.register()">
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>

    <input id="location" placeholder="Location"
      onkeypress="if(event.key==='Enter') Auth.register()">

    <hr>

    <input id="username" placeholder="Username"
      onkeypress="if(event.key==='Enter') Auth.register()">

    <div class="password-box">
      <input id="password" type="password" placeholder="Password"
        onkeypress="if(event.key==='Enter') Auth.register()">
      <span onclick="Auth.togglePassword()">👁️</span>
    </div>

    <button onclick="Auth.register()">Create Account</button>

  </div>`;
}

/* REGISTER */
static register(){

  let name = document.getElementById("name").value.trim();
  let surname = document.getElementById("surname").value.trim();
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let location = document.getElementById("location").value.trim();
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;

  if(password.length < 8){
    alert("Password must be at least 8 characters");
    return;
  }

  if(!name || !surname || !age || !gender || !location || !username || !password){
    alert("Please fill all fields");
    return;
  }

  let users = Storage.getArray('users'); 

  if(users.some(u => u.u === username)){
    alert("Username already exists");
    return;
  }

  users.push({
    name,
    surname,
    age,
    gender,
    location,
    u: username,
    p: password,
    role: 'user'
  });

  Storage.set('users', users);

  alert("Account created successfully!");

  UI.navigate('login');
}

/* LOGIN */
static login(){

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;

  let users = Storage.getArray('users');

  let user = users.find(x => x.u === username && x.p === password);

  if(user){

    Storage.set('currentUser', user); 

UI.updateNavbar();

UI.showSplash(()=>{
  UI.navigate('home');
});

  } else {
    alert("Wrong credentials");
  }
}

/* LOGOUT */
static logout(){
  Storage.remove('currentUser'); 
UI.updateNavbar();

UI.showSplash(()=>{
  UI.navigate('home');
});
}

/* CURRENT USER */
static current(){
  return Storage.get('currentUser'); 
}

/* PASSWORD TOGGLE */
static togglePassword(){
  let input = document.getElementById("password");

  input.type = input.type === "password" ? "text" : "password";
}

}