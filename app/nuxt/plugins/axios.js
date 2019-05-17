// import localIp from '../../../.localip'
// const apiHost = localIp
import Axios from 'axios'
import entities from 'entities'
Axios.defaults.withCredentials = true
let baseURL
switch (process.env.NODE_ENV) {
    case 'production':
        // baseURL = `https://mall.topoud.com/api`
        // break
        // case 'test':
        baseURL = `https://test.topoud.com/api`
        break
    default:
        baseURL = `https://test.topoud.com/api`
    // baseURL = `/api`
}
const axios = Axios.create({
    baseURL
})
axios.interceptors.request.use(function(request) {
    request.headers.Authorization =
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllNDdkNGQyN2FlYzc4NzcyMzAxYTQ2NzAzOGNkNGEzODRkZDAyYTk0M2U1Y2JmOTQxMWU4NmVjNjc3ZjVmZGU3MGM4YTRmNTY5ZmM4NTM2In0.eyJhdWQiOiIxMCIsImp0aSI6IjllNDdkNGQyN2FlYzc4NzcyMzAxYTQ2NzAzOGNkNGEzODRkZDAyYTk0M2U1Y2JmOTQxMWU4NmVjNjc3ZjVmZGU3MGM4YTRmNTY5ZmM4NTM2IiwiaWF0IjoxNTU3ODA0MTAyLCJuYmYiOjE1NTc4MDQxMDIsImV4cCI6MTU1OTEwMDEwMiwic3ViIjoiMTQ1MyIsInNjb3BlcyI6WyIqIl19.nrQlNBPaTMrVFeSfdW03BZUpPoPUIszv3fnxxCp96bSrEgMIhzssfNwl9wKxV0e01o2X2WGuvQ2exoem7valJ70pYUg7mX_EQYWP2zd3wvbwPos_k_d1w4_G1_j8slhwoeZ9SllkTwQZPlye4YCf5cIuIk6_tV1Oefl4eyvk4k0pinukqIH0fqUQD6WOP2IO8myNR6_59Xn2H7g84UvJHFtphRiccEl0kKraQ1chmrHPKDJ4YbSibmr95jU47cOOoNrIfBsSYWlvAY-m_DcDcUxm-dhfp-WpLT8NrCqtD2oN5qraq6XgyUW-jtA6dwV5qKAROrCaHqGcxLI835wOOHJjriBmzWYOT3-tp4BLb1xpzy3zxvhDitg-nS84eXfSFMWo_rGkwmAhEPQsTHrZ78QfvTZ3S7MdX-B5EAPT8X6qscYZhvrczIy4cm_n1RA153H4hzmJ5QuGIvokvMhyCcnu4F05ZVYu9jbfwJuv5xltqR1Ae_MvNoILRbWTTcFfM038c0RxjXRD9dScE9cB9eX40gM3NQg4HAZMuk_2vTOxxESWPgVH5gFRLoN8PaOS0Cls1QXREd9lRjyK1cLTZaqfR2G9bzebLsbps5qK6370pPyjPC7JNRIbLrKiaZpPKCpmVtLdzBrV36vDq-2xxVcsvZohLUNsogE9rCRFfFk'
    // console.log(request)
    if (process.browser) {
        axios.lastRequestHeader = request.headers
    }
    return request
})
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response
    },
    function(error) {
        let response = error.response
        if (response) {
            if (/json/.test(response.headers['content-type'])) {
                error.message = response.data.message
            } else {
                let r = response.data.match(/Error:\s*(.*?)<br>/)
                error.message = r ? entities.decodeHTML(r[1]) : response.message
            }
            error.message = error.message || response.statusText
        }
        // Do something with response error
        return Promise.reject(error)
    }
)
export default axios
