import React, { Fragment, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

import apis from '../../../services/apis'
import OhifLink from '../../Viewers/OhifLink'
import StoneLink from '../../Viewers/StoneLink'
import Metadata from '../../Metadata/Metadata'
import Modify from '../../Modify/Modify'
import ConstantLevel from '../../Modify/ConstantLevel'
import { errorMessage, successMessage } from '../../../tools/toastify'

export default ({
    level,
    orthancID,
    StudyInstanceUID,
    dataDetails,
    hiddenModify,
    hiddenDelete,
    hiddenMetadata,
    onDelete,
    openLabelModal }) => {

    const [showMetadata, setShowMetadata] = useState(false);

    const setMetadata = () => {
        setShowMetadata(!showMetadata)
    }



    const fdelete = async () => {
        switch (level) {
            case ConstantLevel.PATIENTS:
                try {
                    await apis.content.deletePatient(orthancID)
                    successMessage("Patient " + orthancID + " have been deleted")
                    onDelete(orthancID)
                } catch (error) {
                    errorMessage(error)
                }
                break
            case ConstantLevel.STUDIES:
                try {
                    await apis.content.deleteStudies(orthancID)
                    successMessage("Studies " + orthancID + " have been deleted")
                    onDelete(orthancID)
                } catch (error) {
                    errorMessage(error)
                }
                break
            case ConstantLevel.SERIES:
                try {
                    await apis.content.deleteSeries(orthancID)
                    successMessage("Series " + orthancID + " have been deleted")
                    onDelete(orthancID)
                } catch (error) {
                    errorMessage(error)
                }
                break
            default:
                errorMessage("Wrong level")
        }

    }

    const handleClick = (e) => {
        e.stopPropagation()
    }


    return (
        <Fragment>

            <Modal show={showMetadata} onHide={setMetadata} scrollable={true} >
                <Modal.Header closeButton>
                    <Modal.Title>Metadata</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Metadata seriesOrthancId={orthancID} />
                </Modal.Body>
            </Modal>

            <Dropdown onClick={handleClick} drop='left' className="text-center">
                <Dropdown.Toggle variant="button-dropdown-green" id="dropdown-basic" className="button-dropdown button-dropdown-green">
                    Action
                </Dropdown.Toggle>

                <Dropdown.Menu className="mt-2 border border-dark border-2">
                    <OhifLink className='dropdown-item bg-green' StudyInstanceUID={StudyInstanceUID} />
                    <StoneLink className='dropdown-item bg-green' StudyInstanceUID={StudyInstanceUID} />
                    <Button className='dropdown-item bg-green' onClick={setMetadata}
                        hidden={hiddenMetadata}>View Metadata
                    </Button>
                    <Modify hidden={hiddenModify} orthancID={orthancID} level={level} data={dataDetails} refresh={() => { console.log('TODO REFRESH') }} />
                    <Button className='dropdown-item bg-red' hidden={hiddenDelete}
                        onClick={fdelete}>Delete
                    </Button>
                    {(level === ConstantLevel.STUDIES && !!openLabelModal ?
                        //TODO a réinstancier
                        <Button className='dropdown-item bg-blue' hidden={hiddenDelete}
                            onClick={() => {
                                apis.content.getStudiesDetails(orthancID).then((study) => {
                                    openLabelModal(study)
                                })
                            }}>Labels
                        </Button> : null)}

                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )
}