import { Container, Typography } from "@mui/material";
import React, { Fragment } from "react";

export const Home = () => {

    return (
        <Fragment>
            <Container maxWidth="sm">
                <Typography
                    variant="h1"
                    padding={3}
                    textAlign={"center"}>
                    Welcome
                </Typography>
                <Typography
                    variant="p"
                    padding={3}
                    textAlign={"center"}>
                    We appreciate you joining our club. You now have exclusive access to new arrivals and sales.
                </Typography>
            </Container>
        </Fragment>
    )

}