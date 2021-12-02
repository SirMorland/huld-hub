import { Typography } from "@mui/material";
import React from "react";

import Page from "../components/Page/Page";

function errorPage({errorCode}) {

    return(
        <Page>
            <div align="center">
                <Typography variant="h2" color="secondary" fontSize="30px">{errorCode} OOPS!!!😢</Typography> <br />
                {errorCode === 404 && <Typography variant="h2" color="primary" fontSize="20px">The Page you are looking at is not found</Typography>}
                {errorCode === 403 && <Typography variant="h2" color="primary" fontSize="20px">You are not authorized to see this page</Typography>}
            </div>
        </Page>
    );
}

export default errorPage;

