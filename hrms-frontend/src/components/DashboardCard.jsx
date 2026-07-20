function DashboardCard( { title, value, color } ) {
    return(
        <div className={`rounded-xl shadow-lg p-6 text-white ${color}`}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className=" text-4xl font-bold mt-3"> {value} </p>
        </div>
    );
}
export default DashboardCard;
