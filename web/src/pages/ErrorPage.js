import { Typography } from "@mui/material";
import React from "react";


function errorPage() {

    return(

        <div align="center">
            <Typography variant="h2" color="secondary" fontSize="30px">OOPS!!!😢</Typography> <br />
            <Typography variant="h2" color="secondary" fontSize="30px">The Page you are looking at is not found</Typography>
        </div>
    );
}

export default errorPage;