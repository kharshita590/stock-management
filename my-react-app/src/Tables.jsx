import React, { useState, useEffect } from 'react';
//import ReactTableScroll from 'react-table-scroll';
import './style.css';
import axios from 'axios';
import Modal from 'react-modal';
import './tables.css';
import {useParams} from 'react-router-dom';



//styling
const table = {
  border: '1px solid #D3D3D3',
  marginTop: '6rem'
}

const col1 = {
  fontFamily: 'poppins',
  fontWeight: 'light',
  color: '#585B9A'
}

const col2 = {
  fontFamily: 'poppins',
  color: '#585B9A'
}

const col3 = {
  fontFamily: 'poppins',
  color: '#585B9A'
}

const col4 = {
  fontFamily: 'poppins',
  color: '#585B9A'
}

const col5 = {
  fontFamily: 'poppins',
  color: '#585B9A'
}

const row1 = {
  fontFamily: 'poppins',

}
const addBtn = {
  width: '5rem',
  height: '2rem',
  border: 'none',
  marginLeft: '3rem',
  marginTop: '2rem',
  fontFamily: 'poppins',
  backgroundColor: '#CAE2BE',
  cursor: 'pointer',

}
const RemoveBtn = {
  width: '5rem',
  height: '2rem',
  border: 'none',
  marginLeft: '1rem',
  marginTop: '2rem',
  fontFamily: 'poppins',
  backgroundColor: '#F3EC99',
  cursor: 'pointer',
  fontSize: '14px'
}

const saveBtn = {
  width: '5rem',
  height: '2rem',
  border: 'none',
  marginLeft: '58rem',
  marginTop: '2rem',
  fontFamily: 'poppins',
  backgroundColor: '#F3EC99',
  cursor: 'pointer',
  fontSize: '14px'
}
const form1 = {
  display: 'block',
  alignItems: 'center',
  justifyContent: 'center',
}

const Tables = () => {
  const [tableData, setTableData] = useState([
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setremovePopUp(true);
    setIsModalOpen(true);


  }

  const closeModal = () => {
    setIsModalOpen(false);
  }





  const [popUp, setpopUp] = useState(false);
  const[data,setData]=useState('');
  const [removepopUp, setremovePopUp] = useState(false);
  const [dateOfEntry, setdateOfEntry] = useState('');
  const [chemicalName, setchemicalName] = useState('');
  const [quantity, setquantity] = useState('');
  const [dateOfIssue, setdateOfIssue] = useState('');
  const [amount, setamount] = useState('');
  const [quantityLeft, setquantityLeft] = useState('');




const {id}=useParams();
//console.log(id);

  const [newRowData, setNewRowData] = useState({
    sr: tableData.length,
    dateOfEntry: '',
    chemicalName: '',
    quantity: '',
    dateOfIssue: '',
    amount: '',
    quantityLeft: '',


  });

  const [removeData, setRemoveData] = useState({
    sr: tableData.length,
    chemicalName: '',
    quantityToRemove: 0,
    quantity: '',
    quantityLeft: '',

  })


  const handleRow = () => {

    setpopUp(true);

  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRowData({ ...newRowData, [name]: value });
  };

  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setRemoveData({ ...removeData, [name]: value });

  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/chemicals', newRowData)
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))

    setTableData([...tableData, { ...newRowData }]);
    setpopUp(false);
  };



  const handleSubmit1 = (e) => {
    e.preventDefault();

  }

  const handleRemove = (chemicalName, quantityToRemove) => {
    const quantityRemoved = parseInt(quantityToRemove);
    axios
      .post(`http://localhost:3000/chemicals/remove/${chemicalName}`, { quantityRemoved })
      .then((response) => {
        // Handle success, e.g., update the state or display a success message
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error(error);
      });
  };
  const token=localStorage.getItem('token')
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const fetchDataFromBackend = () => {
    axios.get('http://localhost:3000/chemicals',{
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the backend:', error);
      });
  };

  useEffect(() => {
    fetchDataFromBackend();
    // fetchChemicalData();

  }, [tableData]);

