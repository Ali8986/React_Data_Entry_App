import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./DefaultUSerData";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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
  IconButton,
} from "@mui/material";
import {
  Person,
  Email,
  VerifiedUser,
  AddBox,
  Delete,
  Send,
} from "@mui/icons-material";

const UserForm = () => {
  var UniqueId = uuidv4().split("-")[1];
  const { state } = useLocation();

  const navigate = useNavigate();

  const [condition, setCondition] = useState(false);
  const { cards, setCards, setUserdetails, userDetails } =
    useContext(UserContext);
  const handleInputChange = (index, field, value) => {
    const updatedForm = [...cards];
    updatedForm[index][field] = value;
    setCards(updatedForm);
  };
  useEffect(() => {
    if (state) {
      setCards([
        {
          firstName: "",
          lastName: "",
          email: "",
          status: "active",
          id: UniqueId,
        },
      ]);
    }
  }, [setCards]);

  const handleSubmit = (e, cardsArr) => {
    e.preventDefault();
    cardsArr.forEach((card) => {
      const newUser = {
        id: card.id,
        firstName: card.firstName,
        lastName: card.lastName,
        email: card.email,
        type: card.status,
      };
      setUserdetails((prevuserDetails) => {
        localStorage.setItem(
          "Data",
          JSON.stringify([...prevuserDetails, newUser])
        );
        const updateduserDetails = [...prevuserDetails, newUser];
        return updateduserDetails;
      });
    });

    navigate("/");
  };
  const handleDeleteCard = (id) => {
    var newCards = cards.filter((c) => c.id !== id);
    setCards(newCards);

    if (cards.length < 3) {
      setCondition(false);
    }
  };
  const handleAddingCard = (id) => {
    var index = cards.findIndex((value) => value.id === id);
    cards[0].id = UniqueId + id;
    var newCard = {
      firstName: "",
      lastName: "",
      email: "",
      status: "active",
      id: UniqueId,
    };
    const updatedCards = [
      ...cards.slice(0, index + 1),
      newCard,
      ...cards.slice(index + 1),
    ];
    setCards(updatedCards);

    setCondition(true);
  };
  return (
    <div>
      <div className="d-flex">
        <div className="sub-a width-75">
          <Link to="/">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<KeyboardBackspaceIcon />}
              className="SubmitBtn"
            >
              Back
            </Button>
          </Link>
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e, cards)}>
        {cards.map((card, index) => {
          return (
            <Card className="Main_Card" key={card.id}>
              <CardContent>
                <Typography gutterBottom className="Text">
                  Add New User
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
                    value={card.firstName}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      handleInputChange(index, "firstName", e.target.value)
                    }
                  />
                  <TextField
                    variant="outlined"
                    label="Last Name"
                    value={card.lastName}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      handleInputChange(index, "lastName", e.target.value)
                    }
                  />
                </Stack>
                <Stack
                  spacing={3}
                  direction="column"
                  justifyContent="space-evenly"
                  sx={{ m: 2 }}
                  required
                >
                  <TextField
                    variant="outlined"
                    label="Email"
                    value={card.email}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                  <TextField
                    variant="outlined"
                    id="demo-simple-select"
                    label="active"
                    select
                    value={card.status}
                    onChange={(e) =>
                      handleInputChange(index, "status", e.target.value)
                    }
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
              <>
                {state.from ? (
                  <IconButton
                    className="addBtn"
                    onClick={() => handleAddingCard(card.id)}
                  >
                    <AddBox className="size" />
                  </IconButton>
                ) : null}
              </>

              {condition ? (
                <IconButton
                  className="deleteBtn "
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <Delete className="size" />
                </IconButton>
              ) : null}
            </Card>
          );
        })}
        <div className="d-flex">
          <div className="sub width-75">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Send />}
              className="SubmitBtn"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
