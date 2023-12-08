import React from 'react';
import { styles } from '../styles/style';

const Policy = () => {
  return (
    <div className="mb-20 text-black dark:text-white">
      <div className="w-[95%] !800px:w-[82%] m-auto py-2 px-3 text-white my-10">
        <h1 className={`${styles.title} !text-center pt-2 800px:!text-[45px]`}>
          Políticas y condiciones &{' '}
          <span className="text_animation">Condiciones</span>
        </h1>
      </div>
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <ul style={{ listStyle: 'unset', marginLeft: '15px' }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Una de nuestras principales prioridades en el sitio web de LearnIt
            (learnit.com) es la privacidad de la información de nuestros
            usuarios. Este documento contiene información detallada sobre qué
            información recopilamos del sitio web de LearnIt y cómo la
            utilizamos.
            <br />
            Si tienes alguna pregunta o necesitas más información sobre nuestra
            política de privacidad, no dudes en contactarnos.
            <br />
            Esta Política de Privacidad se aplica solo a nuestras actividades en
            línea y es válida para la información compartida por los visitantes
            de nuestro sitio web y/o recopilada del sitio web de LearnIt. Esta
            política no se aplica a la información recopilada fuera de línea o a
            través de canales distintos a este sitio web.
          </p>
          <br />
          <br />
          <li className="text-[22px] text-cyan-400">Consentimiento</li>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Al utilizar nuestro sitio web, se considera que aceptas nuestra
            Política de Privacidad y nuestros Términos.
          </p>
          <br />
          <br />
          <li className="text-[22px] text-cyan-400">
            ¿Qué información recopilamos?
          </li>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Cuando te pedimos que proporciones tu información personal en el
            sitio web, se te informará claramente por qué se te solicita. <br />
            Si nos contactas directamente, podemos recopilar información
            adicional sobre ti, como tu nombre, dirección de correo electrónico,
            número de teléfono, contenido de la comunicación y/o cualquier
            archivo adjunto u otra información que nos envíes. <br />
            Al abrir una cuenta en nuestro sitio web, debes proporcionar cierta
            información personal, como tu nombre, dirección de correo
            electrónico, foto, número de teléfono móvil, nombre de usuario de
            Discord, dirección, etc. Además, podemos solicitar información
            adicional según sea necesario con tu permiso. No compartimos tu
            información con nadie sin tu permiso y mantenemos la
            confidencialidad de la información.
          </p>
          <br />
          <br />
          <li className="text-[22px] text-cyan-400">
            Confidencialidad de las contraseñas personales
          </li>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            La contraseña que se te pide que ingreses para iniciar sesión al
            abrir una cuenta en nuestro sitio web está cifrada y se almacena de
            forma segura en nuestra base de datos. Como resultado, no podemos
            ver el contenido original de tu contraseña. Por lo tanto, la
            privacidad de tu contraseña está adecuadamente protegida en nuestro
            sitio web. Además, para proteger la privacidad de tu contraseña,
            nunca la compartas con nadie. Si crees que tu contraseña ha sido
            comprometida por otra persona, cambia tu contraseña desde el sitio
            web inmediatamente. Si no puedes cambiar la contraseña de alguna
            manera, contacta con nuestro soporte.
          </p>
          <br />
          <br />
          <li className="text-[22px] text-cyan-400">Cookies</li>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Al igual que todos los demás sitios web, el sitio web de LearnIt y
            el navegador utilizan cookies (&apos;cookies&apos;). Estas cookies
            se utilizan para almacenar información, incluidas las preferencias
            de los visitantes y las páginas del sitio web que el visitante ha
            accedido o visitado. La información se utiliza para optimizar la
            experiencia de los usuarios personalizando el contenido de nuestras
            páginas web según el tipo de navegador y/o otra información de los
            visitantes.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
