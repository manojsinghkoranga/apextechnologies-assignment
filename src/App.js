import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AddScenario from './components/AddScenario';
import AllScenario from './components/AllScenario';
import AddVehicle from './components/AddVehicle';
import Test from './components/test';

const router = createBrowserRouter ([
  {
    path: "/",
    element: (<Home />)
  },{
    path: "/AddScenario",
    element: (<AddScenario />)
  },{
    path: "/AllScenario",
    element: (<AllScenario />)
  },{
    path: "/AddVehicle",
    element: (<AddVehicle />)
  }
])

function App() {
  return (
    <RouterProvider router={router} />
    // <Test />
  );
}

export default App;
