import { Column } from "react-table";
import TableHOC from "./TableHOC";

interface DataType {
  _id: string;
  campaignId: number;
  amount: number;
  status: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "Trasaction Id",
    accessor: "_id",
  },
  {
    Header: "Campaign ID",
    accessor: "campaignId",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const DashboardTable = ({ data = [] }: { data: DataType[] }) => {
  return TableHOC<DataType>(
    columns,
    data,
    "transaction-box",
    "Top Transaction"
  )();
};

export default DashboardTable;
