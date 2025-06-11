import styled from 'styled-components';

export interface TextInputProps {
  property: string,
  onChange: (value: string) => any
  placeholder?: string,
  value?: string | undefined | null,
    hasError?: boolean
}

export default (props: TextInputProps) => {
  const { property, placeholder, value, onChange, hasError } = props;

  return (
    <div>
      <Input
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        value={value ?? ''}
        type="text"
        error={hasError === true}
        name={property}
      />
    </div>
  );
};

const Input = styled.input<{error: boolean}>`
  width: 100%;
  height: 40px;
  border: 1px solid ${p => (p.error ? p.theme.colors.error : p.theme.colors.tertiary)};
  color: ${p => (p.error ? p.theme.colors.error : p.theme.colors.default)};
  background-color: ${p => p.theme.colors.defaultInverse};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 4px 16px;
  font-size: 1rem;

  margin: 4px 0;

  &:focus {
    outline: none;
    border: 1px solid ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.primary};
  }

  &::placeholder {
    color: ${p => p.theme.colors.tertiary};
  }
`;
