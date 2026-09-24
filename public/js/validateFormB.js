// ===============================
//  Mostrar / ocultar contraseña
// ===============================
function togglePwd(id) {
  const input = document.getElementById(id);
  const btn = input.parentElement.querySelector(".toggle-password");

  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈";
  } else {
    input.type = "password";
    btn.textContent = "👁";
  }
}

const form = document.getElementById("myForms");

let currentStep = 1;
const step1fields = ["name", "tel", "email"];
const step2fields = ["password", "confirmPassword", "question", "passphrase"];

// ===============================
//  Reglas de seguridad
// ===============================
const securityRules = {
  favColor: {
    pattern: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,30}$/,
    message: "Color favorito: solo letras (3 a 30).",
  },
  petName: {
    pattern: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,30}$/,
    message: "Mascota: solo letras (2 a 30).",
  },
  birthYear: {
    pattern: /^(19\d{2}|20\d{2})$/,
    message: "Año: 4 dígitos.",
  },
};

// ===============================
//  Validación individual
// ===============================
function validateField(id) {
  const input = document.getElementById(id);
  const error = document.getElementById("error-" + id);

  if (!input || !error) return true;
  error.textContent = "";
  input.classList.remove("valid", "invalid");

  if (input.required && input.value.trim() === "") {
    error.textContent = "This field is required";
    input.classList.add("invalid");
    return false;
  }

  if (input.validity.patternMismatch) {
    error.textContent = "Invalid format";
    input.classList.add("invalid");
    return false;
  }

  if (id === "confirmPassword") {
    if (input.value !== document.getElementById("password").value) {
      error.textContent = "Passwords do not match";
      input.classList.add("invalid");
      return false;
    }
  }

  if (id === "passphrase") {
    const q = document.getElementById("question");
    if (!securityRules[q.value]?.pattern.test(input.value.trim())) {
      error.textContent = securityRules[q.value].message;
      input.classList.add("invalid");
      return false;
    }
  }

  input.classList.add("valid");
  return true;
}

// ===============================
//  Validación por eventos
// ===============================
[...step1fields, ...step2fields].forEach((id) => {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener("blur", () => validateField(id));
});

// ===============================
//  Submit del formulario
// ===============================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fields = currentStep === 1 ? step1fields : step2fields;
  let valid = true;
  fields.forEach((id) => {
    if (!validateField(id)) valid = false;
  });

  if (!valid) {
    showToast("Please check errors", "error");
    return;
  }

  const data = Object.fromEntries(new FormData(form));

  // ===============================
  // STEP 1 -> Validación local
  // ===============================
  if (currentStep === 1) {
    currentStep = 2;
    document.getElementById("step-1").classList.add("hidden");
    document.getElementById("step-2").classList.remove("hidden");
    showToast("Step 1 verified", "info");
    return;
  }

  // ===============================
  // STEP 2 -> REGISTRO REAL API
  // ===============================
  const userData = {
    nombre: data.name,
    correo: data.email,
    contrasena: data.password,
    preguntarc: data.question,
    respuestarc: data.passphrase,
  };

  try {
    const response = await fetch("http://localhost:5000/api/sqlserver/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok) {
      showToast(
        `Usuario registrado correctamente (ID ${result.id})`,
        "success",
      );
      form.reset();
      currentStep = 1;

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } else {
      showToast(result.error || "Registration failed", "error");
    }
  } catch (error) {
    console.error(error);
    showToast("Connection error with API", "error");
  }
});
