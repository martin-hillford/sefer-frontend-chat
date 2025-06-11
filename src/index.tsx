import React from 'react';
import ReactDOM from 'react-dom/client';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from './themes/default';
import { UserRole } from 'types/User';
import ChatWindow from "./components/ChatWindow";
import config from './config.json';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Container = styled.div`
    height: 90%;
    width: 90%;
    left:5%;
    top:5%;
    position: absolute;
    border:1px solid rgb(12, 73, 122);
`;

root.render(
  <React.StrictMode>
    <Container>
      <ThemeProvider theme={defaultTheme}>
        <ChatWindow
          userRole={config.user.role as UserRole}
          userId={config.user.id}
          userName={config.user.name}
          token={config.token}
          api={config.api}
          showBackToDashboard
          showChannelTools
        />
      </ThemeProvider>
    </Container>
  </React.StrictMode>
);
