import loopIcon from "../../assets/loop.svg";
import { api } from "../api/api";
import { form } from "../form/form";

class SearchForm {
  constructor(node) {
    this.node = this.searchElement();
    this.render();
  }

  bindEvents() {}

  searchExec(e, next) {
    e.preventDefault();

    const formBody = form.parseToBody(e.target.form);

    console.log(formBody);

    api
      .get(formBody)
      .then((data) => {
        next(data);
        // setImage(data.avatar_url)
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  searchElement() {
    return (
      <form className="search">
        <input className="search__input" type="text" name="query" />
        <button className="control" onClick={this.searchExec(e, next)}>
          <img src={loopIcon} className="icon icon--loop" alt="Loop logo" />
        </button>
      </form>
    );
  }

  render() {
    this.bindEvents();
    return this.searchElement();
  }
}

export const Search = new SearchForm();
