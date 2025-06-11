import styled, { useTheme } from 'styled-components';
import { useState } from 'react';
import { CheckMark } from 'icons';

interface Props {
    selected: boolean,
    onChange: (value: boolean) => any
}

const CheckBox = (props: Props) => {
  const { selected, onChange } = props;
  const [focus, setFocus] = useState(false);
  const theme = useTheme();
  const color = selected ? theme.colors.primary : 'transparent';

  const onClick = () => {
    onChange(!selected);
  };

  return (
    <Base
      onClick={() => onClick()}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      focus={focus}
    >
      <CheckMark color={color} height={28} />
    </Base>
  );
};

interface BaseProps {
    focus: boolean,
}

const Base = styled.div<BaseProps>`
  height: 24px;
  width: 24px;
  border: 1px solid ${p => (p.focus ? p.theme.colors.primary : p.theme.colors.tertiary)};
  box-sizing: border-box;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;

  svg {
    margin-top:2px;
    margin-left:-4px;
    height: 20px;
    width: 20px;
    box-sizing: border-box;
    display:block;
  }

  user-select: none;
  &:focus-visible { outline:none; }

`;

export default CheckBox;
