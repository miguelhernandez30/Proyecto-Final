function registrar() {
    var usuarioYApellido = document.getElementById("nombreYApellidos").value;
    var nacimiento = document.getElementById("nacimiento").value;
    var correoElectronico = document.getElementById("correoElectronico").value;
    var password = document.getElementById("contraseña").value;
    var confirPassword = document.getElementById("confirmarContraseña").value;

    // Validar que la contraseña y la confirmación coincidan
    if (password !== confirPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    var crearUser = {
        usuarioYApellido: usuarioYApellido,
        nacimiento: nacimiento,
        correoElectronico: correoElectronico,
        password: password
    };

    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    // Validar que el correo electrónico no esté ya registrado
    var correoExistente = usuarios.find(function (user) {
        return user.correoElectronico === correoElectronico;
    });

    if (correoExistente) {
        alert("El correo electrónico ya está registrado.");
        return;
    }

    usuarios.push(crearUser);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado con éxito.");

    // Redirige a la página de inicio de sesión
    window.location.href = "../html/login.html";
}
