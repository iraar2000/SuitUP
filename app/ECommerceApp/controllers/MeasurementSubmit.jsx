import useApiServiceFetch from "../hooks/apiServiceFetch"

const {useGet, usePost} = useApiServiceFetch();

export const MeasurementSubmit = ({ApiHost, data}) => {
    usePost(`${ApiHost}/api/Ecommerce/measurement/insert`, data)
}