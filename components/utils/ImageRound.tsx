import Image from "next/image";
import { ReactNode, type FC } from "react";

/**
 * *  Props
 * @image : Cadena de string con la url de la imagen a mostar
 * @icon : Icono que se mostrara en caso de no ser valida la Url de la imagen
 * @rounded : numero en pixeles para el radio de la imagen
 * @heigth : Altura que tomara la imagen
 * @backgroundColor : Color de fondo en caso de no ser valida la Url de la imagen
 *  */

interface Props {
  image: string | null;
  icon: ReactNode;
  borderRadius?: number;
  heigth?: string;
  backgroundColor?: string;
}

export const ImageRound: FC<Props> = ({
  image,
  icon,
  borderRadius = 10,
  heigth = "100px",
  backgroundColor,
}) => {
  return (
    <>
      <div>
        {image && image.length > 3 ? (
          <div className={`flex items-center`}>
            <Image
              alt="Card background"
              className="object-cover z-1 "
              style={{ width: heigth, height: heigth, borderRadius }}
              src={image}
              width={270}
              height={270}
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-center`}
            style={{
              borderRadius,
              backgroundColor,
              width: heigth,
              height: heigth,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </>
  );
};
