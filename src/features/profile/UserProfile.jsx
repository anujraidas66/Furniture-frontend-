import { useSelector } from "react-redux";

export default function UserProfile() {
    const {user} = useSelector((state) => state.userSlice);
    return (
        <div>
            
        </div>
    )
}
