
import { UserIcon, SettingsIcon, BellIcon, LogOutIcon, CreditCardIcon, ShoppingCart, LayoutDashboard, MailIcon, SubscriptIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useDispatch } from 'react-redux'
import { removeUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router'

const userLists = [
  {
    icon: UserIcon,
    property: 'Profile'
  },
   {
    icon: CreditCardIcon,
    property: 'My Orders'   // ✅ ADD THIS
  },
  {
    icon: ShoppingCart,
    property: 'Cart'
  },
  
  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
]


const adminLists = [
  {
    icon: UserIcon,
    property: 'Profile'
  },
    {
    icon: ShoppingCart,
    property: 'Admin-orders'   // ✅ ADD THIS
  },

  {
    icon:LayoutDashboard,
    property: 'Admin-panel'
  },

  {
    icon:SubscriptIcon,
    property: 'Admin-subscribers'
  },

 { icon: MailIcon, 
  property: 'Admin Contact' },

  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
]
export default function DropDownProfile({user}) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const listItems = user.role === 'user' ? userLists : adminLists
    return (
         <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button   size='icon' className='overflow-hidden rounded-full bg-amber-100 '>
          <img src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {listItems.map((item, index) => (
            <DropdownMenuItem 
            onClick={() => {
              switch(item.property){
                case 'Sign Out':
                dispatch(removeUser());
                nav('/');
                break;

                case 'Admin-panel':
                 nav('/admin-panel');
                  break;

                      case 'Admin-orders':     // ✅ ADD THIS
                      nav('/admin-orders');
                      break;

                    case 'Admin Contact':  // ✅ Navigate to admin contact page
                    nav('/admin-contact')
                    break

                case 'Cart':
                  nav('/cart');
                  break;

                   case 'My Orders':      // ✅ Navigate to user orders page
                    nav('/user-orders');
                    break;

                    case 'Admin-subscribers':
                      nav('/admin-subscribers')
                      break
              }
            }
            }
            key={index}>
              <item.icon />
              <span className='text-popover-foreground'>{item.property}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}
