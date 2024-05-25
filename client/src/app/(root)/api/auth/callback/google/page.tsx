// "use client"

// import axios from "axios"
// import { useRouter, useSearchParams } from "next/navigation"
// import React, { useEffect } from "react"

// const Page = () => {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const code = searchParams.get("code")

//   useEffect(() => {
//     if (!code) {
//     }

//     const send = async () => {
//       const { data } = await axios.post("http://localhost:8000/auth/google", {
//         code,
//       })
// //
//       console.log(data)
//       if (data.message == "Ok") router.push("/event/1/overview")
//     }

//     send()
//   }, [code])

//   return <div>{searchParams.get("code")}</div>
// }
// // "clwkvv7sk00006b20u2f0wt2h"
// export default Page
import React from "react"

const page = () => {
  return <div>page</div>
}

export default page
