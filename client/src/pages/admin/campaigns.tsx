import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { Skeleton } from "../../components/Loader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllCampaignsQuery } from "../../redux/api/campaignAPI";
import { server } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { UserReducerInitialState } from "../../types/reducer-types";

interface DataType {
  photo: ReactElement;
  name: string;
  amountGoal: number;
  amountRaised: number;
  endDate: Date,
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
    Header: "End Date",
    accessor: "endDate",
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
        amountRaised: i.amountRaise,
        endDate: i.endDate,
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
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>

      <div className="add">
        <Link to="/admin/campaign/new" className="create-product-btn">
          <FaCirclePlus />
        </Link>
      </div>
    </div>

    
  );
};

export default Campaigns;
