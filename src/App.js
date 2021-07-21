import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [dataList, setDataList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://60eedf19eb4c0a0017bf468a.mockapi.io/data").then((res) => {
      res.json().then((result) => {
        setLoading(false);
        setDataList(result);
      });
    });
  }, []);
  const newDataList = dataList.filter((data) =>
    data.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="App">
      {loading ? (
        <div className="preloader-container">
          <img src="/preloader.gif" alt="loading" />
        </div>
      ) : (
        <main>
          <div id="table-section">
            <form action="/">
              <img src="./search-icon.svg" alt="Search Icon" />
              <input
                type="text"
                placeholder="Enter something"
                name="search-box"
                id="search-box"
                value={searchText}
                onChange={({ target: { value } }) => setSearchText(value)}
              />
            </form>

            <div id="table-wrapper">
              <div id="table-headers">
                <table>
                  <thead>
                    <tr>
                      <th className="column1">Id</th>
                      <th className="column2">FirstName</th>
                      <th className="column3">LastName</th>
                      <th className="column4">Email</th>
                      <th className="column5">Phone</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div id="table-data">
                <table>
                  <tbody>
                    {newDataList.map((data) => (
                      <tr
                        className={`data-row ${
                          activeRow && activeRow.id === data.id && "active"
                        }`}
                        key={data.id}
                        onClick={() => setActiveRow(data)}
                      >
                        <td className="column1">{data.id}</td>
                        <td className="column2">{data.firstName}</td>
                        <td className="column3">{data.lastName}</td>
                        <td className="column4">{data.email}</td>
                        <td className="column5">{data.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="info-wrapper">
            <h1>Details</h1>
            <p>Click on a table item to get detailed information</p>
            {activeRow && (
              <div id="info-content">
                <div>
                  <b>User selected:</b> {activeRow.firstName}{" "}
                  {activeRow.lastName}
                </div>
                <div>
                  <b>Description: </b>
                  <textarea
                    cols="50"
                    rows="5"
                    readOnly
                    value={activeRow.description}
                  ></textarea>
                </div>
                <div>
                  <b>Address:</b>
                  {activeRow.address.streetAddress}
                </div>
                <div>
                  <b>City:</b>
                  {activeRow.address.city}
                </div>
                <div>
                  <b>State:</b>
                  {activeRow.address.state}
                </div>
                <div>
                  <b>Zip:</b>
                  {activeRow.address.zip}
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
