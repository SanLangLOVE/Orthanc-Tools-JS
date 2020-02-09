import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom'

export default class RobotStatus extends Component {

    constructor(props){
        super(props)
        this.refreshHandler=this.refreshHandler.bind(this)
        this.showRobotDetailHandler=this.showRobotDetailHandler.bind(this)
        this.state = {
            rows : []
        }
    }

    componentDidMount(){
        this.refreshHandler();
    }

    columns = [{
        dataField: 'key',
        hidden: true
    },{
        dataField: 'name',
        text : 'Name'
    }, {
        dataField: 'username',
        text : 'Username'
    }, {
        dataField: 'queriesNb',
        text : 'Number of Queries'
    }, {
        dataField: 'details',
        text: 'Show Details',
        formatter: this.showRobotDetailsButton
    }];

    showRobotDetailsButton(cell, row, rowIndex, formatExtraData) {
        return <input type="button" onClick={() => <Link to='/query' />} className="btn btn-info" value="Show Details" />

    }

    showRobotDetailHandler(){
        console.log('Click redirect')
    }


    refreshHandler(){

        fetch("/api/robot", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }).then((answer)=>{
           return answer.json()})
           .then( (answerData) => {

                let state=this.state

                state.rows = []

                answerData.forEach(robotJob => {
                    state.rows.push({
                        key : Math.random(),
                        name : robotJob.projectName,
                        username : robotJob.username,
                        queriesNb : robotJob.retrieveList.length
                    })
                    
                });

                this.setState({
                    ...this.state
                })

           })
    }

    render() {
        return (
                <div className="jumbotron">
                    <BootstrapTable keyField="key" striped={true} data={this.state.rows} columns={this.columns} />
                    <input type="button" className="btn btn-info" value="Refresh" onClick={this.refreshHandler} />
                </div>
        )
    }
}