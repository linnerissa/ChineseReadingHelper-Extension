import React from "react";
import ReactDOM from "react-dom";
import "./content.css";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButton from "@material-ui/lab/ToggleButton";
import fetch from "node-fetch";

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="article">
          {this.props.body.detailedSegments.map((item) => (
            <ToolTipButton
              className="wordbutton"
              word={item[0]}
              pronunciation={item[1]}
              key={item[2]}
            />
          ))}
        </div>
      </div>
    );
  }
}

function ToolTipButton({ word, pronunciation }) {
  const [selected, setSelected] = React.useState(false);
  const [translation, setTranslation] = React.useState("");
  if (pronunciation === word || pronunciation === "") {
    return word;
  }
  return (
    <Tooltip title={pronunciation}>
      <ToggleButton
        size="small"
        selected={selected}
        translation={translation}
        value={word}
        onChange={() => {
          if (translation === "") {
            callTranslationAPI(word).then((res) => {
              if (
                res &&
                res.translatedText &&
                res.translatedText.basic &&
                res.translatedText.basic.explains &&
                res.translatedText.basic.explains.length > 0
              )
                setTranslation(format(res.translatedText.basic.explains[0]));
            });
          }
          setSelected(!selected);
        }}
      >
        {selected ? translation : word}
      </ToggleButton>
    </Tooltip>
  );
}

function format(definition) {
  return definition.replace(/\W/g, "");
}

async function callTranslationAPI(toTranslateText) {
  const response = await fetch(
    "http://localhost:5001/translate?text=" + toTranslateText,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function callBackendAPI() {
  fetch("http://localhost:5001/news", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const path =
    "http://localhost:5001/article?url=" +
    encodeURIComponent(window.location.href);
  console.log("Path: ", path);
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

// const app = document.createElement("div");
// app.id = "my-extension-root";
// document.body.appendChild(app);
let article = document.getElementsByClassName("main-left");
if (article.length === 0) {
  article = document.getElementsByClassName("main-aticle");
}

callBackendAPI().then((body) => {
  ReactDOM.render(
    <React.StrictMode>
      <Main body={body} />
    </React.StrictMode>,
    article[0]
  );
});
