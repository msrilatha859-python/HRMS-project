function AttendanceTable( {records, onDelete, onEdit}) {
    return(
        <table className="w-full border mt-4">
            <thead>
                <tr>
                    <th className="border p-2">Employee</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Check In</th>
                    <th className="border p-2">Check Out</th>
                    {(onDelete || onEdit) && (
                        <th className="border p-2">Actions</th>
                    )}
                    
                    
                </tr>
            </thead>
            <tbody>
                {records.map((record) => (
                    <tr key={record.id}>
                        <td className="border p-2">{record.employee_name} </td>
                        <td className="border p-2">{record.date}</td>
                        <td className="border p-2">{record.status}</td>
                        <td className="border p-2">{record.check_in || "-"}</td>
                        <td className="border p-2">{record.check_out || "-"}</td>
                        {(onDelete || onEdit) && (
                            <td className="border p-2">
                                {onEdit && (
                                    <button
                                     onClick={() => onEdit(record)}
                                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2">
                                        Edit
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                     onClick={() => onDelete(record.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                     >
                                        Delete
                                    </button>
                                )}
                            </td>
                        )}
                        
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default AttendanceTable;


                       