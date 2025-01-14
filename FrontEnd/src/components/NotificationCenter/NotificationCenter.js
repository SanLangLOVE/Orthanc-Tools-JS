import { useRef, useState } from "react";

import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { Badge, Button, Card, Overlay } from "react-bootstrap";

import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";

import JobsRoot from "./Jobs/JobsRoot";

export default () => {

    const {
        notifications,
        remove
    } = useNotificationCenter();

    const [isOpen, setIsOpen] = useState(false);
    const target = useRef(null)

    const jobNotifications = notifications.filter((notification) => notification.type === 'jobs')

    return (
        <div>
            <Button onClick={() => setIsOpen((opened) => !opened)} ref={target}>
                <Badge>
                    <MailIcon color="action" />
                    <span className='button-count'>
                        {jobNotifications.length}
                    </span>
                </Badge>
            </Button>

            <Overlay
                target={target.current}
                show={isOpen}
                placement="left"
            >
                <Card >
                    <Card.Header>Notifications</Card.Header>
                    <Card.Body>
                        <JobsRoot jobNotifications={jobNotifications} remove={remove} />
                    </Card.Body>
                </Card>
            </Overlay >
        </div >
    );
}