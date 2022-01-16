import React from "react";
import "./UserSettings.css";
import { useTranslation } from "react-i18next";
import "../../../src/i18n/config";
import { TextFieldType, TextField } from "../../components/TextField/TextField";
import { IUser } from "../../components/User/User";
import {
  ButtonWithIconSmall,
  Icon,
  IconWithButtonSmall,
} from "../../components/Buttons/IconButton";
import { Stack } from "@fluentui/react";
import { useFetch } from "../../Hooks/useFetch";

export const Copyright = `© 2021-${new Date().getFullYear()} Sippy by \n Swaglord Habib aka Manuel Seelig`;

const http_options: RequestInit = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  credentials: "include",
};

export const emptyPic =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=";

export const UserSettings: React.FunctionComponent = () => {
  const { t } = useTranslation(["UserSettings"]);

  const [User, setUser] = React.useState({} as IUser);
  const [fetches, setFetch] = React.useState(0);
  if (fetches === 0) {
    setFetch(1);

    fetch("http://localhost:8080/api/me", { ...http_options, method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      });
  }

  const [DisplayName, setDisplayName] = React.useState("");
  const [ImageChanged, setImageChanged] = React.useState(false);

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const uploadedImage = React.useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (uploadedImage.current != null) {
          if (e.target?.result) {
            uploadedImage.current.src = e.target.result.toString();
          }
        }
      };
      setImageChanged(true);
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current != null) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <div className="UserSettings">
      <div className={"UserSettings-Margin"}>
        <Stack>
          <div className={"UserSettings-Buttons"}>
            <Stack horizontal horizontalAlign={"space-between"}>
              <IconWithButtonSmall
                Icon={Icon.Back}
                Text={t("UserSettings:Back")}
                Disabled={false}
                OnClick={() => {
                  window.history.back();
                }}
              />
              <ButtonWithIconSmall
                Icon={Icon.Save}
                Text={t("UserSettings:Save")}
                Disabled={false}
                OnClick={() => {
                  ImageChanged &&
                    fetch(`http://localhost:8080/api/photo/${User.id}`, {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "text/plain",
                        Authorization: `Bearer ${localStorage.getItem(
                          "accessToken"
                        )}`,
                      },
                      body: uploadedImage.current?.src,
                    });
                  DisplayName &&
                    fetch(`http://localhost:8080/api/user/${User.id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "text/plain",
                        Authorization: `Bearer ${localStorage.getItem(
                          "accessToken"
                        )}`,
                      },
                      credentials: "include",
                      body: JSON.stringify({
                        ...User,
                        displayName: DisplayName,
                      } as IUser),
                    });
                }}
              />
            </Stack>
          </div>
          <input
            style={{ display: "none" }}
            ref={hiddenFileInput}
            type="file"
            accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
            onChange={(e) => handleFileChange(e)}
          />
          <img
            ref={uploadedImage}
            className={"UserSettings-Profil-Picture"}
            alt={"profilepicture"}
            src={User?.image ? User?.image : emptyPic}
            onClick={() => handleClick()}
          ></img>
          <div className={"UserSettings-Change"}>
            <span
              className={"UserSettings-Colortext-Change"}
              onClick={() => handleClick()}
            >
              {t("UserSettings:change")}
            </span>
          </div>
          <div className={"UserSettings-Inputs"}>
            <TextField
              Title={t("UserSettings:Displayname")}
              Type={TextFieldType.Text}
              DefaultValue={DisplayName ? DisplayName : User?.displayName}
              Value={(username: string) => {
                setDisplayName(username);
              }}
            />
          </div>
        </Stack>
        <footer className={"UserSettings-Footer"}>
          <span className={"UserSettings-Footer-Text"}>{Copyright}</span>
        </footer>
      </div>
    </div>
  );
};
