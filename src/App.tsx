import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Groups, IGroup } from './components/Group/Groups';
import "./i18n/config";
import { Heading } from './components/Heading/Heading';
import { IUser, User } from './components/User/User';
import { Guid } from 'guid-typescript';
import { IMember, Member } from './components/Members/Members';
import { Copyright } from './Pages/SignIn/SignIn';

export interface IAppProps { }

export const App: React.FunctionComponent<IAppProps> = (props: React.PropsWithChildren<IAppProps>) => {
  const { t } = useTranslation(['Home']);

  const [user, setUser] = React.useState({} as IUser);

  const [fetches, setFetch] = React.useState(0);
  if (fetches === 0) {
    setFetch(1);
    fetch("http://localhost:8080/api/user/me", {
      method: "GET", mode: "cors", headers: { "Accept": "application/json", "Content-Type": "application/json", }, credentials: 'include'
    }).then((response) => response.json()).then((data) => {
      const u = { DisplayName: data["displayname"], Id: data["id"], Image: data["image"], Open: data["open"], Total: data["total"] } as IUser;
      setUser(u);
    });
  }


  return (
    <div className="App" >
      <header style={{ height: "54px", borderBottom: "1px", borderColor: "black" }}>
        <h1 style={{ margin: 0, color: "black", display: "flex", alignItems: "left", marginLeft: "1rem" }}>{t('Home:Title')}</h1>
      </header>
      <div className={"App-Margin"}>
        <User User={user} />
      </div>
      <div className={"App-Margin"}>
        <Heading Title={t("Home:Groups")} />
        <Groups Item={{ DisplayName: "Jägermeister", Id: Guid.create(), Open: 71, Total: 235 } as IGroup} />
      </div>
      <div className={"App-Margin"}>
        <Heading Title={t("Home:Members")} />
        <Member Member={{ ...user } as IMember}></Member>
      </div>
      <footer className={"App-Footer"}>
        <span className={"App-Footer-Text"}>{Copyright}</span>
      </footer>
    </div>
  );
};