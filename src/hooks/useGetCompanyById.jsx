import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`,{withCredentials:true});
                console.log(res.data.company);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useGetCompanyById