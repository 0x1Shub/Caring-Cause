import { ReactElement, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllCampaignsQuery } from "../../redux/api/campaignAPI";
import { server } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { UserReducerInitialState } from "../../types/reducer-types";
import { Skeleton } from "../../components/Loader";

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

const Campaigns = () => {

  const { user } = useSelector((state: {userReducer: UserReducerInitialState}) => state.userReducer);

  const {isLoading, isError, error, data} = useAllCampaignsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if(isError){
    const err = error as CustomError
    toast.error(err.data.message);
  } 

  useEffect(() => {
    if(data) 
      setRows(
      data.campaigns.map((i) => ({
        photo: <img src={`${server}/${i.photo}`} />,
        name: i.title,
        amountGoal: i.amountGoal,
        amountRaised: 5000,
        timeBound: Number(i.days),
        action: <Link to={`/admin/campaign/${i._id}`}>Manage</Link>
    }))
    );
  }, [data]);
  

  

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
      <main>{isLoading ? <Skeleton length={10} /> : Table}</main>
      <Link to="/admin/campaign/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Campaigns;
