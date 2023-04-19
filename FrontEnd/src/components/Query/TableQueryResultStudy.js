import React, { useState } from 'react'
import { useCustomMutation } from '../../services/ReactQuery/hooks'
import apis from '../../services/apis'
import TableQueryResultStudies from '../CommonComponents/RessourcesDisplay/ReactTableV8/TableQueryResultStudies'
import RetrieveButton from './RetrieveButton'
import TableQueryResultSeries from '../CommonComponents/RessourcesDisplay/ReactTableV8/TableQueryResultSeries'

export default ({ studiesData }) => {

    const [series, setSeries] = useState({})

    const queryMutation = useCustomMutation(
        ({ AET, queryData }) => apis.query.dicomQuery(AET, queryData).then(queryAnswers => apis.query.retrieveAnswer(queryAnswers.ID)),
        []
    )

    const fetchSeriesDetails = async (studyInstanceUID, AET) => {

        let queryData = {
            Level: 'Series',
            Query: {
                Modality: '',
                ProtocolName: '',
                SeriesDescription: '',
                SeriesInstanceUID: '',
                StudyInstanceUID: studyInstanceUID,
                SeriesNumber: '',
                NumberOfSeriesRelatedInstances: ''
            }
        }

        const seriesData = await queryMutation.mutateAsync({ AET, queryData })
        setSeries(series => ({
            ...series,
            [studyInstanceUID]: seriesData
        }))
    }

    const retriveColumn = {
        id: 'Retrieve',
        header: 'Retrieve',
        cell: ({ row }) => <RetrieveButton queryAet={row.values.OriginAET} studyInstanceUID={row.values.StudyInstanceUID}
            level={RetrieveButton.Study} />
    }

    const onStudyRowClick = (rowId) => {
        const StudyInstanceUID = rowId
        let requestedStudy = studiesData.find(study => study.StudyInstanceUID === StudyInstanceUID)
        let originalAET = requestedStudy.OriginAET
        fetchSeriesDetails(StudyInstanceUID, originalAET)
    }

    const renderSubComponent = (row) => {
        const StudyInstanceUID = row.id
        let requestedSeries = series?.[StudyInstanceUID] ?? null
        return (
            requestedSeries ? <TableQueryResultSeries series={requestedSeries} /> : null
        )
    }

    return (
        <TableQueryResultStudies onRowClick={onStudyRowClick} canExpand studies={studiesData} renderSubComponent={renderSubComponent} />
    )
}