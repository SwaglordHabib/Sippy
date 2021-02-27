import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Groups, IGroup } from './Group/Groups';
import "./i18n/config";

export interface IAppProps { }

export const App: React.FunctionComponent<IAppProps> = (props: React.PropsWithChildren<IAppProps>) => {
  const { t } = useTranslation(['Home']);

  return (
    <div className="App" style={{ height: "100vh" }}>
      <header style={{ height: "54px", borderBottom: "1px", borderColor: "black" }}>
        <h1 style={{ margin: 0, color: "black", display: "flex", alignItems: "left", marginLeft: "1rem" }}>{t('Home:Title')}</h1>
      </header>
      <div>
        <Groups Item={{} as IGroup}></Groups>
      </div>
      <div>
        {/* List */}
      </div>

    </div>
  );
};