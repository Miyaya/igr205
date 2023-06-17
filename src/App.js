import './App.css';
import Home from './view/mindmap/Home';
import Slides from './view/slides/Slides';


import { createSwitchNavigator } from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";

const state = {
  routes:  {
    home: Home,
    slides: Slides
  },
};

const MyNavigator = createSwitchNavigator(state.routes);
const App = createBrowserApp(MyNavigator);

export default App;
