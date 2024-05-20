import PostForm from "../components/dashboard/PostForm";
import Posts from "../components/dashboard/Posts";
import UserNavbar from "../components/dashboard/UserNavbar";



export default function Dashboard(){
    return(
        <div className="h-screen">
            <div className="container flex gap-36 flex-row mx-auto p-4 max-w-7xl " >
                <UserNavbar/>
                <div className="flex flex-col w-full ">
                    <PostForm/>
                    <Posts/>
                </div>
            </div>
        </div>
    )
}