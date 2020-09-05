import React, { Component } from "react";
import "./layout.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Login } from "../login/login";
import { AdminHome } from "../adminHome/adminHome";
import { AddVacation } from "../addVacation/addVacation";
import ProtectedRoute from "../protectedRoute/protected-route";
import VacationChart from "../vacationChart/vacationChart";
import { UserHome } from "../userHome/userHome";
import { Register } from "../register/register";

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../theme';
import { GlobalStyles } from '../../global';
import { Form, Col } from "react-bootstrap";
import { Header } from "../header/header";

import { Container, Row } from "react-bootstrap";


interface LayoutState {
    theme: string
    name: string
    bool: boolean
}

export class Layout extends Component<any, LayoutState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            theme: 'light',
            name: '',
            bool: false
        }
    }

    public showLogout = () => {
        this.setState({ bool: true })
    }

    public changeName = (newName) => {
        this.setState({ name: newName })
        this.setState({ bool: false })
    }

    public handleTheme = () => {
        if (this.state.theme === 'light') {
            this.setState({
                theme: 'dark'
            })
        } else {
            this.setState({
                theme: 'light'
            })
        }
    }

    public render() {
        const { name, theme, bool } = this.state;
        return (
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <>
                    <GlobalStyles />
                    <div className="layout">
                        <BrowserRouter>
                            <header>
                                <Header logoutApperance={bool} userFirstName={name} changeName={this.changeName} handleTheme={this.handleTheme} />
                            </header>
                            <main>
                                <Container>


                                    <Switch>
                                        <Redirect from="/" to="/login" exact />
                                        <Route path="/login" render={(props) => (<Login {...props} data={{ name: name, changeName: this.changeName.bind(this) }} />)} />
                                        <Route path="/register" component={Register} exact />
                                        <ProtectedRoute path="/adminHome" component={AdminHome} showLogout={this.showLogout} exact />
                                        <ProtectedRoute path="/vacationChart" component={VacationChart} showLogout={this.showLogout} exact />
                                        <Route path="/userHome" render={(props) => <UserHome {...props} showLogout={this.showLogout} />} exact />
                                        <ProtectedRoute path="/addVacation" component={AddVacation} showLogout={this.showLogout} exact />
                                    </Switch>


                                </Container>
                            </main>

                        </BrowserRouter>
                    </div>
                </>
            </ThemeProvider>
        );
    }

}
