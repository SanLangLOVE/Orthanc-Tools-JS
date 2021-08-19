import CommonTable from "./CommonTable";
import {useMemo} from "react";
import {commonColumns, seriesColumns} from "./ColumnFactories";

function TableSeries({
                         series,
                         onDelete,
                         refresh,
                         hiddenActionBouton,
                         hiddenRemoveRow,
                         rowEvents,
                         rowStyle,
                         pagination
                     }) {
    const columns = useMemo(() => [
        commonColumns.RAW,
        seriesColumns.ORTHANC_ID,
        seriesColumns.DESCRIPTION,
        seriesColumns.MODALITY,
        seriesColumns.SERIES_NUMBER,
        ...(!hiddenActionBouton ? [seriesColumns.ACTION(onDelete, refresh)] : []),
        ...(!hiddenRemoveRow ? [seriesColumns.REMOVE(onDelete)] : [])
    ], [
<<<<<<< Updated upstream
        hiddenActionBouton, hiddenRemoveRow, onDelete, refresh]);
=======
        hiddenActionBouton, hiddenRemoveRow, onDelete, refresh]); 
>>>>>>> Stashed changes
    const data = useMemo(() => series.map(x => ({
        raw: {...x},
        ...x
    })), [series]);
    return <CommonTable columns={columns} tableData={data} rowEvents={rowEvents}
                        rowStyle={rowStyle} pagination={pagination}/>
}

export default TableSeries;