import React, { useState, useEffect } from 'react';
import * as figlet from 'figlet';
import styled from 'styled-components';

// アスキーアートはpreで囲んでフォントを合わせる
const AsciiArtPre = styled.pre`
  line-height: 1rem;
  font-family: 'PixelMplus10';
`;

interface AsciiArtProps {
  name: string;
  font?: figlet.Fonts;
  decoration?: (param: string) => string;
}

const AsciiArt = ({
  name = '',
  font = 'Standard',
  decoration = (param: string) => param,
}: AsciiArtProps) => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    // アスキーアートを作る
    figlet.defaults({ fontPath: '/fonts' });
    figlet.text(name, { font: font }, function (_, data) {
      if (data) {
        setOutput(decoration(data));
      }
    });
  }, [name]);

  return <AsciiArtPre>{output}</AsciiArtPre>;
};

export default AsciiArt;
