import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import AddCityFromCountry from "../AddCityFromCountry";
import AddCityFromState from "../AddCityFromState";
import AddCountry from "../AddCountry";
import AddState from "../AddState";
import AddTrip from "../AddTrip";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import PasswordReset from "../PasswordReset";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Wrapper from "../Wrapper";

// Pages
import About from "../../pages/About";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Travel from "../../pages/Travel";
import State from "../../pages/State";
import CityFromCountry from "../../pages/CityFromCountry";
import CityFromState from "../../pages/CityFromState";
import Trip from "../../pages/Trip";
import NoMatch from "../../pages/noMatch";

// User State
import { useUserContext } from "../../state/UserContext.js"

function AuthenticatedRoutes() {
    return (

        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route exact path="/passwordReset" component={PasswordReset} />
            <Route exact path="/about" component={About} />
            <Route component={NoMatch}/>
        </Switch>
    )
}

function Router() {
    const { user } = useUserContext();


    return (
        <BrowserRouter>
            <Navbar />
            <Wrapper>
                {user ?
                    <Switch>
                        <Route exact path="/state/:stateId/city" component={CityFromState} />
                        <Route exact path="/country/:countryId/city" component={CityFromCountry} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/country/:countryId/state" component={State} />
                        <Route exact path="/travel" component={Travel} />
                        <Route exact path="/city/:cityId/trip" component={Trip} />
                        <Route exact path="/addCityFromCountry" component={AddCityFromCountry} />
                        <Route exact path="/addCityFromState" component={AddCityFromState} />
                        <Route exact path="/addCountry" component={AddCountry} />
                        <Route exact path="/addState" component={AddState} />
                        <Route exact path="/addTrip" component={AddTrip} />
                        <Route component={NoMatch} />
                    </Switch>
                    : <AuthenticatedRoutes />
                }
            </Wrapper>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;