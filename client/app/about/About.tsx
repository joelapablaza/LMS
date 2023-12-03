import React from "react";
import { styles } from "../styles/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white !mb-20">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text_animation"> LearnIt </span>?
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <div className="text-[18px] font-Poppins">
          ¿Estás listo para llevar tus habilidades de programación al siguiente
          nivel? No busques más allá de LearnIt, la principal comunidad de
          programación dedicada a ayudar a los nuevos programadores a alcanzar
          sus metas y desarrollar todo su potencial.
          <br />
          <br />
          Como fundador y CEO de LearnIt, conozco de primera mano los desafíos
          que conlleva aprender y crecer en la industria de la programación. Es
          por eso que creé LearnIt para proporcionar a los nuevos programadores
          los recursos y el apoyo que necesitan para tener éxito.
          <br />
          <br />
          Nuestro canal de YouTube es un tesoro de videos informativos sobre
          todo, desde conceptos básicos de programación hasta técnicas
          avanzadas. Pero eso es solo el principio. Nuestros cursos asequibles
          están diseñados para brindarte la educación de alta calidad que
          necesitas para tener éxito en la industria, sin vaciar tu billetera.
          <br />
          <br />
          En LearnIt, creemos que el precio nunca debería ser un obstáculo para
          alcanzar tus sueños. Es por eso que nuestros cursos tienen precios
          bajos, para que cualquier persona, independientemente de su situación
          financiera, pueda acceder a las herramientas y conocimientos que
          necesita para tener éxito.
          <br />
          <br />
          Pero LearnIt es más que una comunidad; somos una familia. Nuestra
          comunidad solidaria de personas con ideas afines está aquí para
          ayudarte en cada paso del camino, ya sea que estés comenzando o
          buscando llevar tus habilidades al siguiente nivel.
          <br />
          <br />
          Con LearnIt a tu lado, no hay nada que se interponga entre tú y el
          trabajo de tus sueños. Nuestros cursos y comunidad te brindarán la
          orientación, el apoyo y la motivación que necesitas para liberar tu
          máximo potencial y convertirte en un programador habilidoso.
          <br />
          <br />
          ¿Entonces, a qué estás esperando? ¡Únete a la familia LearnIt hoy y
          conquistemos juntos la industria de la programación! Con nuestros
          cursos asequibles, videos informativos y comunidad solidaria, el cielo
          es el límite.
          <br />
          <br />
          <br />
          <span className="text-[22px]">Joel Apablaza -</span>
          <h5 className="text-18px font-Poppins">Fundador y CEO de LearnIt</h5>
        </div>
      </div>
    </div>
  );
};

export default About;
