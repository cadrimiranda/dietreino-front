import { useContext, useEffect, useState } from "react";
import { useFetch } from "use-http";
import classNames from "classnames";
import Button from "antd/lib/button";
import { AngleRight, CustomIcon } from "../../../components/icons";
import { AngleLeft } from "../../../components/icons/AngleLeft";
import { UserPageContext } from "./UserPageContext";

const UserDetail = ({
  name,
  value,
  description,
}: {
  name: string;
  value: string;
  description?: string;
}) => {
  return (
    <li
      title={description}
      style={{
        cursor: description ? "help" : "auto",
      }}
    >
      <p>
        <b>
          {name}
          {description ? " * " : ""}:
        </b>{" "}
        {value}
      </p>
    </li>
  );
};

const UserAnthropometricResults = () => {
  const { user } = useContext(UserPageContext);
  const [isVisible, setIsVisible] = useState(false);
  const { data, get, loading } = useFetch(
    `/anthropometricreport/user/${user?.id}`
  );

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (user) {
      get();
    }
  }, [user]);

  return (
    <>
      <Button
        size="large"
        className={classNames({
          "user-details-btn-unhide": true,
          "user-details-btn-unhide--invisible": isVisible,
        })}
        onClick={toggleVisibility}
      >
        <CustomIcon width="20px" icon={AngleLeft} color="colorWhite" />
        Resultados antropometricos
      </Button>
      <section
        className={classNames({
          "user-details-section": true,
          "user-details-section--visible": isVisible,
          "user-details-section--hidden": !isVisible,
        })}
      >
        <Button
          size="large"
          className="user-details-btn-hide"
          onClick={toggleVisibility}
        >
          <CustomIcon width="20px" icon={AngleRight} color="colorWhite" />
        </Button>
        {loading && <p>loading ....</p>}
        {data && !loading && user && (
          <ul
            className={classNames({
              "user-anthropometric-results": true,
              "user-anthropometric-results--visible": isVisible,
              "user-anthropometric-results--hidden": !isVisible,
            })}
          >
            <UserDetail
              name="Nome"
              value={user?.name + (user?.lastName || "")}
            />
            {/* <UserDetail name="Idade" value={`${data[0].age} anos`} /> */}
            <UserDetail name="Altura" value={`${data[0].height} metros`} />
            <UserDetail name="Peso" value={`${data[0].weight} kg`} />
            <UserDetail name="Peso Ideal" value={`${data[0].idealWeight} kg`} />
            <UserDetail name="IMC" value={data[0].bmi} />
            <UserDetail
              name="Massa Gorda"
              value={`${data[0].bodyFatMass} kg`}
            />
            <UserDetail
              name="% Massa Gorda"
              value={`${data[0].percentageBodyFat}%`}
            />
            <UserDetail name="Massa Magra" value={`${data[0].leanMass} kg`} />
            <UserDetail
              name="% Massa Magra"
              value={`${data[0].percentageLeanMass}%`}
            />
            {/* <UserDetail
            name="Razão cintura / quadril"
            value={data[0].waistHipRatio}
          /> */}
            <UserDetail name="Densidade Corporal" value={data[0].bodyDensity} />
            <UserDetail
              name="Soma de dobras"
              value={`${data[0].sumOfSkinfolds} mm`}
            />

            {/* Section Title for Circumferences */}
            <li className="section-title">Circumferências</li>
            <UserDetail
              name="Ombro"
              value={`${data[0].shoulderCircumference} cm`}
            />
            <UserDetail
              name="Peito"
              value={`${data[0].chestCircumference} cm`}
            />
            <UserDetail
              name="Cintura"
              value={`${data[0].waistCircumference} cm`}
            />
            <UserDetail
              name="Abdômen"
              value={`${data[0].abdomenCircumference} cm`}
            />
            <UserDetail
              name="Coxa Direita"
              value={`${data[0].rightThighCircumference} cm`}
            />
            <UserDetail
              name="Coxa Esquerda"
              value={`${data[0].leftThighCircumference} cm`}
            />
            <UserDetail
              name="Panturrilha Direita"
              value={`${data[0].rightCalfCircumference} cm`}
            />
            <UserDetail
              name="Panturrilha Esquerda"
              value={`${data[0].leftCalfCircumference} cm`}
            />

            {/* Section Title for Skin Folds */}
            <li className="section-title">Dobras Cutâneas</li>
            <UserDetail
              name="Tríceps"
              value={`${data[0].tricepsSkinfold} mm`}
            />
            <UserDetail
              name="Axilar Média"
              value={`${data[0].midAxillarySkinfold} mm`}
            />
            <UserDetail name="Peito" value={`${data[0].chestSkinfold} mm`} />
            <UserDetail
              name="Abdominal"
              value={`${data[0].abdominalSkinfold} mm`}
            />
            <UserDetail
              name="Suprailíaca"
              value={`${data[0].suprailiacSkinfold} mm`}
            />
            <UserDetail
              name="Subescapular"
              value={`${data[0].subscapularSkinfold} mm`}
            />
            <UserDetail name="Coxa" value={`${data[0].thighSkinfold} mm`} />
          </ul>
        )}
      </section>
    </>
  );
};

export { UserAnthropometricResults };
