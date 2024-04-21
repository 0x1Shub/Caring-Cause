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
        }    
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