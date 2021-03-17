import React from 'react';
import './SignIn.css';
import { useTranslation } from 'react-i18next';
import "../../../src/i18n/config";
import { ButtonWithIcon, Icon } from '../../components/Buttons/IconButton';
import { TextFieldType, TextField } from '../../components/TextField/TextField';
import history from '../../Router/history';

export const Copyright = `© 2021-${new Date().getFullYear()} Swaglord Habib aka Manuel Seelig`;

export interface ISignInProps { }

export const SignIn: React.FunctionComponent<ISignInProps> = (props: React.PropsWithChildren<ISignInProps>) => {
  const { t } = useTranslation(['SignIn']);

  const [fetches, setFetch] = React.useState(0);
  if (fetches === 0) {
    setFetch(1);
    fetch("http://localhost:8080/api/signin", {
      body: "", method: "POST", mode: "cors", headers: { "Accept": "application/json", "Content-Type": "application/json", }, credentials: 'include'
    }).then((response) => {
      if (response.status === 200) {
        history.push("/");
      }
    });
  }
  const [Username, setusername] = React.useState("");
  const [Password, setpassword] = React.useState("");

  return (
    <div className="SignIn" >
      <header className={"SignIn-Header"}>
        <h1 className={"SignIn-Headering"}>{t('Home:Title')}</h1>
      </header>
      <div className={"SignIn-Margin"}>
        <TextField
          Title={t('SignIn:username')}
          Type={TextFieldType.Text}
          Placeholder={"example_user"}
          Value={(username: string) => { setusername(username); }} />
        <TextField
          Title={t('SignIn:password')}
          Type={TextFieldType.Password}
          Placeholder={"12354678"}
          Value={(pasword: string) => { setpassword(pasword); }} />
        <ButtonWithIcon Icon={Icon.Arrow_Right} Disabled={!(Username.length > -1) && !(Password.length > -1)} Text={t('SignIn:signin')} OnClick={() => {
          fetch("http://localhost:8080/api/signin", {
            body: JSON.stringify({
              "username": Username,
              "password": Password,
            }), method: "POST", mode: "cors", headers: { "Accept": "application/json", "Content-Type": "application/json", }, credentials: 'include'
          }).then((response) => {
            if (response.status === 200) {
              history.push("/");
            }
          });
        }} />
        <div className={"SignIn-SignIn"}>
          <span className={"SignIn-Text"}>{t('SignIn:textacc')}</span>
          <a className={"SignIn-Colortext"} href={"/signup"}>{t('SignIn:signup')}</a>
        </div>
      </div>
      <footer className={"SignIn-Footer"}>
        <span className={"SignIn-Footer-Text"}>{Copyright}</span>
      </footer>
    </div>
  );
};
