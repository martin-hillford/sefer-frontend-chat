interface Props {
    color: string,
    height?: number
}

export const CheckMark = ({ color, height = 48 }: Props) => (
  <svg viewBox="0 0 24 24" height={height} width={height} focusable="false" role="img" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z" fill={color} />
  </svg>
);

export const Close = ({ color, height = 48 }: Props) => (
  <svg viewBox="0 0 24 24" height={height} width={height} focusable="false" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

export const Left = ({ color, height = 48 }: Props) => (
  <svg viewBox="0 0 512 512" height={height} width={height} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path fill="none" stroke={color} strokeLinecap="square" strokeMiterlimit="10" strokeWidth="48" d="M328 112L184 256l144 144" />
  </svg>
);

export const Send = (props: Props & { onClick?: Function }) => {
  const { color, height = 48, onClick } = props;
  const click = () => { if (onClick) onClick(); };
  return (
    <svg onClick={() => click()} viewBox="0 0 16 16" height={height} width={height} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
    </svg>
  );
};

export const User = ({ color, height = 48 }: Props) => (
  <svg viewBox="0 0 20 20" height={height} width={height} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.725 2.146c-1.016.756-1.289 1.953-1.239 2.59.064.779.222 1.793.222 1.793s-.313.17-.313.854c.109 1.717.683.976.801 1.729.284 1.814.933 1.491.933 2.481 0 1.649-.68 2.42-2.803 3.334C3.196 15.845 1 17 1 19v1h18v-1c0-2-2.197-3.155-4.328-4.072-2.123-.914-2.801-1.684-2.801-3.334 0-.99.647-.667.932-2.481.119-.753.692-.012.803-1.729 0-.684-.314-.854-.314-.854s.158-1.014.221-1.793c.065-.817-.398-2.561-2.3-3.096-.333-.34-.558-.881.466-1.424-2.24-.105-2.761 1.067-3.954 1.929z"
    />
  </svg>
);

export const Copy = ({ color, height = 48, onClick }: Props & { onClick: Function }) => (
  <svg onClick={() => onClick()} viewBox="0 0 24 24" height={height} width={height} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);

export const Reply = ({ color, height = 48, onClick }: Props & { onClick: Function }) => (
  <svg onClick={() => onClick()} viewBox="0 0 16 16" height={height} width={height} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
  </svg>
);

export const AddGroup = ({ color, height = 48, onClick }: Props & { onClick?: Function }) => {
  const click = () => { if (onClick) onClick(); };
  return (
    <svg onClick={() => click()} viewBox="0 0 24 24" height={height} width={height} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M8 10H5V7H3v3H0v2h3v3h2v-3h3v-2zm10 1c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.04-.9 2.86c.28.09.59.14.91.14zm-5 0c1.66 0 2.99-1.34 2.99-3S14.66 5 13 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm6.62 2.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84zM13 13c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z" />
    </svg>
  );
};

export const UserGroup = ({ color, height = 48 }: Props) => (
  <svg viewBox="0 0 24 24" height={height} width={height} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export const Trash = ({ color, height = 48, onClick }: Props & { onClick?: Function }) => {
  const click = () => { if (onClick) onClick(); };
  return (
    <svg onClick={() => click()} viewBox="0 0 512 512" height={height} width={height} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" />
      <path stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352" />
      <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40m-64 64v224m-72-224 8 224m136-224-8 224" />
    </svg>
  );
};

export const Save = ({ color, height = 48, onClick }: Props & { onClick?: Function }) => {
  const click = () => { if (onClick) onClick(); };
  return (
    <svg viewBox="0 0 24 24" onClick={() => click()} height={height} width={height} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5.75A2.75 2.75 0 0 1 5.75 3h9.96c.87 0 1.7.34 2.3.95L20.05 6c.6.6.95 1.43.95 2.3v9.96A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25V5.75zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25C6 13.01 7 12 8.25 12h7.5c1.24 0 2.25 1 2.25 2.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.29c0-.47-.18-.91-.51-1.24L16.95 5c-.26-.26-.6-.43-.95-.49v2.73c0 1.24-1 2.25-2.25 2.25h-4.5C8.01 9.5 7 8.5 7 7.25V4.5H5.75zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25h9zm-8-15v2.75c0 .41.34.75.75.75h4.5c.41 0 .75-.34.75-.75V4.5h-6z" />
    </svg>
  );
};
