import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '../config/routes/setup-routes';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IOwnProps {}

const App: React.FC<IOwnProps> = () => {
  const RoutesNodes = useRoutes(routes);
  const wideAvailableElements = React.useMemo(() => <div id="wideElements" />, []);

  return (
    <>
      {RoutesNodes}
      {wideAvailableElements}
      sdsdfs
    </>
  );
};

export default App;
