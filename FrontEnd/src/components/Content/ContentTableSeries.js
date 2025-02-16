import React, { useState } from "react"
import { Modal } from "react-bootstrap";

import TableSeries from "../CommonComponents/RessourcesDisplay/ReactTableV8/TableSeries"
import Metadata from "../Metadata/Metadata";
import ActionButtonSeries from "./ActionButtons/ActionButtonSeries"
import Modify from '../Modify/Modify'
import ConstantLevel from "../Modify/ConstantLevel";

export default ({
    series = [],
    onDelete
}) => {
    const [metadataOrthancID, setMetadataOrthancID] = useState(null);
    const [modifyOrthancID, setModifyOrthancID] = useState({ orthancID: null, level: null })

    const additionalColumns = [
        {
            id: 'Action',
            accessorKey: 'Action',
            header: 'Action',
            cell: ({ row }) => {
                return (
                    <ActionButtonSeries
                        orthancID={row.original.SeriesOrthancID}
                        onDelete={() => onDelete(row.original.SeriesOrthancID)}
                        dataDetails={row.original}
                        onShowMetadata={() => setMetadataOrthancID(row.original.SeriesOrthancID)}
                        onShowModify={() => setModifyOrthancID({ orthancID: row.original.SeriesOrthancID, level: ConstantLevel.SERIES })}
                    />)
            }
        }]

    return (
        <>
            <Modal show={metadataOrthancID != null} onHide={() => setMetadataOrthancID(null)} scrollable={true} >
                <Modal.Header closeButton>
                    <Modal.Title>Metadata</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Metadata seriesOrthancId={metadataOrthancID} />
                </Modal.Body>
            </Modal>

            <Modal show={modifyOrthancID.orthancID != null} onHide={() => setModifyOrthancID({ orthancID: null, level: null })} onClick={(e) => e.stopPropagation()} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title> Modify {modifyOrthancID.level}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modify orthancID={modifyOrthancID.orthancID} level={modifyOrthancID.level} onClose={() => setModifyOrthancID({ orthancID: null, level: null })}/>
                </Modal.Body>
            </Modal>
            <TableSeries series={series} additionalColumns={additionalColumns} />
        </>
    )
}