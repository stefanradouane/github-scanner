import { useState } from "react";
import { useEffect } from "react";
import { Search } from "./components/search/search";
import loadingIcon from "./assets/loading.svg";
import loopIcon from "./assets/loop.svg";
import getElement from "./components/getElement/getElement";
import Home from "./components/home/home";
import Portfolio from "./components/portfolio/portfolio";
import { parseQuery } from "./components/url/url";
import { api } from "./components/api/api";

function App() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState({ message: "" });
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    setQuery(parseQuery(window.location).name);
  }, []);
  // useEffect(() => {
  //   return;
  //   console.log(defaultValue);
  // }, [defaultValue]);

  useEffect(() => {
    setLoading(false);
    if (data.user?.id) {
      getElement(".home").classList.add("home--result-found");
      getElement(".search", true).forEach((form) => {
        form.dataset.error = "";
      });
    } else {
      getElement(".home").classList.remove("home--result-found");
      getElement(".search", true).forEach((form) => {
        form.dataset.error = data.message;
      });
    }
  }, [data]);

  useEffect(() => {
    // loading-state changes to true
    if (loading) {
      // Update icons
      getElement(".icon.icon--search", true).forEach((icon) => {
        icon.src = loadingIcon;
      });
      // loading-state changes to false
    } else {
      // Update icon
      getElement(".icon.icon--search", true).forEach((icon) => {
        icon.src = loopIcon;
      });
    }
  }, [loading]);

  useEffect(() => {
    setDefaultValue(query);
    setLoading(true);
    if (query == undefined) {
      getElement(".home").classList.remove("home--result-found");
      setLoading(false);
    } else if (query == "") {
      setData({ message: "" });
      getElement(".home").classList.remove("home--result-found");
      setLoading(false);
    } else {
      api
        .get(query)
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, [query]);

  if (data.message) {
    return (
      <Home
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        setQuery={setQuery}
      />
    );
  }

  return (
    <>
      <Home
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        setQuery={setQuery}
      />
      <Portfolio
        data={data}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        setQuery={setQuery}
      />
    </>
  );
}

export default App;
