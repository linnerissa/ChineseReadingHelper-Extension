/*global chrome*/
import React from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./App.css";

const App = () => {
  const [state, setState] = React.useState({
    replaceArticle: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    chrome.storage.local.set({ replaceArticle: event.target.checked });
    console.log("Setting state to ", event.target.checked);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state.replaceArticle}
            onChange={handleChange}
            name="replaceArticle"
          />
        }
        label="Help"
      />
    </FormGroup>
  );
};

export default App;
