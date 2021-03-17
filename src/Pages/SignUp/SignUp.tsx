import React from 'react';
import './SignUp.css';
import { useTranslation } from 'react-i18next';
import "../../../src/i18n/config";
import { ButtonWithIcon, Icon } from '../../components/Buttons/IconButton';
import { CheckBox } from '../../components/CheckBox/CheckBox';
import { TextFieldWithValidation, TextFieldType, Valid, TextField } from '../../components/TextField/TextField';
import { Copyright } from '../SignIn/SignIn';

export interface ISignUpProps { }

export const SignUp: React.FunctionComponent<ISignUpProps> = (props: React.PropsWithChildren<ISignUpProps>) => {
  const { t } = useTranslation(['SignUp']);

  const [Email, setEmail] = React.useState("");
  const [Username, setusername] = React.useState("");
  const [Password, setpassword] = React.useState("");
  const [Retypepassword, setretypepassword] = React.useState("");
  const [TOS, setTOS] = React.useState(false);

  return (
    <div className="SignUp" >
      <header className={"SignUp-Header"}>
        <h1 className={"SignUp-Headering"}>{t('Home:Title')}</h1>
      </header>
      <div className={"SignUp-Margin"}>
        <TextFieldWithValidation
          Title={t('SignUp:email')}
          Type={TextFieldType.Text}
          Placeholder={"example@domain.com"}
          Value={(email: string) => { setEmail(email); }}
          Validate={(value) => ValidateEmail(value)} />
        <TextFieldWithValidation
          Title={t('SignUp:username')}
          Type={TextFieldType.Text}
          Placeholder={"example_user"}
          Value={(username: string) => { setusername(username); }}
          Validate={(value) => ValidateUsername(value)} />
        <TextField
          Title={t('SignUp:password')}
          Type={TextFieldType.Password}
          Placeholder={"12354678"}
          Value={(pasword: string) => { setpassword(pasword); }} />
        <TextFieldWithValidation
          Title={t('SignUp:retypepassword')}
          Type={TextFieldType.Password}
          Placeholder={"12354678"}
          Value={(password: string) => { setretypepassword(password); }}
          Validate={(value) => ValidatePassword(Password, value)} />
        <CheckBox Text={t('SignUp:termsandconditions')} OnClick={(value: boolean) => { setTOS(value); }}></CheckBox>
        <ButtonWithIcon Icon={Icon.Arrow_Right} Disabled={!TOS && !(Username.length > -1) && !(Password.length > -1) && !(Email.length > -1) && !(Retypepassword.length > -1)} Text={t('SignUp:signup')} OnClick={() => {
          fetch("http://localhost:8080/api/register", {
            body: JSON.stringify({
              "username": Username,
              "password": Password,
              "email": Email
            }), method: "POST", mode: "cors", headers: { "Accept": "application/json", "Content-Type": "application/json" }
          });
        }} />
        <div className={"SignUp-SignIn"}>
          <span className={"SignUp-Text"}>{t('SignUp:textacc')}</span>
          <a className={"SignUp-Colortext"} href={"/signin"}>{t('SignUp:signin')}</a>
        </div>
      </div>
      <footer className={"SignUp-Footer"}>
        <span className={"SignUp-Footer-Text"}>{Copyright}</span>
      </footer>
    </div>
  );
};

function ValidatePassword(password: string, retypedPassword: string): Promise<Valid> {
  return new Promise((resolve) => {
    resolve(password === retypedPassword ? Valid.Valid : Valid.Nonvalid);
  });
}

function ValidateUsername(username: string): Promise<Valid> {
  return fetch(`http://localhost:8080/api/Validate/username/${username}`, { mode: "cors", headers: { "Accept": "application/json" } })
    .then((res) => res.json())
    .then(obj => obj["valid"])
    .then((valid: string) => selectValidByString(valid));
}

function ValidateEmail(email: string): Promise<Valid> {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email) ? fetch(`http://localhost:8080/api/Validate/email/${email}`, { mode: "cors", headers: { "Accept": "application/json" } })
    .then((res) => res.json())
    .then(obj => obj["valid"])
    .then((valid: string) => selectValidByString(valid)) : new Promise((resolve) => { resolve(Valid.Nonvalid); });
}
function selectValidByString(valid: string): Valid | PromiseLike<Valid> {
  switch (valid) {
    case "Valid":
      return Valid.Valid;
    case "Nonvalid":
      return Valid.Nonvalid;
    case "Unknown":
    default:
      return Valid.Unknown;
  }
}

