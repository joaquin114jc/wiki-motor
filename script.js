// Seleccionamos el botón por su ID
const btn = document.getElementById('theme-toggle');

// Escuchamos el "click" del usuario
btn.addEventListener('click', () => {
    // Le quitamos o ponemos la clase 'dark-mode' al body
    document.body.classList.toggle('dark-mode');
    
    // Cambiamos el texto del botón según el estado
    if (document.body.classList.contains('dark-mode')) {
        btn.textContent = "Modo Claro";
    } else {
        btn.textContent = "Modo Oscuro";
    }
});
const hpInput = document.getElementById('hp-input');
const calcBtn = document.getElementById('calc-btn');
const resultText = document.getElementById('result');

calcBtn.addEventListener('click', () => {
    const hp = parseFloat(hpInput.value);

    if (!isNaN(hp)) {
        const kw = (hp * 0.7457).toFixed(2); // Calculo con 2 decimales
        resultText.textContent = `Resultado: ${kw} kW`;
        resultText.style.color = "#2ecc71"; // Un color verde éxito
    } else {
        resultText.textContent = "Por favor, ingresa un número válido.";
        resultText.style.color = "red";
    }
});
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});
calcBtn.addEventListener('click', () => {
    const hp = parseFloat(hpInput.value);

    if (!isNaN(hp)) {
        const kw = (hp * 0.7457).toFixed(2);
        
        // Animación rápida de parpadeo como una luz de cambio de marcha
        resultText.style.opacity = "0";
        setTimeout(() => {
            resultText.textContent = `PERFORMANCE: ${kw} kW`;
            resultText.style.opacity = "1";
            resultText.style.color = "#d5001c"; // Rojo Porsche
        }, 150);
        
    } else {
        resultText.textContent = "INPUT ERROR";
        resultText.style.color = "white";
    }
});
function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(windowReveal => {
        const windowHeight = window.innerHeight;
        const elementTop = windowReveal.getBoundingClientRect().top;
        const elementVisible = 150; // Distancia en px para activar

        if (elementTop < windowHeight - elementVisible) {
            windowReveal.classList.add("active");
        }
    });
}

// Escuchamos el evento de scroll
window.addEventListener("scroll", reveal);

// Llamamos una vez al cargar por si el usuario ya está en medio de la página
reveal();
const datosMotores = {
    "subaru_h4": { nombre: "Subaru H4", tipo: "Bóxer 4 cil.", potencia: "152-182 HP", ventaja: "Equilibrio simétrico" },
    "subaru_diesel": { nombre: "Subaru EE20", tipo: "Bóxer 4 cil. Diesel", potencia: "150 HP", ventaja: "Torque alto a bajas RPM" },
    "porsche_h6": { nombre: "Porsche H6", tipo: "Bóxer 6 cil. Biturbo", potencia: "394 HP", ventaja: "Rendimiento extremo" },
    "lancia_v6": { nombre: "Lancia V6", tipo: "V6 a 65°", potencia: "190 HP", ventaja: "Agilidad en Rally" }
};

const sel1 = document.getElementById('motor1');
const sel2 = document.getElementById('motor2');
const tablaRes = document.getElementById('resultado-comparacion');

function comparar() {
    const m1 = datosMotores[sel1.value];
    const m2 = datosMotores[sel2.value];

    if (m1 && m2) {
        tablaRes.innerHTML = `
            <table class="quick-spec">
                <tr><th>Atributo</th><th>${m1.nombre}</th><th>${m2.nombre}</th></tr>
                <tr><td><strong>Configuración</strong></td><td>${m1.tipo}</td><td>${m2.tipo}</td></tr>
                <tr><td><strong>Potencia</strong></td><td>${m1.potencia}</td><td>${m2.potencia}</td></tr>
                <tr><td><strong>Ventaja Clave</strong></td><td>${m1.ventaja}</td><td>${m2.ventaja}</td></tr>
            </table>
        `;
    }
}

sel1.addEventListener('change', comparar);
sel2.addEventListener('change', comparar);
const ctx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Subaru H4', 'Subaru Diesel', 'Porsche H6', 'Lancia V6'],
        datasets: [{
            label: 'Caballos de Fuerza (HP)',
            data: [182, 150, 394, 190], // Datos basados en tu contenido técnico
            backgroundColor: '#d5001c', // Rojo Porsche
            borderColor: '#000',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true, grid: { color: '#333' } },
            x: { grid: { display: false } }
        },
        plugins: {
            legend: { labels: { color: 'white', font: { family: 'Arial' } } }
        }
    }
});
function playAudio(file) {
    const audio = new Audio(file);
    audio.play();
}
// En tu script.js
function playLancia() {
    const audio = new Audio('lancia_v6.mp3');
    audio.play();
}
const baseDeDatosMotores = [
    { id: 1, marca: "Porsche", modelo: "911 Carrera", configuracion: "Bóxer 6", cilindrada: 3.0, hp: 394, torque: 450, aspiracion: "Biturbo" },
    { id: 2, marca: "Subaru", modelo: "WRX", configuracion: "Bóxer 4", cilindrada: 2.4, hp: 271, torque: 350, aspiracion: "Turbo" },
    { id: 3, marca: "Lancia", modelo: "Stratos HF", configuracion: "V6 (65°)", cilindrada: 2.4, hp: 190, torque: 226, aspiracion: "Atmosférico" },
    { id: 4, marca: "Saab", modelo: "99 Turbo", configuracion: "L4 Inclinado", cilindrada: 2.0, hp: 145, torque: 235, aspiracion: "Turbo" }
];
function buscarMotor(nombreModelo) {
    // Esto simula un "SELECT * FROM Motores WHERE modelo = nombreModelo"
    return baseDeDatosMotores.find(motor => motor.modelo === nombreModelo);
}

