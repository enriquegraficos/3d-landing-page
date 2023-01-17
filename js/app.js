window.onload = function(){
    
    const menuBtn=document.querySelector('.hamburger');
    const menuMobile=document.querySelector('.container-menu-mobile');
   
    menuBtn.addEventListener('click', function(){
        menuBtn.classList.toggle('is-active');
        menuMobile.classList.toggle('is-active');
        

    });
}

// esto se ejecuta despues de que el HTML se ha cargado
document.addEventListener('DOMContentLoaded', function(){

    // objeto con la información del form
    const email = {
        email: '',

    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputContainer = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const spinner = document.querySelector('#spinner');


    //Asignar eventos
    // blur se ejecuta cuando abandonas un campo
    // leer el valor del input
    inputEmail.addEventListener('input', validar);
    btnSubmit.addEventListener('click', enviarEmail);


    // trim elimina espacios en blanco
    // si esta vacio mostramos 
    

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.remove('container-spinner');

        setTimeout(() =>{
            spinner.classList.add('container-spinner');
            resetFormulario();
            
        }, 3000)
       
    }

    function validar(e){
        

        if(e.target.value.trim() ===''){
           mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
           email[e.target.id] = '';
           comprobarEmail();
           return; // detiene la ejecución del código
        }
        limpiarAlerta(e.target.parentElement);
        // se tienen que cumplir las dos condiciones
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }    

        limpiarAlerta(e.target.parentElement);

        // Asignar valores
        email[e.target.id] = e.target.value.trim().toLowerCase();
        // comprobar el objeto de email
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia){
       limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('error-text');
    
        // insertar el error en el container
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.error-text');

        // si hay una alerta la eliminamos
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        // expresión regular
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }


    function comprobarEmail(){
        
        // este código nos va a retornar true si al menos un campo esta vacio
       if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity');
            btnSubmit.disabled = true;
            return
       }
            btnSubmit.classList.remove('opacity');
            btnSubmit.disabled = false;
       
    }

    function resetFormulario(){
        // Reiniciar el objeto
        email.email='';

        inputContainer.reset();
        comprobarEmail();
    }
});
