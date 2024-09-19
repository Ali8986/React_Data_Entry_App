import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation, json } from "react-router-dom";
import { useContext } from "react";
import { UserContext, UserCard } from "./DefaultUSerData";
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
  const handleInputChange = (id, field, value) => {
    setUserCard((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  const [condition, setCondition] = useState(false);

  const [users, setUsers] = useContext(UserContext);
  const [userCard, setUserCard] = useContext(UserCard);

  useEffect(() => {
    if (state) {
      setUserCard([
        {
          firstName: "",
          lastName: "",
          email: "",
          status: "active",
          id: UniqueId,
        },
      ]);
    }
  }, [setUserCard]);

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
      setUsers((prevUsers) => {
        localStorage.setItem("Data", JSON.stringify([...prevUsers, newUser]));
        const updatedUsers = [...prevUsers, newUser];
        return updatedUsers;
      });
    });

    navigate("/");
  };
  const handleDeleteCard = (id) => {
    var newCards = userCard.filter((c) => c.id !== id);
    setUserCard(newCards);

    if (userCard.length < 3) {
      setCondition(false);
    }
  };
  const handleAddingCard = (id) => {
    var index = userCard.findIndex((value) => value.id === id);
    userCard[0].id = UniqueId + id;
    var newCard = {
      firstName: "",
      lastName: "",
      email: "",
      status: "active",
      id: UniqueId,
    };
    const updatedCards = [
      ...userCard.slice(0, index + 1),
      newCard,
      ...userCard.slice(index + 1),
    ];
    setUserCard(updatedCards);

    setCondition(true);
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, userCard)}>
        {userCard.map((card) => {
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
                      handleInputChange(card.id, "firstName", e.target.value)
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
                      handleInputChange(card.id, "lastName", e.target.value)
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
                      handleInputChange(card.id, "email", e.target.value)
                    }
                  />
                  <TextField
                    variant="outlined"
                    id="demo-simple-select"
                    label="active"
                    select
                    value={card.status}
                    onChange={(e) =>
                      handleInputChange(card.id, "status", e.target.value)
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
      </form>
    </div>
  );
};

export default UserForm;
