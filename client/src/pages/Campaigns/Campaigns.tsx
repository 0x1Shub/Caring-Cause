import { useState } from "react"
import CampaignCard from "../../components/CampaignCard";
import { useCategoriesQuery, useSearchCampaignsQuery } from "../../redux/api/campaignAPI";
import { CustomError } from "../../types/api-types";
import { toast } from "react-hot-toast";

const Fundraisers = () => {

    const { data: categoriesResponse, isLoading:loadingCategories, isError, error  } = useCategoriesQuery("");

    const addToCartHandler = () => {

    }
  
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxGoalAmount, setMaxGoalAmount] = useState(100000); 
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const { isLoading: campaignLoading, data: searchedData } = useSearchCampaignsQuery({
      search, sort, category, page, amountGoal: maxGoalAmount
    })

    console.log(searchedData);

    const isPrevPage = page > 1;
    const isNextPage = page < 4;

    if(isError){
      const err = error as CustomError
      toast.error(err.data.message);
    } 
  


  return (
    <div className="fundraisers-page">
      <aside>
        <h1>Filters</h1>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Amount (Low to High)</option>
            <option value="dsc">Amount (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price : {maxGoalAmount || ""}</h4>
          <input type="range" min={100} max={100000} value={maxGoalAmount} onChange={(e) => setMaxGoalAmount(Number(e.target.value))} />
        </div>

        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">ALL</option>
            {/* <option value="asc">Education</option> */}
            {/* <option value="dsc">Emergencies</option> */}
            {/* <option value="dsc">Health-Care</option> */}
            {/* <option value="dsc">Memorials</option> */}
            {
              !loadingCategories && categoriesResponse?.categories.map((i) => {
                <option key={i} value={i}>{i.toUpperCase()}</option>
              })
            }
          </select>
        </div>

      </aside> 


      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="search-campaign-list">
          <CampaignCard campaignId="asa" name="John Doe" title="Education" amount={5000} goalAmount={25000} days={35} handler={addToCartHandler} photo="https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg" />
        </div>

        <article>
          <button disabled={!isPrevPage} onClick={() => setPage((prev) => (prev-1))}>Prev</button>
          <span>{page} of {4}</span>
          <button disabled={!isNextPage} onClick={() => setPage((next) => (next+1))}>Next</button>
        </article>

      </main>
    </div>
  )
}

export default Fundraisers