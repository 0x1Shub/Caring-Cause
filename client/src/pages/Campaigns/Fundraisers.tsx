import { useState } from "react"
import CampaignCard from "../../components/CampaignCard";

const Fundraisers = () => {

    const addToCartHandler = () => {

    }
  
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(100000); 
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const isPrevPage = page > 1;
    const isNextPage = page < 4;


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
          <h4>Max Price : {maxPrice || ""}</h4>
          <input type="range" min={"100"} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>

        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="asc">Sample 1</option>
            <option value="dsc">Sample 2</option>
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