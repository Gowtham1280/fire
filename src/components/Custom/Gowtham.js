import  { useCallback, useState } from "react";

function useGowtham(applydata){

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const twoWays =useCallback(async (reqparam) => {
      console.log("hello");
        setIsLoading(true);
        setError(null);
        try {
          const response =await fetch(
            reqparam.url,{
                method:reqparam.method ? reqparam.method :'GET' ,
                body: reqparam.body ? JSON.stringify(reqparam.body) : null,
                headers:reqparam.header ? reqparam.header :{}
            })
    
          if (!response.ok) {
            throw new Error('Request failed!');
          }
    
          const data = await response.json();
          applydata(data)
    
        } catch (err) {
          setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
      },[applydata]);

      return {
          isLoading,
          error,
          twoWays
      }
}

export default useGowtham;