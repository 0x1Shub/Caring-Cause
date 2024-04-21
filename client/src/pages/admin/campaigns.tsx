import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";

interface DataType {
  photo: ReactElement;
  name: string;
  amountGoal: number;
  amountRaised: number;
  timeBound: number,
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Goal Amount",
    accessor: "amountGoal",
  },
  {
    Header: "Raised Amount",
    accessor: "amountRaised",
  },
  {
    Header: "Time",
    accessor: "timeBound",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: Array<DataType> = [
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Fund for Education",
    amountGoal: 25000,
    amountRaised: 3000,
    timeBound: 30,
    action: <Link to="/admin/campaign/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    amountGoal: 25000,
    amountRaised: 3000,
    timeBound: 30,
    action: <Link to="/admin/campaign/sdaskdnkasjdn">Manage</Link>,
  },
];

const Campaigns = () => {
  const [rows, setRows] = useState<DataType[]>(arr);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/campaign/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Campaigns;
