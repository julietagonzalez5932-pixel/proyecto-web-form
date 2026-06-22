document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formContacto");
    const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valido = true;

        form.querySelectorAll(".form-control, .form-select").forEach(function (campo) {
            campo.classList.remove("is-invalid", "is-valid");
        });

        const camposRequeridos = form.querySelectorAll("[required]");
        camposRequeridos.forEach(function (campo) {
            if (!campo.value.trim()) {
                campo.classList.add("is-invalid");
                valido = false;
            } else if (campo.getAttribute("minlength") && campo.value.trim().length < parseInt(campo.getAttribute("minlength"))) {
                campo.classList.add("is-invalid");
                valido = false;
            } else {
                campo.classList.add("is-valid");
            }
        });

        const emailCampo = document.getElementById("email");
        if (emailCampo && emailCampo.value.trim()) {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(emailCampo.value.trim())) {
                emailCampo.classList.add("is-invalid");
                emailCampo.classList.remove("is-valid");
                valido = false;
            }
        }

        const telCampo = document.getElementById("telefono");
        if (telCampo && telCampo.value.trim()) {
            const regexTel = /^\d+$/;
            if (!regexTel.test(telCampo.value.trim())) {
                telCampo.classList.add("is-invalid");
                valido = false;
            } else {
                telCampo.classList.add("is-valid");
            }
        }

        if (!valido) {
            e.preventDefault();
            e.stopPropagation();

            const primerError = form.querySelector(".is-invalid");
            if (primerError) {
                primerError.scrollIntoView({ behavior: "smooth", block: "center" });
                primerError.focus();
            }
            return;
        }

        const esLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:";

        if (esLocal) {
            e.preventDefault();
            mostrarConfirmacion();
        } else {
            mostrarConfirmacion();
        }
    });

    function mostrarConfirmacion() {
        if (mensajeConfirmacion) {
            mensajeConfirmacion.style.display = "block";
            mensajeConfirmacion.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        setTimeout(function () {
            form.reset();
            form.querySelectorAll(".form-control, .form-select").forEach(function (campo) {
                campo.classList.remove("is-valid", "is-invalid");
            });
        }, 400);
        setTimeout(function () {
            if (mensajeConfirmacion) {
                mensajeConfirmacion.style.display = "none";
            }
        }, 6000);
    }
});