const  handleRowClick =(rowId)=>{
  console.log(`Clicked row with ID: ${rowId}`);

}



  return (
    <div>
      <h1>Chemistry Lab Stock Management</h1>
      <div className="container" style={table}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={col1} className="firstCol">
                Sr No.
              </th>
              <th scope="col" style={col4}>
                Date of Entry
              </th>
              <th scope="col" style={col2}>
                Consumable/Non Consumable
              </th>
              <th scope="col" style={col3}>
                Quantity
              </th>
              <th scope="col" style={col4}>
                Date of Issue
              </th>
              <th scope="col" style={col4}>
                Amount
              </th>
              <th scope="col" style={col5}>
                Quantity Left
              </th>
            </tr>
          </thead>
          <tbody className="row1" style={row1}>
            {tableData.map((row, index) => (
              <tr key={row._id} onClick={() => handleRowClick(row._id)}>
                <td>{index + 1}</td>
                <td>{row.dateOfEntry}</td>
                <td>{row.chemicalName}</td>
                <td>{row.quantity}</td>
                <td>{row.dateOfIssue}</td>
                <td>{row.amount}</td>
                <td>{row.quantityLeft}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popUp && (

        <div className="mb-3">
          <div className="cross" onClick={() => setpopUp(false)}>cross</div>
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="dateOfEntry"> Date of entry</label>
              <input
                type="text"
                id="dateOfEntry"
                name="dateOfEntry"
                value={newRowData.dateOfEntry}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>


            <div className="form-group">
              <label htmlFor="chemicalName">Consumable/Non Consumable</label>
              <input
                type="text"
                id="chemicalName"
                name="chemicalName"
                value={newRowData.chemicalName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={newRowData.quantity}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfIssue"> Date of issue</label>
              <input
                type="text"
                id="dateOfIssue"
                name="dateOfIssue"
                value={newRowData.dateOfIssue}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount"> Amount</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={newRowData.amount}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantityLeft">quanity Left</label>
              <input
                type="text"
                id="quantityLeft"
                name="quantityLeft"
                value={newRowData.quantityLeft}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <button style={RemoveBtn} onClick={closeModal} >Submit</button>

          </form>


        </div>

      )}
      <button style={addBtn} onClick={handleRow}>Add+</button>
      <button style={RemoveBtn} onClick={openModal}>Remove-</button>
      {removepopUp && (
        <div className="mb-3" style={{ maxWidth: '300px', marginLeft: '400px', border: '1px solid #d6cfc7', padding: '0.5em 0.5em 0.5em' }}>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={{
              content: {
                maxWidth: '300px',
                margin: '0 auto',
                border: '1px solid #d6cfc7',
                padding: '0.5em 0.5em 0.5em',
                maxHeight: '400px'
              },
            }}
          >
            <div className="cross" onClick={() => setremovePopUp(false)}>X</div>

            <form onSubmit={handleSubmit1} style={form1}>

              <div className="form-group">
                <label htmlFor="chemicalName">Consumable/Non Consumable</label>
                <input
                  type="text"
                  id="chemicalName"
                  name="chemicalName"
                  value={removeData.chemicalName}
                  onChange={handleInputChange1}
                  className="form-control"
                />
              </div>


              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={removeData.quantity}
                  onChange={handleInputChange1}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="QuantityToRemove" >Quantity Removed</label>
                <input
                  type="text"
                  id="QuantityToRemove"
                  name="quantityToRemove"
                  value={removeData.quantityToRemove}
                  onChange={handleInputChange1}
                  className="form-control"


                />
              </div>

              <div className="form-group">
                <label htmlFor="quantityLeft">quantity Left</label>
                <input
                  type="text"
                  id="quanityLeft"
                  name="quantityLeft"
                  value={removeData.quantityLeft}
                  onChange={handleInputChange1}
                  className="form-control"

                />
              </div>

              <button style={RemoveBtn} onClick={() => handleRemove(removeData.chemicalName, removeData.quantityToRemove)}>Subtract</button>

              <button style={RemoveBtn} onClick={closeModal}>Submit</button>

            </form>


          </Modal>
        </div>


      )}


      <button style={saveBtn} >Save</button>

      <footer>
        <h3>&copy; 2023 Harshita Kumari. All rights reserved.</h3>
      </footer>

    </div>

  )
}
export default Tables;