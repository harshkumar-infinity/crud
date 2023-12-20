import React, { useState } from "react";
import "./allCss.css";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function CreateNots() {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    Discription: "",
    status: "active",
  });

  const change = (e) => {
    const { value, name } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const click = async () => {
    try {
      if (data.title.trim() === "" || data.Discription.trim() === "") {
        toast.error("Sorry 🤨 Enter Data");
        return;
      }
      await axios.post(`http://localhost:5001/api`, {
        title: data.title.trim(),
        Discription: data.Discription.trim(),
        status: data.status,
      });
      toast.success("data is created 😱");
      Navigate("/dashboard");
      setData({
        title: "",
        Discription: "",
        status: "active", // reset status to "active"
      });
    } catch (error) {
      toast.error("Sorry 🤨 Enter Data");
      console.log(error);
    }
  };

  return (
    <div className="main-box1">
      <h1 className="hed">Create Notes</h1>
      <div className="main">
        <div className="input-main-box">
          <ToastContainer position="bottom-right" />
          <Grid container spacing={6}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Button variant="contained" className="button" onClick={click}>
              Create
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
}
