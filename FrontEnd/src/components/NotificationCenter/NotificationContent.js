import React, { Fragment, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import CardJobs from "./CardJobs"
import CardNotifications from "./CardNotifications"

export default ({notifications}) => {

    const [notificationsArray, setNotificationsArray] = useState([])
    const [jobsArray, setJobsArray] = useState([])

    //TODO faire la mise à jour des jobs
    useEffect(() => {
        let notificationsCards = notifications.map((notification) => {
            if(notification.data.type == 'notification'){
                return notification;
            }
        }).filter(notUndefined => notUndefined !== undefined);
        let jobsCards = notifications.map((notification) => {
            if(notification.data.type == 'jobs'){
                return notification;
            }
        }).filter(notUndefined => notUndefined !== undefined);
        setNotificationsArray(notificationsCards)
        setJobsArray(jobsCards)
    }, [notifications])

    {console.log("props notification content", notifications)}

    const clearNotifications = () => {
        setNotificationsArray([])
    }

    const clearJobs = () => {
        setJobsArray([])
    }

    return (
        <Fragment >
            <Card >
                <Card.Header>Notification Center</Card.Header>
                <CardJobs jobs={jobsArray} clear={clearJobs}/>
                <CardNotifications notifications={notificationsArray} clear={clearNotifications} />
            </Card>
        </Fragment>
    )
}