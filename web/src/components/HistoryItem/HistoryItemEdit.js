import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { capitalizeFirstLetters } from "../../utils";
import DatePicker from "../DatePicker";
import TextField from "../TextField";
import { HISTORY_TYPE } from "../../hooks/useHistoryList";

const Header = styled(Typography)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  margin: "24px 0",
});

const Body = styled("div")({
  // some styling
});

const Title = styled("span")({
  marginLeft: "8px",
  whiteSpace: "nowrap",
});

const HistoryItemEdit = forwardRef((props, ref) => {
  const { historyItem } = props;
  const organisationType =
    props.type === HISTORY_TYPE.work ? "company" : "school";
  const titleType = props.type === HISTORY_TYPE.work ? "position" : "degree";
  const [organisation, setOrganisation] = useState(
    historyItem.organisation || ""
  );
  const [title, setTitle] = useState(historyItem.title || "");
  const [startDate, setStartDate] = useState(
    historyItem.start_date ? new Date(historyItem.start_date) : null
  );
  const [endDate, setEndDate] = useState(
    historyItem.end_date ? new Date(historyItem.end_date) : null
  );
  const [description, setDescription] = useState(historyItem.description || "");

  useImperativeHandle(
    ref,
    () => ({
      getValue: () => ({
        organisation,
        title,
        start_date: startDate,
        end_date: endDate,
        description,
        mapId: historyItem.mapId
      }),
    }),
    [description, endDate, historyItem.mapId, organisation, startDate, title]
  );

  return (
    <div>
      <Header variant="h3">
        <span>
          <IconButton
            color="secondary"
            aria-label="cancel"
            sx={{ padding: "0" }}
            onClick={props.removeItemByIndex.bind(this, props.index)}
          >
            <DoNotDisturbOnIcon />
          </IconButton>
        </span>
        <Title>{`${capitalizeFirstLetters(props.type)} ${
          props.index + 1
        }`}</Title>
      </Header>
      <Body>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label={`${capitalizeFirstLetters(organisationType)} *`}
              value={organisation}
              onChange={({ target }) => setOrganisation(target.value)}
              error={!organisation}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label={`${capitalizeFirstLetters(titleType)} *`}
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              error={!title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              textInputProps={{ required: true, error: !startDate }}
              label="Start date *"
              value={startDate}
              onChange={setStartDate}
              error={!startDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End date"
              value={endDate}
              onChange={setEndDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              textarea
              label="Description"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </Grid>
        </Grid>
      </Body>
    </div>
  );
});

export const HistoryItemProps = PropTypes.shape({
  organisation: PropTypes.string,
  title: PropTypes.string,
  start_date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  end_date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  description: PropTypes.string,
});


HistoryItemEdit.displayName ="HistoryItemEdit"

HistoryItemEdit.propTypes = {
  historyItem: HistoryItemProps,
  index: PropTypes.number.isRequired,
  mapId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired,
  removeItemByIndex: PropTypes.func.isRequired,
};

export default HistoryItemEdit;
