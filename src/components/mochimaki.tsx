import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import classNames from 'classnames';
import Mochi from './mochi';

const Mochistage = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  z-index: 2;
  img.jushoku {
    align-self: flex-end;
    opacity: 0;
  }
`;
const Mochimaki = () => {
  interface StringKeyObject {
    [state: string]: any;
  }
  const transitionStyle: StringKeyObject = {
    entering: {
      transition: 'all 1s ease',
      transform: 'translateY(-210px) ',
      opacity: 1.0,
    },
    entered: {
      transition: 'all 1s ease',
      transform: 'translateY(-210px) ',
      opacity: 1.0,
    },
    exiting: {
      transition: 'all 1s ease',
      transform: 'translateY(0)',
    },
    exited: {
      transition: 'all 1s ease',
      transform: 'translateY(0)',
    },
  };

  const callBacks = {
    onEntered: () => {
      throwMochi(true);
    },
    onExit: () => {
      throwMochi(false);
    },
  };

  const [flip, setFlip] = useState(false);
  const [items, addItem] = useState([]);
  const data = useStaticQuery(
    graphql`
      query {
        jushoku: file(relativePath: { eq: "jushoku.svg" }) {
          publicURL
        }
      }
    `,
  );
  const mochimaki = () => {
    console.log('mochi!');
    setFlip(!flip);
  };
  const throwMochi = (throwing: boolean) => {
    if (throwing) {
      addItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    } else {
      addItem([]);
    }
  };
  return (
    <Transition in={flip} timeout={500} {...callBacks}>
      {(state) => (
        <div>
          <Mochistage
            className={classNames('hero-jushoku', {
              throwing: flip,
            })}
          >
            <img
              src={data.jushoku.publicURL}
              onClick={mochimaki}
              style={transitionStyle[state]}
              className="jushoku"
            />
            {items &&
              items.map((item) => (
                <Mochi key={item} itemid={item} />
              ))}
          </Mochistage>
        </div>
      )}
    </Transition>
  );
};

export default Mochimaki;
