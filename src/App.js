import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [dataList, setDataList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    ).then((res) => {
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
                      <th class="column1">Id</th>
                      <th class="column2">FirstName</th>
                      <th class="column3">LastName</th>
                      <th class="column4">Email</th>
                      <th class="column5">Phone</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div id="table-data">
                <table>
                  <tbody>
                    {newDataList.map((data) => (
                      <tr
                        class={`data-row ${
                          activeRow && activeRow.id === data.id && "active"
                        }`}
                        key={data.id}
                        onClick={() => setActiveRow(data)}
                      >
                        <td class="column1">{data.id}</td>
                        <td class="column2">{data.firstName}</td>
                        <td class="column3">{data.lastName}</td>
                        <td class="column4">{data.email}</td>
                        <td class="column5">{data.phone}</td>
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
                  <textarea cols="50" rows="5" readonly>
                    {activeRow.description}
                  </textarea>
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
