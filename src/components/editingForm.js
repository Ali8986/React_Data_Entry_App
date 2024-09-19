import { useContext, useState, useEffect } from "react";
import { UserContext } from "./DefaultUSerData";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Stack,
  MenuItem,
  Typography,
  Container,
  InputAdornment,
  Button,
} from "@mui/material";
import { Person, Email, VerifiedUser, Send } from "@mui/icons-material";

const FormEditingPage = () => {
  const navigation = useNavigate();
  const [form, setForm] = useContext(UserContext);
  const [editableForm, setEditableForm] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("Data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setEditableForm(parsedData);
    } else {
      setEditableForm(form);
    }
  }, [form]);

  const handleChange = (e, name, id) => {
    const updatedForm = editableForm.map((item) =>
      item.id === id ? { ...item, [name]: e.target.value } : item
    );
    setEditableForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm(editableForm);
    localStorage.setItem("Data", JSON.stringify(editableForm));
    navigation("/");
  };

  return (
    <>
      {editableForm.length > 0 ? (
        <div>
          <form onSubmit={handleSubmit}>
            {editableForm.map((value) => {
              return (
                <Card className="Main_Card" key={value.id}>
                  <CardContent>
                    <Typography gutterBottom className="Text">
                      Edit User
                    </Typography>
                  </CardContent>
                  <Container>
                    <Stack
                      spacing={3}
                      direction="row"
                      justifyContent="space-evenly"
                      sx={{ m: 2 }}
                    >
                      <TextField
                        variant="outlined"
                        label="First Name"
                        value={value.firstName}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => handleChange(e, "firstName", value.id)}
                      />
                      <TextField
                        variant="outlined"
                        label="Last Name"
                        value={value.lastName}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => handleChange(e, "lastName", value.id)}
                      />
                    </Stack>
                    <Stack
                      spacing={3}
                      direction="column"
                      justifyContent="space-evenly"
                      sx={{ m: 2 }}
                    >
                      <TextField
                        variant="outlined"
                        label="Email"
                        value={value.email}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => handleChange(e, "email", value.id)}
                      />
                      <TextField
                        variant="outlined"
                        id="demo-simple-select"
                        label="active"
                        select
                        value={value.type}
                        onChange={(e) => handleChange(e, "type", value.id)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VerifiedUser />
                            </InputAdornment>
                          ),
                        }}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </TextField>
                    </Stack>
                  </Container>
                </Card>
              );
            })}
            <div className="d-flex">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<Send />}
                className="SubmitBtn"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2>No data in the form</h2>
          <Link to="/">Go to Home Page</Link>
        </div>
      )}
    </>
  );
};

export default FormEditingPage;
