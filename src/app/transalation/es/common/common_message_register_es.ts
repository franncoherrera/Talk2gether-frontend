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
  terms_and_conditions: {
    terms_and_conditions_title: 'Términos y condiciones',
  },
};
