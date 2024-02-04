import "./login.scss";

function LoginPage() {
  return (
    <div className="login-brackground">
      <h1 className="login-header">
        Bem vindo a{" "}
        <span style={{ color: "#52B788" }}>melhor consultoria online</span> da
        sua vida
      </h1>
      <input
        className="login-input"
        placeholder="Digite seu email"
        type="email"
      />
      <input
        className="login-input"
        placeholder="Digite sua senha"
        type="password"
      />
      <button className="login-button">Login</button>
    </div>
  );
}

export { LoginPage };
