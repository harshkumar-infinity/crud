import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function TextForm() {
  const [show, setShow] = useState(false);
  const [allData, setAllData] = useState([]);
  const [id, setId] = useState(0);
  const [info, setInfo] = useState({
    title: "",
    description: "",
  });

  // close handler for model
  const handleClose = () => {
    setShow(false);
    setInfo({
      title: "",
      description: "",
    });
  };

  // onchange event for new and update data
  const GetData = (e) => {
    const { name, value } = e.target;
    setInfo((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  console.log(info);
  // api for post data to node
  const toServer = async () => {
    if (info.title.trim() === "" || info.description.trim() === "") {
      return;
    }
    try {
      await axios.post("http://localhost:5000/user", info);
      const result = await axios.get("http://localhost:5000/user");
      setAllData(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    setInfo({
      title: "",
      description: "",
    });
  };

  // function for get api
  const display = async () => {
    const result = await axios.get("http://localhost:5000/user");
    setAllData(result.data);
  };

  useEffect(() => {
    display();
  }, []); // when add new data or update old data

  // model show functiion
  const handleShow = (index) => {
    setInfo({
      title: allData[index].title,
      description: allData[index].description,
    });
    setId(index); // for index of card
    setShow(true);
  };

  // api for delete data from node
  const deleteData = async (index) => {
    console.log(allData[index]._id);
    await axios.delete(`http://localhost:5000/user/${allData[index]._id}`);
    display();
  };

  // api for update and put data
  const savData = async (index) => {
    if (info.title.trim() === "" || info.description.trim() === "") {
      return;
    }
    setInfo({
      title: "",
      description: "",
    });
    handleClose();
    await axios.put(`http://localhost:5000/user/${allData[id]._id}`, info);
  };

  return (
    <>
      <div className="textform">
        <div className="container">
          <h1>Title & Description</h1>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                label="Title"
                value={info.title}
                name="title"
                variant="standard"
                className="input-Size"
                color="success"
                onChange={GetData}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Description"
                value={info.description}
                name="description"
                variant="standard"
                className="input-Size"
                color="success"
                onChange={GetData}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="btngrp">
                <button onClick={toServer}>Done</button>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {allData.map((user, index) => (
            <>
              <Grid item xs={4}>
                <div className="company-card">
                  <h2 className="company-name">{user.title}</h2>
                  <p className="type">{user.description}</p>
                  <button onClick={() => deleteData(index)}>Delete</button>
                  <button onClick={() => handleShow(index)}>Update</button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="New Title"
                            autoFocus
                            value={info.title}
                            name="title"
                            variant="standard"
                            color="success"
                            onChange={GetData}
                          />
                          <br />
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="New Description"
                            value={info.description}
                            name="description"
                            variant="standard"
                            color="success"
                            onChange={GetData}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="success" onClick={() => savData(index)}>
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Grid>
            </>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default TextForm;
