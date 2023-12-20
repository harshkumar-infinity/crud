import "./allCss.css";
import { Button, ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


export default function DashboardData() {

  const navigate = useNavigate();
  const [getdata, setGetdata] = useState([]);
  const [data, setData] = useState({
    title: "",
    Discription: "",
    status: "active",
  });
  const [searchTerm, setSearchTerm] = useState([]);
  const [now, setNow] = useState("");

  const change = (e) => {
    const { value, name } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };


  function getName(e) {
    const val = e.target.value;

    const search = val.toLowerCase();
    setNow(val)
    const sarchh = getdata.filter((data) => {
      const title = data.title.toLowerCase();
      return title.includes(search)
    });
    setSearchTerm(sarchh);


  }


  const get = async (status) => {
    try {
      const result = await axios.get(`http://localhost:5001/api?status=${status}`);
      setGetdata(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5001/api/${id}`);
        get("all");
        toast.success("Data is Deleted , Successfully...!");
        setData({
          title: "",
          Discription: "",
        });
      } catch (error) {
        toast.warning(error);
      }
    }
  };
  // updet
  const [selectid, setSelectid] = useState(0);
  const [show, setShow] = useState(false);

  const handleShow = (id) => {
    const newData = getdata.filter((user) => {
      return id === user._id;
    });
    setShow(true);
    setSelectid(id);
    setData({
      title: newData.map((user) => user.title),
      Discription: newData.map((user) => user.Discription),
      status: newData.map((user) => user.status),
    });
  };
  const handleUpdate = async () => {
    if (data.title.trim() === "" || data.Discription.trim() === "") {
      toast.error("Sorry 🤨 Enter Data");
      return;
    }
    try {
      await axios.put(`http://localhost:5001/api/${selectid}`, data);
      toast.success("data is Updated");
      setShow(false);
      get("all");
    } catch (error) {
      console.log(error);
    }
    setData({
      title: "",
      Discription: "",
      status: "",
    });
  };
  const Notes = () => {
    navigate("/notes");
  };
  return (
    <div className="App">
      <div className="main-box">
        <div className="main">
          <div>
            <h1>Notes</h1>
          </div>
          <div className="Search">
            <input
              type="text"
              placeholder="Search..."
              onChange={getName}
              value={now}
              className="SearchBar"
            />
          </div>
          <div>
            <ToastContainer position="bottom-right" />
          </div>
        </div>
        <hr />
        <ButtonGroup variant="text" color="success" aria-label="text button  group" className="ButtonGroup">
          <Button onClick={() => get("all")} >All</Button>
          <Button onClick={() => get("active")} >Active</Button>
          <Button onClick={() => get("completed")} >Completed</Button>
        </ButtonGroup>
        <div className="input-main-box">
          <Grid container spacing={5}>
            {show ? (
              <>
                <Grid item xs={6}>
                  <TextField
                    className="inputfield"
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    onChange={change}
                    name="title"
                    value={data.title}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    className="inputfield"
                    label="Discription"
                    variant="outlined"
                    onChange={change}
                    name="Discription"
                    value={data.Discription}
                  />
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      value={data.status}
                      label="Status"
                      onChange={change}
                      name="status"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </>
            ) : null}

            <Grid item xs={12}>
              <Button color="success" onClick={show ? handleUpdate : Notes} variant="contained">
                {show ? "Update" : "Create Notes"}
              </Button>
            </Grid>
          </Grid>
        </div>
        {/* Print Data */}
        <div className="getdata">
          <Grid className="grid" container spacing={5}>
            {((searchTerm.length < 0 || now.trim() === "" ? getdata : searchTerm).length > 0) ? (
              (searchTerm.length > 0 ? searchTerm : getdata).map((data, index) => (
                <Grid item xs={3} key={index}>
                  <div className="card">
                    <Grid container spacing={2}>
                      <Grid item xs={7}>
                        {index + 1}.
                      </Grid>
                      <Grid item xs={5} className="status">
                        {data.status}
                      </Grid>
                    </Grid>
                    <h4> {data.title}</h4>
                    <p>{data.Discription}</p>
                    <div className="edit">
                      <EditIcon color="success" onClick={() => handleShow(data._id)} />
                      <span className="delete">
                        <DeleteIcon color="error" onClick={() => handleDelete(data._id)} />
                      </span>
                    </div>
                  </div>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <div className="no-data-found">No data found!</div>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
}