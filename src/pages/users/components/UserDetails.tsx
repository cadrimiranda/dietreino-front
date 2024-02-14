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

const UserDetails = () => {
  return (
    <section className="user-details-section">
      <ul>
        <UserDetail name="Nome" value="Thiago Heinz" />
        <UserDetail name="Idade" value="42 anos" />
        <UserDetail name="Altura" value="1.79 metros" />
        <UserDetail name="Peso" value="108 kg" />
        <UserDetail name="Peso Ideal" value="115 kg" />
        <UserDetail name="IMC" value="23,10" />
        <UserDetail name="Massa Groda" value="6.29 kg" />
        <UserDetail name="% Massa Groda" value="10,78%" />
        <UserDetail name="Massa Magra" value="52,11 kg" />
        <UserDetail name="% Massa Magra" value="89.22%" />
        <UserDetail name="Razão cintura / quadril" value="0.77" />
        <UserDetail name="Densidade Corporal" value="1,07" />
        <UserDetail name="Soma de dobras" value="77,00 mm" />
        <UserDetail
          name="AMB"
          description="Área Muscular do Braço"
          value="34,58"
        />
        <UserDetail name="AGB" 
          description="Área de Gordura do Braço" value="12,41" />
      </ul>
    </section>
  );
};

export { UserDetails };
