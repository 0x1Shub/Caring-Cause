import { ReactElement, useState } from "react";
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC"
import { Link } from "react-router-dom";

type DataType = {
    id: string;
    amount: Number;
    campaignTitle : string;
    transactionId : Number;
    status: ReactElement;
    action: ReactElement;
}

const column : Column<DataType>[] = [
    {
    Header: "ID",
    accessor: "id",
    },
    {
    Header: "Amount",
    accessor: "amount",
    },
    {
    Header: "Title",
    accessor: "campaignTitle",
    },
    {
        Header: "Transaction ID",
        accessor: "transactionId",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    }
]

const MyDonations = () => {

    const [rows] = useState<DataType[]>([
        {
            id: "asasa",
            amount: 2000,
            campaignTitle : "Education",
            transactionId : 20,
            status: <span className="red">Processing</span>,
            action: <Link to={`/donation/view/asas`}>View</Link>,
        },
        {
            id: "662675812fac8475cafebd2b",
            amount: 2000,
            campaignTitle : "Old Age Home",
            transactionId : 20,
            status: <span className="red">Processing</span>,
            action: <Link to={`/donation/view/asas`}>View</Link>,
        },
        {
            id: "66267900157b30a074e6010f",
            amount: 2000,
            campaignTitle : "Medial",
            transactionId : 20,
            status: <span className="red">Processing</span>,
            action: <Link to={`/donation/view/asas`}>View</Link>,
        },
        {
            id: "662675812fac8475cafebd2b",
            amount: 3000,
            campaignTitle : "Animal",
            transactionId : 40,
            status: <span className="red">Processing</span>,
            action: <Link to={`/donation/view/asas`}>View</Link>,
        },
        {
            id: "6626790015asdasf212f",
            amount: 5000,
            campaignTitle : "Memorial",
            transactionId : 40,
            status: <span className="red">Processing</span>,
            action: <Link to={`/donation/view/asas`}>View</Link>,
        },  
])

    const Table = TableHOC<DataType>(column, rows, "dashboard-product-box", "Donations", rows.length > 6)();

  return (
    <div className="container">
        <h1>My Donations</h1>
        {Table}
    </div>
  )
}

export default MyDonations