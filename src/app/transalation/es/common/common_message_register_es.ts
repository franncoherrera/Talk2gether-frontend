/* Mensajes del modulo "common_register" */
export const common_register = {
  register_step_1: {
    title: 'Datos personales',
    name_label: 'Nombre*',
    surname_label: 'Apellido*',
    dateBorn_label: 'Fecha de Nacimiento*',
    email_label: 'Correo electrónico*',
    password_label: 'Constraseña*',
    error: {
      valid_name: 'El nombre ingresado no es válido.',
      valid_surname: 'El apellido ingresado no es válido',
      valid_email: 'El texto ingresado no es un correo válido.',
      valid_password: 'La contraseña debe contener mínimo 8 caracteres, una mayúscula y un número.',
      must_password: 'La contraseña es obligatoria.',
      must_equal: 'Las contraseñas no coinciden.',
      must_complete: 'Debe completar este campo.',
      obligatory_field: 'Este campo es obligatorio.',

    },
    placeHolder: {
      nameLabel: 'Nombre',
      surnameLabel: 'Apellido',
      emailLabel: 'Correo electrónico',
      passwordLabel: 'Ingrese su contraseña'
    },
  },
  register_step_2: {
    country_label: 'Pais*',
    country_select: 'Selecciona un país',
    native_language_label: 'Idioma Nativo*',
    native_language_select: 'Selecciona tu idioma nativo',
    photo_label: 'Foto de Perfil*',
    description_label: 'Cuéntanos un poco de ti',
    terms_label: 'Acepto los términos y condiciones*',
    learn_language_label: 'Idioma a aprender*',
    learn_language_select: 'Selecciona su idioma a aprender',
    language_level_label: 'Nivel de idioma*',
    language_level_select: 'Selecciona su nivel de idioma',
    interest_label: 'Intereses*',
    interest_empty_label: 'Intereses',

    error: {
      must_complete: 'Debe completar este campo.',
      must_photo: 'Debe subir una foto de perfil.',
      must_term: 'Debe aceptar los términos y condiciones.',
      valid_photo: 'El formato del archivo seleccionado no es válido. Debe seleccionar una imagen con formato ',
      limit_size_photo: 'La foto de perfil no debe superar los 5MB.',
      max_description_character: 'Máximo 200 caracteres.',
      must_interest: 'Debe seleccionar al menos un interés.'
    },
    
    button_prev: 'Volver',
    button_next: 'Regístrate'
  },
  terms_and_conditions: {
    terms_and_conditions_title: 'Términos y condiciones',
  },
};
