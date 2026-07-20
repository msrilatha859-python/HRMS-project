function AttendanceTable ( { records }) {
    return (
        <table className= ' w-full boredr mt-4'>
            <thead>
                <tr>
                    <th className= 'border p-2'>Employee</th>
                    <th className='border p-2'>Date</th>
                    <th className=' border p-2'>Status</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record) => (
                    <tr key= {record.id}>
                        <td className="border p-2">{record.employee_name} </td>
                        <td className="border p-2">{record.date} </td>
                        <td className="border p-2">{record.status} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default AttendanceTable
