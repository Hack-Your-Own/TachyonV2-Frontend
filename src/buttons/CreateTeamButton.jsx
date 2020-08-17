import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";

const url = "https://hyo-backend.herokuapp.com/discord/CreateTeam";

const CreateTeamButton = ({ selected }) => {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");

  const handleClick = () => setOpen(!open);

  const handleSubmit = () => {
    handleClick();
    const memberList = selected.map((student) =>
      student.discord_id.replace(/\D/g, "")
    );

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        teamName,
        memberList,
      })
    );
  };

  return (
    <div className="">
      <Button color="primary" variant="contained" onClick={handleClick}>
        Create Team
      </Button>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please check that these are the students you want to be part of a
            team.
          </DialogContentText>
          <DialogContentText>
            Total students selected: {selected.length}
          </DialogContentText>
          {selected &&
            selected.map((student) => (
              <div className="">
                <DialogContentText>
                  Name: {student.name}
                  {<br />}Email: {student.email}
                </DialogContentText>
              </div>
            ))}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Team Name"
            fullWidth
            onChange={(event) => setTeamName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create Team
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateTeamButton.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CreateTeamButton;
