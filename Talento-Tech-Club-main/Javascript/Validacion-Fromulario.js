document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    
    function mostrarAlerta(mensaje) {
        const alertaExistente = document.querySelector('.alerta-personalizada');
        if (alertaExistente) {
            alertaExistente.remove();
        }

        const alerta = document.createElement('div');
        alerta.classList.add('alerta-personalizada');
        alerta.innerHTML = `
            <div class="alerta-contenido">
                <img src="../img/tarjetas.png" style="height: 100px;" alt="logo" class="logo-header">
                <p>${mensaje}</p>
            </div>
        `;

        form.insertBefore(alerta, form.firstChild);

        const estilosAlerta = `
            .alerta-personalizada {
                background-color: rgba(255, 0, 0, 0.46);
                border: 1px solid rgba(249, 174, 0, 0.658);
                color: rgba(255, 211, 107, 0.932);
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                animation: aparecer 0.3s ease-out;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .alerta-contenido {
                display: flex;
                align-items: center;
            }
            .alerta-icono {
                margin-right: 10px;
                font-size: 24px;
            }
            @keyframes aparecer {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;

        
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = estilosAlerta;
        document.head.appendChild(styleSheet);

        
        setTimeout(() => {
            if (alerta) {
                alerta.remove();
            }
        }, 5000);
    }
    
    form.addEventListener('submit', function(event) {
        
        event.preventDefault();
        
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const mensajeInput = document.getElementById('mensaje');
        
        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();
        
        if (nombre === '' || email === '' || mensaje === '') {
            
            mostrarAlerta('Por favor, complete todos los campos del formulario');
            
            
            console.log('Por favor, complete todos los campos');
            
            
            if (nombre === '') nombreInput.classList.add('error');
            if (email === '') emailInput.classList.add('error');
            if (mensaje === '') mensajeInput.classList.add('error');
            
            return; 
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            
            mostrarAlerta('Por favor, ingrese un email valido');
            
            console.log('Por favor, ingrese un email valido');
            
            emailInput.classList.add('error');
            return;
        }
        
        console.log('Todos los campos estan completos');
        console.log('Nombre:', nombre);
        console.log('Email:', email);
        console.log('Mensaje:', mensaje);
        
        mostrarAlerta('Formulario enviado correctamente');
        
        form.submit();
    });
    
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});



