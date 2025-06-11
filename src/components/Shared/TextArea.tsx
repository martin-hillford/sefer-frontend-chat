import { KeyboardEvent, useContext, useRef } from 'react';
import styled from 'styled-components';
import ChatContext from 'context/ChatContext';

export interface TextAreaProps {
  value?: string | undefined | null,
  onChange: (value: string) => any
  onKeyUp? : (event: KeyboardEvent<HTMLTextAreaElement>) => any
}

export default (props: TextAreaProps) => {
  const { value, onChange, onKeyUp } = props;
  const ref = useRef<HTMLTextAreaElement>(null);
  const { onFocusModeEnter, onFocusModeLeave } = useContext(ChatContext);

  const onFocus = () => { if (onFocusModeEnter) { onFocusModeEnter(); } };
  const onBlur = () => { if (onFocusModeLeave) { onFocusModeLeave(); } };

  return (
    <div>
      <TextArea
        onChange={event => onChange(event.target.value)}
        value={value ?? ''}
        ref={ref}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${p => p.theme.colors.tertiary};
  color: ${p => p.theme.colors.default};
  background-color: ${p => p.theme.colors.defaultInverse};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  font-size: 1rem;
  margin: 0;
  height: 56px;
  font-family: 'Roboto', sans-serif;
  resize: none;
  font-weight: 300;

  &:focus {
    outline: none;
    border: 1px solid ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.primary};
  }

  &::placeholder {
    color: ${p => p.theme.colors.tertiary};
  }
`;
