import { useState } from "react"
import CampaignCard from "../../components/CampaignCard";
import { useCategoriesQuery, useSearchCampaignsQuery } from "../../redux/api/campaignAPI";
import { CustomError } from "../../types/api-types";
import { toast } from "react-hot-toast";
import { Skeleton } from "../../components/Loader";

const Fundraisers = () => {

    const { data: categoriesResponse, isLoading:loadingCategories, isError, error  } = useCategoriesQuery("");

    const addToCartHandler = () => {

    }
  
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxGoalAmount, setMaxGoalAmount] = useState(100000); 
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const { isLoading: campaignLoading, data: searchedData, isError : campaignIsError, error: campaignError } = useSearchCampaignsQuery({
      search, sort, category, page, amountGoal: maxGoalAmount
    })

    console.log(searchedData);

    const isPrevPage = page > 1;
    const isNextPage = page < 4;

    if(isError){
      const err = error as CustomError
      toast.error(err.data.message);
    } 

    if(campaignIsError){
      const err = campaignError as CustomError
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
            {!loadingCategories &&
              categoriesResponse?.categories.map((category) => ( // Added arrow function with return
                <option key={category} value={category}>
                  {category.toUpperCase()}
                </option>
              ))
            }
          </select>
        </div>

      </aside> 


      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />

        {
          campaignLoading ? (
            <Skeleton length={10} />
          ) : (
            <div className="search-campaign-list">
              {searchedData?.campaigns.map((i) => (
                  <CampaignCard key={i._id} campaignId={i._id} userName={i.userName} title={i.title} amountRaise={5000} amountGoal={i.amountGoal} endDate={new Date("2024-05-01")} handler={addToCartHandler} photo={i.photo} />
                ))
              }
            </div>
          )
        }

        {
          searchedData && searchedData.totalPage > 1 && (
            <article>
            <button disabled={!isPrevPage} onClick={() => setPage((prev) => (prev-1))}>Prev</button>
            <span>{page} of {searchedData.totalPage}</span>
            <button disabled={!isNextPage} onClick={() => setPage((next) => (next+1))}>Next</button>
          </article>
          )
        }

      </main>
    </div>
  )
}

export default Fundraisers