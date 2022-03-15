import { useState } from "react";
import { MainFetchApi } from "./API/api";
import "./App.css";

const initCompany = {
  value: "",
  unrestricted_value: "",
  data: {
    inn: "",
    kpp: "",
    name: {
      full_with_opf: "",
    },
    address: {
      value: "",
    },
  },
};

function App() {
  const [options, setOptions] = useState([]);
  const [company, setCompany] = useState(initCompany);
  const [isOpen, setIsOpen] = useState(false);

  const handleInnChange = async (event) => {
    const companies = await MainFetchApi.findCompanies(event.target.value);
    console.warn("companies", companies);

    if (companies.length > 0) {
      setOptions(companies);
      setIsOpen(true);
    } else {
      setOptions([]);
      setIsOpen(false);
      setCompany(initCompany);
    }
  };

  const handleSelect = (event) => {
    console.warn("handleSelect");
    const company = options.find(
      (element) => element.data.inn === event.target.value
    );
    console.warn("company", company);
    company && setCompany(company);
    setIsOpen(false);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleEsc = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="app">
      <div className="bold">Компания или ИП</div>
      <input
        className="input"
        name="inn"
        onChange={handleInnChange}
        onFocus={handleFocus}
        onKeyDown={handleEsc}
      />
      <div className="blockOptions">
        <div className={isOpen ? "visible" : "hidden"}>
          <datalist
            onClick={handleSelect}
            onSelect={handleSelect}
            style={{ display: isOpen ? "block" : "none" }}
          >
            {isOpen &&
              options.map((element) => {
                return (
                  <option value={element.data.inn} key={element.data.inn}>
                    {element.value}
                  </option>
                );
              })}
          </datalist>
        </div>
      </div>
      <div>Организация (LEGAL)</div>
      <input className="input" value={company.value} />
      <div>Полное наименование</div>
      <input className="input" value={company.data.name.full_with_opf} />
      <div>ИНН/КПП</div>
      <input
        className="input"
        value={
          company.data.inn !== ""
            ? `${company.data.inn} / ${company.data.kpp}`
            : ""
        }
      />
      <div>Адрес</div>
      <input className="input" value={company.data.address.value} />
    </div>
  );
}

export default App;
