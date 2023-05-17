import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AddScenario from './components/AddScenario';
import AllScenario from './components/AllScenario';
import AddVehicle from './components/AddVehicle';
import Addvehiclewithparams from './components/Addvehicleparams';
import AddScenarioedit from './components/Addscenarioedit';
import EditVehicle from './components/EditVehicle';

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
  },{
    path: "/AddVehicle/:id/edit",
    element: (<Addvehiclewithparams />)
  },{
    path: "/AddScenario/:id/edit",
    element: (<AddScenarioedit />)
  },{
    path: "/EditVehicle/:id/:index/edit",
    element: (<EditVehicle />)
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
