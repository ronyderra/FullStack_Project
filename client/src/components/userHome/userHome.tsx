import React, { Component } from "react";
import "./userHome.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { CardColumns, Row, Col, CardGroup, Container, } from 'react-bootstrap';
import { VacationsTableModel } from "../../models/vacation-model";
import socket from "../../socket";
import axios from "axios";
import { ModalPopUp } from "../modalPopUp/modalPopUp";
import ImageSlider from '../UserCards/ImageSlider/imageSlider';
import { BasicCard } from "../UserCards/basicCard/basicCard";
import { ActionType } from "../../redux/action-type";
import { connect } from 'react-redux'
import { Loading } from "../loading/loading";
import { FlippyCard } from '../UserCards/flippyCard/flippyCard';
import { StaticCard } from "../UserCards/staticCard/staticCard";
import { MainSectionUi } from "../mainSection/mainSection";

interface userHomeState {
    modalBool: boolean
}

export class UserHomePage extends Component<any, userHomeState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            modalBool: false
        }
    }

    public async componentDidMount() {
        try {
            this.props.showLogout()
            socket.on("admin-change-delete", id => {
                this.props.dispatch({ type: ActionType.DeleteVacation, payload: id })
            })
            socket.on("admin-change-add", (newVacation) => {
                this.props.dispatch({ type: ActionType.AddVacation, payload: newVacation })
            })
            socket.on("admin-change-update", (id, update) => {
                this.props.dispatch({ type: ActionType.UpdateVacation, payload: id, update })
            })
            if (this.props.allVacations.length > 0) {
                return;
            }
            const response = await axios.get<VacationsTableModel[]>("/api/vacation/allVacations", { withCredentials: true });
            const allVacations = response.data;
            this.props.dispatch({ type: ActionType.GetAllVacations, payload: allVacations })
        }
        catch (err) {
            alert(err.message);
        }
    }
    public follow = async (event) => {
        const bool = event.target.checked
        let val = event.target.id
        const id = val.slice(0, -1)
        let response = await axios.post<any>("/api/vacation/follow/" + id, { bool }, { withCredentials: true });
        JSON.stringify(response)
        response = response.data
        if (typeof (response) == "string") {

            this.setState({
                modalBool: true
            })
        }
    }
    public handelCloseA = () => {
        this.setState({
            modalBool: false
        })
    }
    public handelCloseB = async () => {
        await this.setState({
            modalBool: false
        })
        this.props.history.push("/register");
    }

    public render() {
        const { modalBool } = this.state;
        return (
            <div className="userHome">
                {this.props.allVacations.length === 0 && <Loading />}
                <MainSectionUi title={'We all want to follow are dreams, but for now just follow a vacation'} 
                paragrph=
                {' “A vacation is what you take when you can no longer take what you’ve been taking.”  – Earl Wilson '}
                leftSideBtnText={'get Started'} rightSideBtnText={'try Task Demo'}  />
                {this.props.allVacations.length > 0 &&
                    <React.Fragment>
                        {/* <h2>Follow a vacation</h2> */}
                        <hr />
                        <div className="firstRowBasicCard">
                            <CardColumns>
                                {this.props.allVacations.slice(0, 3).map((vacation, key) => {
                                    return (
                                        <BasicCard key={vacation.id} function={this.follow} imageUrl={vacation.imageUrl} description={vacation.description} destination={vacation.destination}
                                            dates={vacation.dates} toDates={vacation.toDate} followers={vacation.followers}
                                            id={vacation.id} price={vacation.price} background={'primary'} />)
                                })}
                            </CardColumns>
                        </div>
                        <hr />
                        <div className="secondRowImageSlider">
                            <Container>
                                <Row>
                                    <Col xs={12} md={6}> <ImageSlider info={this.props.allVacations.slice(3, 6).map((v) => { return ({ destination: v.destination, id: v.id, image: v.imageUrl }) })} /></Col>
                                    <Col xs={12} md={6}> <ImageSlider info={this.props.allVacations.slice(6, 9).map((v) => { return ({ destination: v.destination, id: v.id, image: v.imageUrl }) })} /></Col>
                                </Row>
                            </Container>
                        </div>
                        <hr />
                        <div className="thirdRowBasicCard">
                            <CardColumns>
                                {this.props.allVacations.slice(9, 12).map((vacation, key) => {
                                    return (
                                        <BasicCard key={vacation.id} function={this.follow} imageUrl={vacation.imageUrl} description={vacation.description} destination={vacation.destination}
                                            dates={vacation.dates} toDates={vacation.toDate} followers={vacation.followers}
                                            id={vacation.id} price={vacation.price} background={'secondary'} />
                                    )
                                })}
                            </CardColumns>
                        </div>
                        <hr />
                        <div className="fourthRowFlippyCard">
                            <CardGroup>
                                < Row>
                                    {this.props.allVacations.slice(12, 15).map((vacation, key) => {
                                        return (
                                            <FlippyCard key={vacation.id} function={this.follow} imageUrl={vacation.imageUrl}
                                                description={vacation.description} destination={vacation.destination}
                                                dates={vacation.dates} toDates={vacation.toDate} followers={vacation.followers}
                                                id={vacation.id} price={vacation.price} />
                                        )
                                    })}
                                </Row>
                            </CardGroup>
                        </div>
                        <hr />
                        <div className="fifthRowStaticCard">
                            <Container>
                                <Row>
                                    {this.props.allVacations.slice(15, 17).map((vacation, key) => {
                                        return (
                                            <StaticCard imageUrl={vacation.imageUrl} description={vacation.description} destination={vacation.destination}
                                                dates={vacation.dates} toDates={vacation.toDate} followers={vacation.followers}
                                                id={vacation.id} price={vacation.price} />
                                        )
                                    })}
                                </Row>
                                <br />
                            </Container>
                        </div>
                        <hr />
                        <div className="lastRowBasicCard">
                            <CardColumns>
                                {this.props.allVacations.slice(17, this.props.allVacations.length).map((vacation, key) => {
                                    return (
                                        <BasicCard key={vacation.id} function={this.follow} imageUrl={vacation.imageUrl} description={vacation.description} destination={vacation.destination}
                                            dates={vacation.dates} toDates={vacation.toDate} followers={vacation.followers}
                                            id={vacation.id} price={vacation.price} background={'primary'} />
                                    )
                                })}
                            </CardColumns>
                        </div>
                    </React.Fragment>
                }
                <ModalPopUp toggle={modalBool} title={""} question={"in order to folllow you must LOGIN or REGESTER"}
                    firstOptionText={"close"} secondeOptionText={"register"} firstOption={this.handelCloseA} secondeOption={this.handelCloseB} />
            </div>
        )
    }
}
// take values from state(redux) and set as  component props
function mapStateToProps(state) {
    return {
        //prop name : value from redux
        allVacations: state.vacations
    }
}

export const UserHome = connect(mapStateToProps)(UserHomePage);