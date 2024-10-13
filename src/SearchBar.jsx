import { useState } from "react"
import SearchResult from "./SearchResult";
export default function SearchBar({addRecent}){
    const [searchKey,setSearchKey] = useState("");
    const [save,setSave] = useState(false);
    function handleSave(e){
        e.preventDefault();
        setSave(true);
        setSearchKey("");
    }
    return (
    <>
    <form>
        <input placeholder="Search your Address, City or Zip Code" value={searchKey} 
        onChange={(e)=>setSearchKey(e.target.value)}>
        </input>
        <button onClick={handleSave}>Search</button>
    </form>
    <SearchResult searchKey = {searchKey} setSeachKey={setSearchKey} save={save} setSave={setSave} addRecent = {addRecent}/>
    </>
    )
}