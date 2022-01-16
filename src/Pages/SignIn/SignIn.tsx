import React from "react";
import "./SignIn.css";
import { useTranslation } from "react-i18next";
import "../../../src/i18n/config";
import { ButtonWithIcon, Icon } from "../../components/Buttons/IconButton";
import { TextFieldType, TextField } from "../../components/TextField/TextField";
import history from "../../Router/history";
import { useAuth } from "../../Hooks/useAuth";
import { Api_signin } from "../../Router/Api_Routes";

export const Copyright = `© 2021-${new Date().getFullYear()} Swaglord Habib aka Manuel Seelig`;

export const SignIn: React.FunctionComponent = () => {
  const { t } = useTranslation(["SignIn"]);

  useAuth();

  const [Username, setusername] = React.useState("");
  const [Password, setpassword] = React.useState("");
  const [Message, setError] = React.useState("");

  return (
    <div className="SignIn">
      <header className={"SignIn-Header"}>
        <h1 className={"SignIn-Headering"}>{t("Home:Title")}</h1>
      </header>
      <div className={"SignIn-Margin"}>
        <TextField
          Title={t("SignIn:username")}
          Type={TextFieldType.Text}
          Placeholder={"example_user"}
          Value={(username: string) => {
            setusername(username);
          }}
        />
        <TextField
          Title={t("SignIn:password")}
          Type={TextFieldType.Password}
          Placeholder={"12354678"}
          Value={(pasword: string) => {
            setpassword(pasword);
          }}
        />
        {Message && <label>{Message}</label>}
        <ButtonWithIcon
          Icon={Icon.Arrow_Right}
          Disabled={!(Username.length > -1) && !(Password.length > -1)}
          Text={t("SignIn:signin")}
          OnClick={signin(Username, Password, setError)}
        />
        <div className={"SignIn-SignIn"}>
          <span className={"SignIn-Text"}>{t("SignIn:textacc")}</span>
          <a className={"SignIn-Colortext"} href={"/signup"}>
            {t("SignIn:signup")}
          </a>
        </div>
      </div>
      <footer className={"SignIn-Footer"}>
        <span className={"SignIn-Footer-Text"}>{Copyright}</span>
      </footer>
    </div>
  );
};

function signin(
  Username: string,
  Password: string,
  setError: React.Dispatch<React.SetStateAction<string>>
): () => void {
  return () => {
    fetch(Api_signin, {
      body: JSON.stringify({
        username: Username,
        password: Password,
      }),
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Username and Password not matching.");
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("accessToken", data);
          history.push("/");
        }
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  };
}
