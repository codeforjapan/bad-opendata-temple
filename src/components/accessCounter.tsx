import * as React from "react";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

const AccessCounter: React.FC = (): ReactElement => {
  const [accessStr, setAccessStr] = useState("LOADING");
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbxNRKPbWajypmgXMrmcwVJCB7uqORyU7MfdLi3O0rIQm98EJCc/exec"
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        setAccessStr(String(json["your_access"]).padStart(4, "0"));
        return json;
      })
      .catch(error => {
        console.error(error);
        setAccessStr("ERROR");
      });
  }, []);

  return (
    <AccessCounterContent>
      あなたは
      {[...accessStr].map((str, index) => {
        return <NumberText key={str + String(index)}>{str}</NumberText>;
      })}
      人目の参拝者です
    </AccessCounterContent>
  );
};

export default AccessCounter;

const AccessCounterContent = styled.div`
  color: #000000;
  font-size: 30px;
  margin: 4px 0;
`;

const NumberText = styled.span`
  color: #ebff00;
  background-color: #000000;
  padding: 2px 4px;
  margin: 0 2px;
  box-sizing: border-box;
`;
