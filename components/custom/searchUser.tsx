"use client"
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { ChangeEvent, useState } from "react";
import SearchResult from "@/components/custom/searchResult";
import axios from "axios";

export default function SearchUser() {
    const [value, setValue] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const searchUsers = async (query: string) => {
        try {
            const resp = await axios.post("api/getUsers/", {
                value: query,
            });
            console.log(resp.data);
            setResults(resp.data);
        } catch (error) {
            console.error("An error occurred while fetching users:", error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (newValue) {
            searchUsers(newValue);
        } else {
            setResults([]);  // Clear results if input is empty
        }
    };

    return (
        <div className="searchUser flex flex-col">
            <div className="w-full flex items-center  ">
                <Input placeholder="search usernames" onChange={handleChange} />
                <CiSearch className="-ml-10" size={20} />
            </div>
            <div className=" w-full">
                {value.length > 0 && <SearchResult results={results} />}
            </div>
        </div>
    );
}
