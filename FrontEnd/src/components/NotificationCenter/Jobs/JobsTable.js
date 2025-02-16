import React from "react"

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"

import CommonTableV8 from "../../CommonComponents/RessourcesDisplay/ReactTableV8/CommonTableV8"

export default ({ jobs }) => {

    const columns = [
        {
            id: 'JobID',
            accessorKey: 'data.ID',
            header: "Job ID",
            enableHiding: true
        },
        {
            accessorKey: 'content',
            header: 'Type',
            style: { whiteSpace: 'normal', wordWrap: 'break-word' }
        },
        {
            accessorKey: 'data.State',
            header: "Job Status",
            style: { whiteSpace: 'normal', wordWrap: 'break-word' },
            cell: ({ getValue }) => getValue() ?? 'Unknown'
        },
        {
            header: 'Details',
            cell: ({ row }) => {
                const renderTooltip = (props) => (
                    <Tooltip id="button-tooltip" {...props}>
                        {JSON.stringify(row.original.data, null, 2)}
                    </Tooltip>
                );
                return (
                    <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <Button variant="info"> Show Details </Button>
                    </OverlayTrigger>
                )
            }
        }
    ]

    return (
        <CommonTableV8 columns={columns} data={jobs} />
    )

}