"use client"
import { useRouter } from "next/navigation"
import ComingSoon from "../../components/ComingSoon";

export default function KeywordFinderPage(){
    const  route = useRouter();
    return(
        <ComingSoon pageKey="keywordFinder" actionLabel="GO To Dashboard" onActionClick={()=>route.push("/dahboard")}/>
    );
}
