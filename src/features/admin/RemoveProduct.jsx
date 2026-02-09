import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../../components/ui/button"
import { Trash } from "lucide-react"
import { useRemoveProductMutation } from "../products/productApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Spinner } from "../../components/ui/spinner";

export default function RemoveProduct({id}) {
    const [removeProduct, {isLoading}] = useRemoveProductMutation();
    const {user } = useSelector((state) => state.userSlice);

    const handleRemoveProduct = async() => {
        try {
            await removeProduct({id,token:user.token}).unwrap();
            toast.success('Product removed successfully');
        } catch (err) {
            toast.error(err.data.message);
        }
    }
    return (
      <AlertDialog>
      <AlertDialogTrigger asChild>

       <Button className={'bg-red-700'} disabled= {isLoading} >
        {isLoading ?  <Spinner/> : <Trash/> }
                </Button>

      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this product
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveProduct} >Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}
