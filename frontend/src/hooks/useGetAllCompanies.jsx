import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  

    const fetchCompany = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/company/get', {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });


        if (!res.ok) {
          return; // Exit if there's an error
        }

        const data = await res.json();

        if (data.success) {
          dispatch(setCompanies(data.companies)); // Dispatch companies
        } else {
          console.error("Error fetching companies:", data.message); // Log error message
        }
      } catch (error) {
        console.error("Fetch error:", error); // Log fetch errors
      }
    };

    fetchCompany(); // Call the fetch function
  }, []); // Add dispatch to dependencies
  
};

export default useGetAllCompanies;
