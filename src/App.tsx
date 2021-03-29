import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Groups, IGroup } from './components/Group/Groups';
import "./i18n/config";
import { Heading } from './components/Heading/Heading';
import { IUser, User } from './components/User/User';
import { IMember, Member } from './components/Members/Members';
import { Copyright } from './Pages/SignIn/SignIn';
import history from './Router/history';
import { Stack } from '@fluentui/react';

export interface IAppProps { }

export const App: React.FunctionComponent<IAppProps> = (props: React.PropsWithChildren<IAppProps>) => {
  const { t } = useTranslation(['Home']);

  const [user, setUser] = React.useState({} as IUser);
  const [group, setGroup] = React.useState<IGroup[]>([]);
  const [selected, setSelected] = React.useState<number | null>(null);

  const [fetches, setFetch] = React.useState(0);
  if (fetches === 0) {
    setFetch(1);
    Load(setUser, setGroup, setSelected);
  }


  return (
    <div className="App" >
      <header style={{ height: "54px", borderBottom: "1px", borderColor: "black" }}>
        <h1 className={"App-title"}>Sippy</h1>
      </header>
      <div className={"App-Margin"}>
        <User User={user} />
      </div>
      <div className={"App-Margin"}>
        <Heading Title={t("Home:Groups")} OnClick={() => { history.push("/newgroup"); }} />
        <Stack horizontal>
          {group.map((g, i) => <Groups key={i} Item={g} OnClick={() => setSelected(i)} Highlighted={i === selected} />)}
        </Stack>
      </div>
      {selected != null && <div className={"App-Margin"}>
        <Heading Title={t("Home:Members")} />
        {group[selected].Members.map((m, i) => <Member Member={m} key={i} Update={()=> Load(setUser, setGroup, setSelected)}/>)}
      </div>}
      <footer className={"App-Footer"}>
        <span className={"App-Footer-Text"}>{Copyright}</span>
      </footer>
    </div>
  );
};

function Load(setUser: React.Dispatch<React.SetStateAction<IUser>>, setGroup: React.Dispatch<React.SetStateAction<IGroup[]>>, setSelected: React.Dispatch<React.SetStateAction<number | null>>) {
  getMe().then((response) => response.json()).then((data) => {
    const u = mapJSONUser(data);
    setUser(u);
    getGroupsByUser(u).then((response) => response.json()).then((data) => {
      const gs: IGroup[] = [];
      for (let i = 0; i < data.length; i++) {
        const g = mapJSONGroups(data, i);
        gs.push(g);
      }
      setGroup([...gs]);
      if (gs.length > 0) {
        if (gs[0].Members.length > 0) {
          setSelected(0);
        }
      }
    });
  });
}

function mapJSONGroups(data: any, i: number): IGroup {
  return { DisplayName: data[i]["displayname"], Id: data[i]["id"], Open: data[i]["open"], Total: data[i]["total"], Members: data[i]["members"].map((item: any) => { return { Id: item["id"], DisplayName: item["displayname"], Open: item["open"], Total: item["total"], Image: item["image"], GroupID: data[i]["id"] } as IMember; }) } as IGroup;
}

function mapJSONUser(data: any): IUser {
  return { DisplayName: data["displayname"], Id: data["id"], Image: data["image"], Open: data["open"], Total: data["total"] } as IUser;
}

function getMe() {
  return fetch("http://localhost:8080/api/user/me", {
    method: "GET", mode: "cors", headers: { "Accept": "application/json", "Content-Type": "application/json", }, credentials: 'include'
  });
}

function getGroupsByUser(u: IUser) {
  return fetch("http://localhost:8080/api/group/" + u.Id.toString(), {
    method: "GET", mode: "cors", headers: { "Accept": "application/json", "Content-Type": "application/json", }, credentials: 'include'
  });
}
