import React from 'react';
import './NewGroup.css';
import { useTranslation } from 'react-i18next';
import "../../i18n/config";
import { TextFieldType, TextField } from '../../components/TextField/TextField';
import { IUser } from '../../components/User/User';
import { ButtonWithIcon, Icon, IconButton, IconWithButtonSmall } from '../../components/Buttons/IconButton';
import { IMember, Role, SimpleMember } from '../../components/Members/Members';
import { Guid } from 'guid-typescript';
import { BigHeading } from '../../components/Heading/Heading';
import history from '../../Router/history';

export const Copyright = `© 2021-${new Date().getFullYear()} Sippy by \n Swaglord Habib aka Manuel Seelig`;

export interface IGroup {
  iD: Guid;
  displayName: string;
  open: number;
  total: number;
}


export const emptyPic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=";

export const NewGroup: React.FunctionComponent = () => {
  const { t } = useTranslation(['NewGroup']);

  const [fetches, setFetch] = React.useState(0);
  if (fetches === 0) {
    setFetch(1);
    fetch("http://localhost:8080/api/me", {
      method: "GET", mode: "cors", headers: { "Accept": "application/json", "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("accessToken")}` }, credentials: 'include'
    }).then((response) => response.json()).then((data) => {
      const u = { displayName: data["displayName"], id: data["id"], image: data["image"], open: data["open"], total: data["total"] } as IUser;
      setGroupmembers([...Groupmembers, { ...u, joined: new Date(), role: Role.Admin, }]);
    });
  }

  const [Groupname, setGroupname] = React.useState("");
  const [Groupmembers, setGroupmembers] = React.useState<IMember[]>([]);


  return (
    <div className="NewGroup" >
      <div className={"NewGroup-Margin"}>
        <IconWithButtonSmall Icon={Icon.Back} Text={t('NewGroup:Back')} Disabled={false} OnClick={() => { window.history.back(); }} />
        <BigHeading Title={t('NewGroup:CreateGroup')} />
        <div className={"NewGroup-Inputs"}>
          <TextField
            Title={t('NewGroup:Groupname')}
            Type={TextFieldType.Text}
            Value={(groupname: string) => { setGroupname(groupname); }} />
        </div>
        <div className={"NewGroup-Friends"}>
          <span className={"textfield-title"}>{t('NewGroup:Friends')}</span>
          {Groupmembers.map(m => <SimpleMember Member={m} key={Guid.create().toString()} />)}
          <div className={"center"}>
            <IconButton Icon={Icon.Plus} OnClick={() => { throw new Error("NotImplemeted")}} />
          </div>
        </div>
        <div className={"NewGroup-Create"}>
          <ButtonWithIcon Icon={Icon.Plus} OnClick={() => {
            fetch("http://localhost:8080/api/group/", {
              body: JSON.stringify({ displayName: Groupname, } as IGroup),
              method: "POST",
              mode: "no-cors",
              headers: { "Accept": "application/json", "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
              credentials: 'include'
            }
            ).then((response) => {
              if (response.status === 200) {
                history.push("/");
              }
              if (response.status === 403) {
                history.push("/signin");
              }
            });
          }} Text={t('NewGroup:Create')} />
        </div>
      </div>
    </div>
  );
};