function actualizarComparador() {
    const m1 = buscarMotor(document.getElementById('motor1').value);
    const m2 = buscarMotor(document.getElementById('motor2').value);

    if (m1 && m2) {
        document.getElementById('resultado-comparacion').innerHTML = `
            <table class="quick-spec">
                <tr><th>Atributo</th><th>${m1.modelo}</th><th>${m2.modelo}</th></tr>
                <tr><td>Configuración</td><td>${m1.configuracion}</td><td>${m2.configuracion}</td></tr>
                <tr><td>Cilindrada</td><td>${m1.cilindrada}L</td><td>${m2.cilindrada}L</td></tr>
                <tr><td>Potencia</td><td>${m1.hp} HP</td><td>${m2.hp} HP</td></tr>
                <tr><td>Torque Max.</td><td>${m1.torque} Nm</td><td>${m2.torque} Nm</td></tr>
                <tr><td>Aspiración</td><td>${m1.aspiracion}</td><td>${m2.aspiracion}</td></tr>
            </table>
        `;
    }
}
function reproducirSonidoLancia() {
    // Asegúrate de que el nombre coincida exactamente con el de tu carpeta
    const audio = new Audio('Lancia Stratos HF Group 4 - Ferrari V6 Engine Sound.mp3');
    audio.play();
}
const baseDeDatosMotores = [
    { id: 1, marca: "Porsche", modelo: "911 Carrera", configuracion: "Bóxer 6", hp: 394, peso: 1505, torque: 450, aspiracion: "Biturbo" },
    { id: 2, marca: "Subaru", modelo: "WRX", configuracion: "Bóxer 4", hp: 271, peso: 1540, torque: 350, aspiracion: "Turbo" },
    { id: 3, marca: "Lancia", modelo: "Stratos HF", configuracion: "V6 (65°)", hp: 190, peso: 980, torque: 226, aspiracion: "Atmosférico" },
    { id: 4, marca: "Saab", modelo: "99 Turbo", configuracion: "L4 Inclinado", hp: 145, peso: 1130, torque: 235, aspiracion: "Turbo" }
];
function actualizarComparador() {
    const val1 = document.getElementById('motor1').value;
    const val2 = document.getElementById('motor2').value;
    
    const m1 = baseDeDatosMotores.find(m => m.modelo === val1);
    const m2 = baseDeDatosMotores.find(m => m.modelo === val2);

    if (m1 && m2) {
        // Cálculo de relación peso/potencia
        const rel1 = (m1.peso / m1.hp).toFixed(2);
        const rel2 = (m2.peso / m2.hp).toFixed(2);

        document.getElementById('resultado-comparacion').innerHTML = `
            <table class="quick-spec">
                <tr><th>Especificación</th><th>${m1.modelo}</th><th>${m2.modelo}</th></tr>
                <tr><td><strong>Potencia</strong></td><td>${m1.hp} HP</td><td>${m2.hp} HP</td></tr>
                <tr><td><strong>Peso</strong></td><td>${m1.peso} kg</td><td>${m2.peso} kg</td></tr>
                <tr class="highlight-row">
                    <td><strong>Relación Peso/Potencia</strong></td>
                    <td>${rel1} kg/hp</td>
                    <td>${rel2} kg/hp</td>
                </tr>
                <tr><td><strong>Aspiración</strong></td><td>${m1.aspiracion}</td><td>${m2.aspiracion}</td></tr>
            </table>
        `;
    }
}
function reproducirSonidoLancia() {
    // Usamos el nombre exacto que aparece en tu captura de pantalla
    const audio = new Audio('Lancia Stratos HF Group 4 - Ferrari V6 Engine Sound.mp3');
    audio.play().catch(error => console.log("El navegador bloqueó el audio: ", error));
}
function reproducirSonidoLancia() {
    const audio = new Audio('lancia.mp3'); // Asegúrate que el nombre sea idéntico
    audio.play().catch(error => {
        console.error("Error al reproducir:", error);
        alert("Asegúrate de que el archivo lancia.mp3 esté en la misma carpeta que tu HTML");
    });
}