import React from 'react'

import { Row, Container } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Switch, withRouter } from 'react-router-dom'

import AdminRootPanel from '../Admin/AdminRootPanel'
import AnonRoot from '../Anonymize/AnonRoot'
import AutoQueryRoot from '../AutoQuery/AutoQueryRoot'
import CDBurner from '../CDBurner/CDBurner'
import Delete from '../Delete/Delete'
import DicomRouterPanel from '../Dicom Router/DicomRouterPanel'
import ImportRootPanel from '../Import/ImportRootPanel'
import MyDicom from '../MyDicom/MyDicom'
import ContentRootPanel from '../Content/ContentRootPanel'
import Query from '../Query/Query'
import NavBar from './NavBar'
import Footer from './Footer';

import ToolsPanel from './ToolsPanel';
import Welcome from './Welcome';
import ExportRoot from '../Export/ExportRoot';

const MainRoot = ({ onLogout, username, roles }) => {

    return (
        <>
            <NavBar onLogout={onLogout} username={username} roles={roles} />
            <Container fluid>
                <Row>
                    <ToolsPanel roles={roles} apercu />
                </Row>
                <Row>
                    <AnimatedSwitch />
                </Row>
            </Container >
            <Footer />
        </>
    )

}

const AnimatedSwitch = withRouter(({ location, ...props }) => (
    <TransitionGroup>
        <CSSTransition key={location.key} timeout={500} unmountOnExit classNames={"alert"}>
            <div id={"main"} className={"main" + (props.opened ? '' : ' main-nav-close')}>
                <Switch location={location}>
                    <Route exact path='/import' component={ImportRootPanel} />
                    <Route exact path='/query' component={Query} />
                    <Route exact path='/auto-query' component={AutoQueryRoot} />
                    <Route exact path='/administration' component={AdminRootPanel} />
                    <Route exact path='/orthanc-content' component={ContentRootPanel} />
                    <Route exact path='/export' component={ExportRoot} />
                    <Route exact path='/anonymize' component={AnonRoot} />
                    <Route exact path='/cd-burner' component={CDBurner} />
                    <Route exact path='/mydicom' component={MyDicom} />
                    <Route exact path='/delete' component={Delete} />
                    <Route exact path='/dicom-router' component={DicomRouterPanel} />
                    <Route exact path='/' component={Welcome} />
                </Switch>
            </div>
        </CSSTransition>
    </TransitionGroup>
))
//TODO restorer cette vue pour consulter un robot depuis admin
//<Route exact path='/robot/:id' render={(props) => <Robo id={props.match.params.id} />} />


export default MainRoot