import loopIcon from "../../assets/loop.svg";
import { api } from "../api/api";
import { form } from "../form/form";
import { setUrl } from "../url/url";
import { useState } from "react";
import { setState } from "react";
import getElement from "../getElement/getElement";

class SearchForm {
  constructor(node) {
    this.node = this.element();
  }

  element(defaultValue, setDefaultValue, setQuery) {
    return (
      <form className="search">
        <input
          className="search__input"
          type="text"
          name="query"
          value={defaultValue}
          onChange={(e) => {
            setDefaultValue(e.target.value);
          }}
          placeholder="Zoek naar gebruikers"
        />
        <button
          className="control"
          onClick={(e) => {
            this.searchExec(e, setQuery);
          }}>
          <img
            src={loopIcon}
            className="icon icon--search"
            alt="Search icon"
            id="control-icon"
          />
        </button>
      </form>
    );
  }

  searchExec(e, setQuery) {
    e.preventDefault();
    const formBody = form.parseToBody(e.target.form);
    setQuery(formBody.query);
    setUrl(formBody.query);
  }
}

export const Search = new SearchForm();
