import React, { ReactElement, useEffect, useState } from "react"
import styled from 'styled-components'

const AccessCounterContent = styled.div`
  font-size: 30px;
`;

const NumberText = styled.span`
  color: #ebff00;
  background-color: #000000;
  padding: 2px 4px;
  margin: 0 2px;
  box-sizing: border-box;
`;

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
        setAccessStr(String(json["your_access"]).padStart(4, "0"));
        return json;
      })
      .catch(error => {
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
