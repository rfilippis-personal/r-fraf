import { Suspense, useRef } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import ViewportList from "react-viewport-list";
import { Input, InputGroup, Panel } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import Container from "../../components/UI/container/container";
import { Title } from "../../styles";
import { getCountries } from "./large-cards-list-service";
import style from "./large-cards-list.module.css";
import { useState } from "react";

const Card = (props) => {
  const { imgSrc, nativeName, officialName, currencies } = props;

  return (
    <Panel shaded bordered bodyFill className={style["main-panel"]}>
      <img src={imgSrc} alt="flag ilustration" />
      <Panel header={nativeName}>
        <div className={style.item}>
          <small>
            <label>Official name:</label>
            <div title={officialName} className={style.value}>
              {officialName}
            </div>
          </small>
        </div>
        <div className={style.item}>
          <small>
            <label>Currencies symbol:</label>
            {currencies &&
              Object.entries(currencies).map(([key, value]) => {
                return (
                  <div key={key} className={style.value}>
                    - {value.name} : {value.symbol}
                  </div>
                );
              })}
          </small>
        </div>
      </Panel>
    </Panel>
  );
};

const filterData = (data, search) => {
  return data.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
};

const LargeCardsList = () => {
  const ref = useRef(null);
  const loaderData = useLoaderData();
  const [inputSearch, setInputSearch] = useState("");

  return (
    <Container>
      <Title>Large cards countries list</Title>

      <Suspense fallback={<div>Loading countries...</div>}>
        <Await resolve={loaderData.countries}>
          {(resolvedCountries) => {
            const filteredCountries = filterData(
              resolvedCountries,
              inputSearch
            );
            return (
              <div className={style["scroll-container"]} ref={ref}>
                <InputGroup inside className={style["input-search"]}>
                  <Input
                    placeholder="Seach in countries by name"
                    value={inputSearch}
                    onChange={(value) => setInputSearch(value)}
                  />
                  <InputGroup.Addon>
                    <SearchIcon />
                  </InputGroup.Addon>
                </InputGroup>
                <ViewportList viewportRef={ref} items={filteredCountries}>
                  {(item) => {
                    return (
                      <Card
                        key={item.cca2}
                        nativeName={item.name.common}
                        officialName={item.name.official}
                        imgSrc={item.flags.png}
                        currencies={item.currencies}
                      />
                    );
                  }}
                </ViewportList>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </Container>
  );
};

export default LargeCardsList;

export function loader() {
  const countries = getCountries();
  return defer({ countries });
}
