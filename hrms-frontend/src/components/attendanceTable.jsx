function AttendanceTable( {records, onDelete}) {
    return(
        <table className="w-full border mt-4">
            <thead>
                <tr>
                    <th className="border p-2">Employee</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record) => (
                    <tr key={record.id}>
                        <td className="border p-2">{record.employee_name} </td>
                        <td className="border p-2">{record.date}</td>
                        <td className="border p-2">{record.status}</td>
                        <td className="border p-2">
                            <button onClick={() => onDelete(record.id)}
                                 className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default AttendanceTable;


                       