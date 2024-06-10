function login() {
    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;

    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Usuario predeterminado con rol "Administrador"
    var usuarioAdministrador = {
        correoElectronico: "admin@admin.com",
        password: "admin123",
        rol: "Administrador"
    };

    // Agregar el usuario predeterminado solo si no existe ya en la lista
    var usuarioExistente = usuarios.find(function (user) {
        return user.correoElectronico === usuarioAdministrador.correoElectronico;
    });

    if (!usuarioExistente) {
        usuarios.push(usuarioAdministrador);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // Verificar las credenciales del usuario ingresado
    var encontrado = usuarios.some(function (user) {
        return user.correoElectronico === correo && user.password === password;
    });

    if (encontrado) {
        var rolUsuario = usuarios.find(function (user) {
            return user.correoElectronico === correo;
        }).rol;

        // Redirigir a la página correspondiente según el rol del usuario
        if (rolUsuario === "Administrador") {
            window.location.href = "menuadministratos.html";
        } else {
            window.location.href = "menuclientec.html";
        }
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}
